import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ADDRESSES, ETH, HEGIC } from '@xtoken/abis'
import { ethers } from 'ethers'

import { DEC_18 } from '../../constants'
import { XAAVE } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getExpectedRate, parseFees } from '../utils'

import { getXHegicContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const burnXHegic = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    kyberProxyContract,
    tokenContract,
    xhegicContract,
  } = await getXHegicContracts(symbol, provider)

  const { proRataHegic } = await getProRataHegic(xhegicContract, amount)

  const minRate = await getExpectedRate(
    kyberProxyContract,
    tokenContract.address,
    ADDRESSES[ETH] as string,
    proRataHegic,
    true
  )

  return xhegicContract.burn(amount, sellForEth, minRate)
}

export const getExpectedQuantityOnBurnXHegic = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: string,
  provider: JsonRpcProvider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xhegicContract,
  } = await getXHegicContracts(symbol, provider)
  const { chainId } = network

  const { BURN_FEE, proRataHegic } = await getProRataHegic(
    xhegicContract,
    inputAmount
  )
  let expectedQty: BigNumber

  if (!sellForEth) {
    expectedQty = proRataHegic
  } else {
    const ethAddress = ADDRESSES[ETH] as string
    const hegicAddress = ADDRESSES[HEGIC][chainId]

    const expectedRate = await getExpectedRate(
      kyberProxyContract,
      hegicAddress,
      ethAddress,
      proRataHegic
    )

    expectedQty = proRataHegic.mul(expectedRate).div(DEC_18)
  }

  return formatEther(expectedQty.mul(BURN_FEE).div(DEC_18))
}

const getProRataHegic = async (xhegicContract: XAAVE, amount: BigNumber) => {
  const [hegicHoldings, xhegicSupply, { burnFee }] = await Promise.all([
    xhegicContract.getFundHoldings(),
    xhegicContract.totalSupply(),
    xhegicContract.feeDivisors(),
  ])

  const BURN_FEE = parseFees(burnFee)
  const proRataHegic = hegicHoldings.mul(amount).div(xhegicSupply)

  return { BURN_FEE, proRataHegic }
}
