import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ADDRESSES, ETH, KNC } from '@xtoken/abis'
import { ethers } from 'ethers'

import { DEC_18, GAS_LIMIT_PERCENTAGE } from '../../constants'
import { ITokenSymbols } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { getExpectedRate, parseFees } from '../utils'

import { getXKncContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const burnXKnc = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xkncContract,
  } = await getXKncContracts(symbol, provider)

  const minRate = await getExpectedRate(
    kyberProxyContract,
    tokenContract.address,
    ADDRESSES[ETH] as string,
    amount,
    true
  )

  // Estimate `gasLimit`, if trading with `ETH`
  let gasLimit = undefined
  if (sellForEth) {
    gasLimit = getPercentage(
      await xkncContract.estimateGas.burn(amount, !sellForEth, minRate),
      GAS_LIMIT_PERCENTAGE
    )
  }

  // `xKNC` contract has `redeemForKnc` instead of `sellForEth` bool
  return xkncContract.burn(amount, !sellForEth, minRate, { gasLimit })
}

export const getExpectedQuantityOnBurnXKnc = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: string,
  provider: JsonRpcProvider
) => {
  const inputAmount = parseEther(amount)
  const { kyberProxyContract, network, xkncContract } = await getXKncContracts(
    symbol,
    provider
  )
  const { chainId } = network

  const [kncFundBal, totalSupply, { burnFee }] = await Promise.all([
    xkncContract.getFundKncBalanceTwei(),
    xkncContract.totalSupply(),
    xkncContract.feeDivisors(),
  ])

  const BURN_FEE = parseFees(burnFee)
  const proRataKnc = kncFundBal.mul(inputAmount).div(totalSupply)
  let expectedQty: BigNumber

  if (!sellForEth) {
    expectedQty = proRataKnc
  } else {
    const ethAddress = ADDRESSES[ETH] as string
    const kncAddress = ADDRESSES[KNC][chainId]

    const expectedRate = await getExpectedRate(
      kyberProxyContract,
      kncAddress,
      ethAddress,
      proRataKnc
    )

    expectedQty = proRataKnc.mul(expectedRate).div(DEC_18)
  }

  return formatEther(expectedQty.mul(BURN_FEE).div(DEC_18))
}
