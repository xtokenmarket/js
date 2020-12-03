import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'

import ADDRESSES from '../../addresses'
import { AAVE, DEC_18, ETH } from '../../constants'
import { ITokenSymbols } from '../../types/xToken'
import { estimateGas, getExpectedRate } from '../utils'

import { getXAaveContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

const BURN_FEE = parseEther('0.998') // 0.20%

export const burnXAave = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: string,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xaaveContract,
  } = await getXAaveContracts(symbol, provider)
  const gasPrice = await estimateGas()
  const minRate = await getExpectedRate(
    kyberProxyContract,
    ADDRESSES[ETH],
    tokenContract.address,
    amount
  )

  return xaaveContract.burn(amount, sellForEth, minRate.toString(), {
    gasPrice,
  })
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

  const [aaveHoldings, xaaveSupply] = await Promise.all([
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
  ])

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
