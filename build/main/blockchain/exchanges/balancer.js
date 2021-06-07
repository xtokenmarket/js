'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getBalancerPortfolioItem = exports.getBalancerEstimatedQuantity = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const xaave_1 = require('../xaave')
const xsnx_1 = require('../xsnx')
const helper_1 = require('./helper')
const uniswap_1 = require('./uniswap')
const { formatEther, parseEther } = ethers_1.ethers.utils
const getBalancerEstimatedQuantity = async (
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
    case abis_1.X_AAVE_A:
      tokenInSymbol = tokenIn === abis_1.ETH ? abis_1.WETH : abis_1.AAVE
      poolSymbol = abis_1.X_AAVE_A_BALANCER_POOL
      break
    case abis_1.X_AAVE_B:
      tokenInSymbol = tokenIn === abis_1.ETH ? abis_1.WETH : abis_1.AAVE
      poolSymbol = abis_1.X_AAVE_B_BALANCER_POOL
      break
    case abis_1.X_SNX_A:
      tokenInSymbol =
        tradeType === abis_1.BUY && tokenIn === abis_1.X_SNX_A
          ? abis_1.SNX
          : abis_1.WETH
      poolSymbol = abis_1.X_SNX_A_BALANCER_POOL
      break
    default:
      return '0'
  }
  const tokenInAddress = abis_1.ADDRESSES[tokenInSymbol][chainId]
  const tokenOutAddress = abis_1.ADDRESSES[symbol][chainId]
  const poolAddress = abis_1.ADDRESSES[poolSymbol][chainId]
  const balancerContract = utils_2.getBalancerPoolContract(
    symbol,
    provider,
    chainId
  )
  const tokenInContract = new ethers_1.ethers.Contract(
    tokenInAddress,
    abis_1.Abi.ERC20,
    utils_2.getSigner(provider)
  )
  const tokenOutContract = new ethers_1.ethers.Contract(
    tokenOutAddress,
    abis_1.Abi.ERC20,
    utils_2.getSigner(provider)
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
    tradeType === abis_1.BUY ? tokenInBalance : tokenOutBalance,
    tradeType === abis_1.BUY ? tokenInWeight : tokenOutWeight,
    tradeType === abis_1.BUY ? tokenOutBalance : tokenInBalance,
    tradeType === abis_1.BUY ? tokenOutWeight : tokenInWeight,
    parseEther(amount),
    swapFee
  )
  return utils_1
    .formatNumber(formatEther(calcOutGivenIn), tradeType === abis_1.BUY ? 0 : 3)
    .toString()
}
exports.getBalancerEstimatedQuantity = getBalancerEstimatedQuantity
const getBalancerPortfolioItem = async (symbol, address, provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const tokenSymbol = utils_2.getTokenSymbol(symbol)
  const underlying = tokenSymbol.toUpperCase()
  // Addresses
  const asset = `${symbol} - ${abis_1.ETH.toUpperCase()} - ${underlying}`
  const balancerPoolAddress = utils_2.getBalancerPoolAddress(symbol, chainId)
  const xTokenAddress = abis_1.ADDRESSES[symbol][chainId]
  const underlyingAddress = abis_1.ADDRESSES[tokenSymbol][chainId]
  // Contracts
  const balancerPoolContract = utils_2.getBalancerPoolContract(
    symbol,
    provider,
    chainId
  )
  const kyberProxyContract = utils_2.getContract(
    abis_1.KYBER_PROXY,
    provider,
    network
  )
  const tokenContract = new ethers_1.ethers.Contract(
    xTokenAddress,
    abis_1.Abi.ERC20,
    provider
  )
  let userBalance = bignumber_1.BigNumber.from('0')
  try {
    userBalance = await balancerPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  let tokenPrice = 0
  const [ethUsdcPrice, underlyingEthPrice] = await Promise.all([
    uniswap_1.getEthUsdcPrice(provider),
    uniswap_1.getEthTokenPrice(underlyingAddress, true, provider),
  ])
  const underlyingPrice = parseEther(underlyingEthPrice)
    .mul(parseEther(ethUsdcPrice))
    .div(constants_1.DEC_18)
  try {
    switch (symbol) {
      case abis_1.X_SNX_A: {
        const xsnxAdminAddress = abis_1.ADDRESSES[abis_1.X_SNX_A_ADMIN][chainId]
        const tradeAccountingContract = utils_2.getContract(
          abis_1.TRADE_ACCOUNTING,
          provider,
          network
        )
        const exchangeRatesContract = await utils_2.getExchangeRateContract(
          provider
        )
        const snxContract = utils_2.getContract(abis_1.SNX, provider, network)
        const { priceUsd } = await xsnx_1.getXSnxPrices(
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
      case abis_1.X_AAVE_A: {
        const xaaveaContract = utils_2.getContract(symbol, provider, network)
        const { priceUsd } = await xaave_1.getXAavePrices(
          xaaveaContract,
          kyberProxyContract,
          chainId
        )
        tokenPrice = priceUsd
        break
      }
      case abis_1.X_AAVE_B: {
        const xaavebContract = utils_2.getContract(symbol, provider, network)
        const { priceUsd } = await xaave_1.getXAavePrices(
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
  const balancerContractBalances = await helper_1.getBalances(
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
    .mul(constants_1.DEC_18)
    .div(bptTokenSupply)
  const value = poolPrice.mul(userBalance).div(constants_1.DEC_18)
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
exports.getBalancerPortfolioItem = getBalancerPortfolioItem
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9leGNoYW5nZXMvYmFsYW5jZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQW9EO0FBRXBELHVDQWlCcUI7QUFDckIsbUNBQXlDO0FBRXpDLCtDQUF3QztBQWN4Qyx1Q0FBMEM7QUFDMUMsb0NBT2lCO0FBQ2pCLG9DQUF5QztBQUN6QyxrQ0FBdUM7QUFFdkMscUNBQXNDO0FBQ3RDLHVDQUE2RDtBQUU3RCxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSw0QkFBNEIsR0FBRyxLQUFLLEVBQy9DLE9BQXdFLEVBQ3hFLE1BQTBELEVBQzFELE1BQWMsRUFDZCxTQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDM0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUUzQixJQUFJLGFBQWEsQ0FBQTtJQUNqQixJQUFJLFVBQVUsQ0FBQTtJQUVkLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxlQUFRO1lBQ1gsYUFBYSxHQUFHLE9BQU8sS0FBSyxVQUFHLENBQUMsQ0FBQyxDQUFDLFdBQUksQ0FBQyxDQUFDLENBQUMsV0FBSSxDQUFBO1lBQzdDLFVBQVUsR0FBRyw2QkFBc0IsQ0FBQTtZQUNuQyxNQUFLO1FBQ1AsS0FBSyxlQUFRO1lBQ1gsYUFBYSxHQUFHLE9BQU8sS0FBSyxVQUFHLENBQUMsQ0FBQyxDQUFDLFdBQUksQ0FBQyxDQUFDLENBQUMsV0FBSSxDQUFBO1lBQzdDLFVBQVUsR0FBRyw2QkFBc0IsQ0FBQTtZQUNuQyxNQUFLO1FBQ1AsS0FBSyxjQUFPO1lBQ1YsYUFBYSxHQUFHLFNBQVMsS0FBSyxVQUFHLElBQUksT0FBTyxLQUFLLGNB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
