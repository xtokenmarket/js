import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import { ADDRESSES, BUY, ETH, INCH, SELL } from '@xtoken/abis'
import { ethers } from 'ethers'
import { DEC_18 } from '../../constants'
import { getContract, getInchPoolAddress, getInchPoolContract } from '../utils'
import { getXInchPrices } from '../xinch'
import { getExpectedRateInch, getXInchContracts } from '../xinch/helper'
import { getBalances } from './helper'
const { formatEther, parseEther } = ethers.utils
export const getInchEstimatedQuantity = async (
  tokenIn,
  symbol,
  amount,
  tradeType,
  provider
) => {
  let inputAmount = parseEther(amount)
  const { inchLiquidityProtocolContract, network } = await getXInchContracts(
    symbol,
    provider
  )
  const { chainId } = network
  // Addresses
  const inchAddress = ADDRESSES[INCH][chainId]
  const xinchAddress = ADDRESSES[symbol][chainId]
  // Contracts
  const inchPoolContract = getInchPoolContract(symbol, provider, chainId)
  let expectedQty
  // Get equivalent `ETH` quantity from the input `1INCH` amount
  if (tradeType === BUY && tokenIn !== ETH) {
    inputAmount = await getExpectedRateInch(
      inchLiquidityProtocolContract,
      inchAddress,
      AddressZero,
      inputAmount
    )
  }
  expectedQty = await inchPoolContract.getReturn(
    tradeType === BUY ? AddressZero : xinchAddress,
    tradeType === BUY ? xinchAddress : AddressZero,
    inputAmount
  )
  // Get final `1INCH` quantity from the estimated `ETH` quantity
  if (tradeType === SELL && tokenIn !== ETH) {
    expectedQty = await getExpectedRateInch(
      inchLiquidityProtocolContract,
      AddressZero,
      inchAddress,
      expectedQty
    )
  }
  return formatEther(expectedQty)
}
export const getInchPortfolioItem = async (symbol, address, provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  // Addresses
  const asset = `${symbol} - ${ETH.toUpperCase()}`
  const inchPoolAddress = getInchPoolAddress(symbol, chainId)
  // Contracts
  const inchPoolContract = getInchPoolContract(symbol, provider, chainId)
  let userBalance = BigNumber.from('0')
  try {
    userBalance = await inchPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  const xinchContract = getContract(symbol, provider, network)
  const { priceUsd } = await getXInchPrices(xinchContract)
  const inchPoolBalances = await getBalances(
    symbol,
    inchPoolAddress,
    priceUsd,
    provider,
    chainId
  )
  const xinchEthPoolSupply = await inchPoolContract.totalSupply()
  const poolPrice = parseEther(inchPoolBalances.eth.val)
    .mul(2)
    .mul(DEC_18)
    .div(xinchEthPoolSupply)
  const value = poolPrice.mul(userBalance).div(DEC_18)
  return {
    asset,
    balances: inchPoolBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice: priceUsd,
    value: formatEther(value),
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2V4Y2hhbmdlcy9pbmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQTtBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFFdEQsT0FBTyxFQUNMLFNBQVMsRUFDVCxHQUFHLEVBQ0gsR0FBRyxFQUNILElBQUksRUFDSixJQUFJLEdBR0wsTUFBTSxjQUFjLENBQUE7QUFDckIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUUvQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHeEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRXhFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdEMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO0FBRWhELE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLEtBQUssRUFDM0MsT0FBdUQsRUFDdkQsTUFBeUMsRUFDekMsTUFBYyxFQUNkLFNBQXFCLEVBQ3JCLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDcEMsTUFBTSxFQUFFLDZCQUE2QixFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0saUJBQWlCLENBQ3hFLE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQTtJQUNELE1BQU0sRUFBRSxPQUFP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
