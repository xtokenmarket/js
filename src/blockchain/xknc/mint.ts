import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'

import ADDRESSES from '../../addresses'
import { DEC_18, ETH, KNC, KYBER_PROXY, X_KNC_A } from '../../constants'
import { KyberProxy, XKNC } from '../../types'
import {
  estimateGas,
  getContract,
  getExpectedRate,
  getTokenSymbol,
} from '../utils'

const { formatEther, parseEther } = ethers.utils

const MINT_FEE = 1 // 0.000%
const SLIPPAGE = parseEther('0.99')

export const getExpectedQuantityOnMintXKnc = async (
  tradeWithEth: boolean,
  amount: string,
  provider: JsonRpcProvider
): Promise<string> => {
  const inputAmount = parseEther(amount)
  const network = await provider.getNetwork()
  const { chainId } = network

  const xkncContract = getContract(X_KNC_A, provider, network) as XKNC
  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy

  if (!xkncContract || !kyberProxyContract) return '0'

  const kncBalBefore = await xkncContract.getFundKncBalanceTwei()
  const currentSupply = await xkncContract.totalSupply()
  const ethToTrade = inputAmount.mul(MINT_FEE)

  const ethAddress = ADDRESSES[ETH]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const kncAddress = ADDRESSES[KNC][chainId]

  let kncBalanceAfter: BigNumber

  if (tradeWithEth) {
    const { expectedRate } = await kyberProxyContract.getExpectedRate(
      ethAddress,
      kncAddress,
      inputAmount
    )
    const kncExpected = ethToTrade.mul(expectedRate)
    kncBalanceAfter = kncExpected.add(kncBalBefore)
  } else {
    kncBalanceAfter = ethToTrade.add(kncBalBefore)
  }

  const mintAmount = kncBalanceAfter
    .sub(kncBalBefore)
    .mul(currentSupply)
    .div(kncBalBefore)
  return formatEther(
    tradeWithEth ? mintAmount.mul(SLIPPAGE).div(DEC_18).div(DEC_18) : mintAmount
  )
}

export const minkXKnc = async (
  tradeWithEth: boolean,
  amount: string,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const network = await provider.getNetwork()

  const xkncContract = getContract(X_KNC_A, provider, network) as XKNC
  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy
  const tokenContract = getContract(
    getTokenSymbol(X_KNC_A),
    provider,
    network
  ) as Contract

  if (!xkncContract || !kyberProxyContract || !tokenContract) {
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
    return xkncContract.mint(minRate.toString(), {
      gasPrice,
      value: amount,
    })
  } else {
    return xkncContract.mintWithKnc(amount, {
      gasPrice,
    })
  }
}
