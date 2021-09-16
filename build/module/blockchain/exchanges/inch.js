import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import { ADDRESSES, BUY, ETH, INCH, KYBER_PROXY, SELL } from '@xtoken/abis'
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
  const kyberProxyContract = getContract(KYBER_PROXY, provider, network)
  let userBalance = BigNumber.from('0')
  try {
    userBalance = await inchPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  const xinchContract = getContract(symbol, provider, network)
  const { priceUsd } = await getXInchPrices(
    xinchContract,
    kyberProxyContract,
    chainId
  )
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2V4Y2hhbmdlcy9pbmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQTtBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFFdEQsT0FBTyxFQUNMLFNBQVMsRUFDVCxHQUFHLEVBQ0gsR0FBRyxFQUNILElBQUksRUFDSixXQUFXLEVBQ1gsSUFBSSxHQUdMLE1BQU0sY0FBYyxDQUFBO0FBQ3JCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFL0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBR3hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUV4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXRDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtBQUVoRCxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxLQUFLLEVBQzNDLE9BQXVELEVBQ3ZELE1BQXlDLEVBQ3pDLE1BQWMsRUFDZCxTQUFxQixFQUNyQixRQUFzQixFQUNMLEVBQUU7SUFDbkIsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3BDLE1BQU0sRUFBRSw2QkFBNkIsRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLGlCQUFpQixDQUN4RSxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUE7SUFDRCxNQUFN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
