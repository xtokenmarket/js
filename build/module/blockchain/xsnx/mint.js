import { ADDRESSES, ETH, SNX } from '@xtoken/abis'
import { ethers } from 'ethers'
import {
  DEC_18,
  GAS_LIMIT_PERCENTAGE_DEFAULT,
  GAS_LIMIT_PERCENTAGE_ETH,
} from '../../constants'
import { getPercentage } from '../../utils'
import { getExpectedRate, getSignerAddress, parseFees } from '../utils'
import { getXSnxContracts } from './helper'
const { formatEther, parseEther } = ethers.utils
export const approveXSnx = async (amount, provider, spenderAddress) => {
  const { tokenContract, xsnxContract } = await getXSnxContracts(provider)
  const address = spenderAddress || xsnxContract.address
  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await tokenContract.estimateGas.approve(address, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(address, amount, { gasLimit })
}
export const getExpectedQuantityOnMintXSnx = async (
  tradeWithEth,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    tradeAccountingContract,
    xsnxContract,
  } = await getXSnxContracts(provider)
  const { chainId } = network
  const [snxBalanceBefore, totalSupply, { mintFee }] = await Promise.all([
    tradeAccountingContract.getSnxBalance(),
    xsnxContract.totalSupply(),
    xsnxContract.feeDivisors(),
  ])
  const MINT_FEE = parseFees(mintFee)
  if (tradeWithEth) {
    const ethContributed = inputAmount.mul(MINT_FEE).div(DEC_18)
    const expectedRate = await getExpectedRate(
      kyberProxyContract,
      ADDRESSES[ETH],
      ADDRESSES[SNX][chainId],
      ethContributed
    )
    const [setHoldingsWei, ethBal] = await Promise.all([
      tradeAccountingContract.getSetHoldingsValueInWei(),
      tradeAccountingContract.getEthBalance(),
    ])
    const nonSnxAssetValue = setHoldingsWei.add(ethBal)
    const weiPerOneSnx = DEC_18.mul(DEC_18).div(expectedRate)
    const pricePerToken = await tradeAccountingContract.calculateIssueTokenPrice(
      weiPerOneSnx.toString(),
      snxBalanceBefore,
      nonSnxAssetValue,
      totalSupply
    )
    const expectedTokenReturn = ethContributed.mul(DEC_18).div(pricePerToken)
    return formatEther(expectedTokenReturn)
  } else {
    const expQuantity = await tradeAccountingContract.calculateTokensToMintWithSnx(
      snxBalanceBefore,
      inputAmount,
      totalSupply
    )
    return formatEther(expQuantity)
  }
}
export const mintXSnx = async (tradeWithEth, amount, provider) => {
  const {
    kyberProxyContract,
    tokenContract,
    xsnxContract,
  } = await getXSnxContracts(provider)
  if (tradeWithEth) {
    const minRate = await getExpectedRate(
      kyberProxyContract,
      ADDRESSES[ETH],
      tokenContract.address,
      amount,
      true
    )
    // Estimate `gasLimit`
    const gasLimit = getPercentage(
      await xsnxContract.estimateGas.mint(minRate.toString(), {
        value: amount,
      }),
      GAS_LIMIT_PERCENTAGE_ETH
    )
    return xsnxContract.mint(minRate.toString(), {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xsnxContract,
      address
    )
    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }
    // Estimate `gasLimit`
    const gasLimit = getPercentage(
      await xsnxContract.estimateGas.mintWithSnx(amount),
      GAS_LIMIT_PERCENTAGE_DEFAULT
    )
    return xsnxContract.mintWithSnx(amount, { gasLimit })
  }
}
const _getApprovedAmount = async (tokenContract, xsnxContract, address) => {
  return tokenContract.allowance(address, xsnxContract.address)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hzbngvbWludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDbEQsT0FBTyxFQUFhLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUUxQyxPQUFPLEVBQ0wsTUFBTSxFQUNOLDRCQUE0QixFQUM1Qix3QkFBd0IsR0FDekIsTUFBTSxpQkFBaUIsQ0FBQTtBQUV4QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUUzQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7QUFFaEQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFDOUIsTUFBaUIsRUFDakIsUUFBc0IsRUFDdEIsY0FBdUIsRUFDTyxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUV4RSxNQUFNLE9BQU8sR0FBRyxjQUFjLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQTtJQUV0RCxzQkFBc0I7SUFDdEIsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUM1QixNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFDeEQsNEJBQTRCLENBQzdCLENBQUE7SUFFRCxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFD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
