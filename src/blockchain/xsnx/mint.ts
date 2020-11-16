import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'

import ADDRESSES from '../../addresses'
import {
  DEC_18,
  ETH,
  KYBER_PROXY,
  SNX,
  TRADE_ACCOUNTING,
  X_SNX_A,
} from '../../constants'
import { KyberProxy, TradeAccounting, XSNX } from '../../types'
import {
  estimateGas,
  getContract,
  getExpectedRate,
  getTokenSymbol,
} from '../utils'

const { formatEther, parseEther } = ethers.utils

const MINT_FEE = parseEther('0.998') // 0.2%

export const getExpectedQuantityOnMintXSnx = async (
  tradeWithEth: boolean,
  amount: string,
  provider: JsonRpcProvider
) => {
  const inputAmount = parseEther(amount)
  const network = await provider.getNetwork()
  const { chainId } = network

  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy
  const tradeAccountingContract = getContract(
    TRADE_ACCOUNTING,
    provider,
    network
  ) as TradeAccounting
  const xsnxContract = getContract(X_SNX_A, provider, network) as XSNX

  // Return error if required contracts are missing
  if (!kyberProxyContract || !tradeAccountingContract || !xsnxContract)
    return '0'

  const [snxBalanceBefore, totalSupply] = await Promise.all([
    tradeAccountingContract.getSnxBalance(),
    xsnxContract.totalSupply(),
  ])

  if (tradeWithEth) {
    const ethContributed = inputAmount.mul(MINT_FEE).div(DEC_18)
    const { expectedRate } = await kyberProxyContract.getExpectedRate(
      ADDRESSES[ETH],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ADDRESSES[SNX][chainId],
      ethContributed.toString()
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

export const minkXSnx = async (
  tradeWithEth: boolean,
  amount: string,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const network = await provider.getNetwork()

  const xsnxContract = getContract(X_SNX_A, provider, network) as XSNX
  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy
  const tokenContract = getContract(
    getTokenSymbol(X_SNX_A),
    provider,
    network
  ) as Contract

  if (!xsnxContract || !kyberProxyContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }

  const gasPrice = await estimateGas()

  if (tradeWithEth) {
    const minRate = await getExpectedRate(
      kyberProxyContract,
      ADDRESSES[ETH],
      tokenContract.address,
      amount
    )
    return xsnxContract.mint(minRate.toString(), {
      value: amount,
      gasPrice,
    })
  } else {
    return xsnxContract.mintWithSnx(amount, {
      gasPrice,
    })
  }
}
