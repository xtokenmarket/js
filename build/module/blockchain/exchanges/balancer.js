import { BigNumber } from '@ethersproject/bignumber'
import {
  AAVE,
  Abi,
  ADDRESSES,
  BUY,
  ETH,
  KYBER_PROXY,
  SNX,
  TRADE_ACCOUNTING,
  WETH,
  X_AAVE_A,
  X_AAVE_A_BALANCER_POOL,
  X_AAVE_B,
  X_AAVE_B_BALANCER_POOL,
  X_SNX_A,
  X_SNX_A_ADMIN,
  X_SNX_A_BALANCER_POOL,
} from '@xtoken/abis'
import { ethers } from 'ethers'
import { DEC_18 } from '../../constants'
import { formatNumber } from '../../utils'
import {
  getBalancerPoolAddress,
  getBalancerPoolContract,
  getContract,
  getExchangeRateContract,
  getSigner,
  getTokenSymbol,
} from '../utils'
import { getXAavePrices } from '../xaave'
import { getXSnxPrices } from '../xsnx'
import { getBalances } from './helper'
import { getEthTokenPrice, getEthUsdcPrice } from './uniswap'
const { formatEther, parseEther } = ethers.utils
export const getBalancerEstimatedQuantity = async (
  tokenIn,
  symbol,
  amount,
  tradeType,
  provider
) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  let tokenInSymbol
  let poolSymbol
  switch (symbol) {
    case X_AAVE_A:
      tokenInSymbol = tokenIn === ETH ? WETH : AAVE
      poolSymbol = X_AAVE_A_BALANCER_POOL
      break
    case X_AAVE_B:
      tokenInSymbol = tokenIn === ETH ? WETH : AAVE
      poolSymbol = X_AAVE_B_BALANCER_POOL
      break
    case X_SNX_A:
      tokenInSymbol = tradeType === BUY && tokenIn === X_SNX_A ? SNX : WETH
      poolSymbol = X_SNX_A_BALANCER_POOL
      break
    default:
      return '0'
  }
  const tokenInAddress = ADDRESSES[tokenInSymbol][chainId]
  const tokenOutAddress = ADDRESSES[symbol][chainId]
  const poolAddress = ADDRESSES[poolSymbol][chainId]
  const balancerContract = getBalancerPoolContract(symbol, provider, chainId)
  const tokenInContract = new ethers.Contract(
    tokenInAddress,
    Abi.ERC20,
    getSigner(provider)
  )
  const tokenOutContract = new ethers.Contract(
    tokenOutAddress,
    Abi.ERC20,
    getSigner(provider)
  )
  const [
    tokenInBalance,
    tokenInWeight,
    tokenOutBalance,
    tokenOutWeight,
    swapFee,
  ] = await Promise.all([
    tokenInContract.balanceOf(poolAddress),
    balancerContract.getDenormalizedWeight(tokenInAddress),
    tokenOutContract.balanceOf(poolAddress),
    balancerContract.getDenormalizedWeight(tokenOutAddress),
    balancerContract.getSwapFee(),
  ])
  const calcOutGivenIn = await balancerContract.calcOutGivenIn(
    tradeType === BUY ? tokenInBalance : tokenOutBalance,
    tradeType === BUY ? tokenInWeight : tokenOutWeight,
    tradeType === BUY ? tokenOutBalance : tokenInBalance,
    tradeType === BUY ? tokenOutWeight : tokenInWeight,
    parseEther(amount),
    swapFee
  )
  return formatNumber(
    formatEther(calcOutGivenIn),
    tradeType === BUY ? 0 : 3
  ).toString()
}
export const getBalancerPortfolioItem = async (symbol, address, provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const tokenSymbol = getTokenSymbol(symbol)
  const underlying = tokenSymbol.toUpperCase()
  // Addresses
  const asset = `${symbol} - ${ETH.toUpperCase()} - ${underlying}`
  const balancerPoolAddress = getBalancerPoolAddress(symbol, chainId)
  const xTokenAddress = ADDRESSES[symbol][chainId]
  const underlyingAddress = ADDRESSES[tokenSymbol][chainId]
  // Contracts
  const balancerPoolContract = getBalancerPoolContract(
    symbol,
    provider,
    chainId
  )
  const kyberProxyContract = getContract(KYBER_PROXY, provider, network)
  const tokenContract = new ethers.Contract(xTokenAddress, Abi.ERC20, provider)
  let userBalance = BigNumber.from('0')
  try {
    userBalance = await balancerPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  let tokenPrice = 0
  const [ethUsdcPrice, underlyingEthPrice] = await Promise.all([
    getEthUsdcPrice(provider),
    getEthTokenPrice(underlyingAddress, true, provider),
  ])
  const underlyingPrice = parseEther(underlyingEthPrice)
    .mul(parseEther(ethUsdcPrice))
    .div(DEC_18)
  try {
    switch (symbol) {
      case X_SNX_A: {
        const xsnxAdminAddress = ADDRESSES[X_SNX_A_ADMIN][chainId]
        const tradeAccountingContract = getContract(
          TRADE_ACCOUNTING,
          provider,
          network
        )
        const exchangeRatesContract = await getExchangeRateContract(provider)
        const snxContract = getContract(SNX, provider, network)
        const { priceUsd } = await getXSnxPrices(
          tokenContract,
          xsnxAdminAddress,
          tradeAccountingContract,
          exchangeRatesContract,
          snxContract,
          provider
        )
        tokenPrice = priceUsd
        break
      }
      case X_AAVE_A: {
        const xaaveaContract = getContract(symbol, provider, network)
        const { priceUsd } = await getXAavePrices(
          xaaveaContract,
          kyberProxyContract,
          chainId
        )
        tokenPrice = priceUsd
        break
      }
      case X_AAVE_B: {
        const xaavebContract = getContract(symbol, provider, network)
        const { priceUsd } = await getXAavePrices(
          xaavebContract,
          kyberProxyContract,
          chainId
        )
        tokenPrice = priceUsd
        break
      }
    }
  } catch (e) {
    console.error(e)
  }
  const balancerContractBalances = await getBalances(
    symbol,
    balancerPoolAddress,
    tokenPrice,
    provider,
    chainId,
    underlyingPrice,
    true
  )
  const bptTokenSupply = await balancerPoolContract.totalSupply()
  const poolPrice = parseEther(balancerContractBalances.eth.val)
    .mul(4)
    .mul(DEC_18)
    .div(bptTokenSupply)
  const value = poolPrice.mul(userBalance).div(DEC_18)
  return {
    asset,
    balances: balancerContractBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice,
    underlyingPrice: formatEther(underlyingPrice),
    value: formatEther(value),
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9leGNoYW5nZXMvYmFsYW5jZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBRXBELE9BQU8sRUFDTCxJQUFJLEVBQ0osR0FBRyxFQUNILFNBQVMsRUFDVCxHQUFHLEVBQ0gsR0FBRyxFQUNILFdBQVcsRUFDWCxHQUFHLEVBQ0gsZ0JBQWdCLEVBQ2hCLElBQUksRUFDSixRQUFRLEVBQ1Isc0JBQXNCLEVBQ3RCLFFBQVEsRUFDUixzQkFBc0IsRUFDdEIsT0FBTyxFQUNQLGFBQWEsRUFDYixxQkFBcUIsR0FDdEIsTUFBTSxjQUFjLENBQUE7QUFDckIsT0FBTyxFQUFZLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUV6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFjeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMxQyxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLHVCQUF1QixFQUN2QixXQUFXLEVBQ1gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxjQUFjLEdBQ2YsTUFBTSxVQUFVLENBQUE7QUFDakIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRXZDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDdEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUU3RCxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7QUFFaEQsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUcsS0FBSyxFQUMvQyxPQUF3RSxFQUN4RSxN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
