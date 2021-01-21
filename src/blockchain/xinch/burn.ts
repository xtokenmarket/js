import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { ADDRESSES, INCH } from 'xtoken-abis'

import { DEC_18, ZERO_ADDRESS } from '../../constants'
import { ITokenSymbols } from '../../types/xToken'
import { parseFees } from '../utils'

import { getExpectedRateInch, getXInchContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const burnXInch = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: BigNumber,
  provider: JsonRpcProvider
): Promise<ContractTransaction> => {
  const {
    inchLiquidityProtocolContract,
    tokenContract,
    xinchContract,
  } = await getXInchContracts(symbol, provider)

  const minRate = await getExpectedRateInch(
    inchLiquidityProtocolContract,
    tokenContract.address,
    ZERO_ADDRESS,
    amount,
    true
  )

  return xinchContract.burn(amount, sellForEth, minRate)
}

export const getExpectedQuantityOnBurnXInch = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: string,
  provider: JsonRpcProvider
) => {
  const inputAmount = parseEther(amount)
  const {
    inchLiquidityProtocolContract,
    network,
    xinchContract,
  } = await getXInchContracts(symbol, provider)
  const { chainId } = network

  const [inchHoldings, xinchSupply, { burnFee }] = await Promise.all([
    xinchContract.getNav(),
    xinchContract.totalSupply(),
    xinchContract.feeDivisors(),
  ])

  const BURN_FEE = parseFees(burnFee)
  const proRataInch = inchHoldings.mul(inputAmount).div(xinchSupply)
  let expectedQty: BigNumber

  if (!sellForEth) {
    expectedQty = proRataInch
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const inchAddress = ADDRESSES[INCH][chainId]

    expectedQty = await getExpectedRateInch(
      inchLiquidityProtocolContract,
      inchAddress,
      ZERO_ADDRESS,
      inputAmount
    )
  }

  return formatEther(expectedQty.mul(BURN_FEE).div(DEC_18))
}
