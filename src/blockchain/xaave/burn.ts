import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { AAVE, ADDRESSES, ETH } from 'xtoken-abis'

import { DEC_18 } from '../../constants'
import { ITokenSymbols } from '../../types/xToken'
import { getExpectedRate, parseFees } from '../utils'

import { getXAaveContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const burnXAave = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)

  const minRate = await getExpectedRate(
    kyberProxyContract,
    tokenContract.address,
    ADDRESSES[ETH],
    amount,
    true
  )

  return xaaveContract.burn(amount, sellForEth, minRate)
}

export const getExpectedQuantityOnBurnXAave = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: string,
  provider: JsonRpcProvider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)
  const { chainId } = network

  const [aaveHoldings, xaaveSupply, { burnFee }] = await Promise.all([
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
    xaaveContract.feeDivisors(),
  ])

  const BURN_FEE = parseFees(burnFee)
  const proRataAave = aaveHoldings.mul(inputAmount).div(xaaveSupply)
  let expectedQty: BigNumber

  if (!sellForEth) {
    expectedQty = proRataAave
  } else {
    const ethAddress = ADDRESSES[ETH]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const aaveAddress = ADDRESSES[AAVE][chainId]

    const { expectedRate } = await kyberProxyContract.getExpectedRate(
      aaveAddress,
      ethAddress,
      proRataAave
    )

    expectedQty = proRataAave.mul(expectedRate).div(DEC_18)
  }

  return formatEther(expectedQty.mul(BURN_FEE).div(DEC_18))
}
