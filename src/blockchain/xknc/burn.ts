import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'

import ADDRESSES from '../../addresses'
import { DEC_18, ETH, KNC } from '../../constants'
import { estimateGas, getExpectedRate } from '../utils'

import { getXKncContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

const BURN_FEE = parseEther('0.998') // 0.20%

export const burnXKnc = async (
  sellForEth: boolean,
  amount: string,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xkncContract,
  } = await getXKncContracts(provider)
  const gasPrice = await estimateGas()
  const minRate = await getExpectedRate(
    kyberProxyContract,
    ADDRESSES[ETH],
    tokenContract.address,
    amount
  )

  return xkncContract.burn(amount, sellForEth, minRate.toString(), {
    gasPrice,
  })
}

export const getExpectedQuantityOnBurnXKnc = async (
  sellForEth: boolean,
  amount: string,
  provider: JsonRpcProvider
) => {
  const inputAmount = parseEther(amount)
  const { kyberProxyContract, network, xkncContract } = await getXKncContracts(
    provider
  )
  const { chainId } = network

  const [kncFundBal, totalSupply] = await Promise.all([
    xkncContract.getFundKncBalanceTwei(),
    xkncContract.totalSupply(),
  ])

  const proRataKnc = kncFundBal.mul(inputAmount).div(totalSupply)
  let expectedQty: BigNumber

  if (!sellForEth) {
    expectedQty = proRataKnc
  } else {
    const ethAddress = ADDRESSES[ETH]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const kncAddress = ADDRESSES[KNC][chainId]

    const { expectedRate } = await kyberProxyContract.getExpectedRate(
      kncAddress,
      ethAddress,
      proRataKnc
    )

    expectedQty = proRataKnc.mul(expectedRate).div(DEC_18)
  }

  return formatEther(expectedQty.mul(BURN_FEE).div(DEC_18))
}
