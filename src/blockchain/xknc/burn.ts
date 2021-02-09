import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { ADDRESSES, ETH, KNC } from 'xtoken-abis'

import { DEC_18 } from '../../constants'
import { ITokenSymbols } from '../../types/xToken'
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

  return xkncContract.burn(amount, sellForEth, minRate)
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
    xkncContract.feeStructure(),
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
