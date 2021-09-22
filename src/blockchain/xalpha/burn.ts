import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, ALPHA, ETH } from '@xtoken/abis'
import { ethers } from 'ethers'

import {
  DEC_18,
  GAS_LIMIT_PERCENTAGE_DEFAULT,
  GAS_LIMIT_PERCENTAGE_ETH,
} from '../../constants'
import { XALPHA } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { getExpectedRate, parseFees } from '../utils'

import { getXAlphaContracts } from './helper'
import { getXAlphaPrices } from './prices'

const { formatEther, parseEther } = ethers.utils

// TODO: should be using Uniswap for expected quantities?

export const burnXAlpha = async (
  symbol: ITokenSymbols,
  sellForEth: boolean,
  amount: string,
  provider: BaseProvider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xalphaContract,
  } = await getXAlphaContracts(symbol, provider)

  // estimate gasLimit
  const gasLimit = getPercentage(
    await xalphaContract.estimateGas.burn(amount, sellForEth, '1'),
    sellForEth ? GAS_LIMIT_PERCENTAGE_ETH : GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return xalphaContract.burn(amount, sellForEth, '1', {
    gasLimit,
  })
}
