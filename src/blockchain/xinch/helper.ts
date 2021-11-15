import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { INCH_LIQUIDITY_PROTOCOL } from '@xtoken/abis'
import { BigNumber } from 'ethers'

import { InchLiquidityProtocol, XINCH } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getContract, getTokenSymbol } from '../utils'

export const getExpectedRateInch = async (
  inchLiquidityProtocolContract: InchLiquidityProtocol,
  inputAsset: string,
  outputAsset: string,
  amount: BigNumber,
  isMinRate = false
) => {
  const expectedRate = await inchLiquidityProtocolContract.getReturn(
    inputAsset,
    outputAsset,
    amount
  )
  return isMinRate ? BigNumber.from('0') : expectedRate
}

export const getXInchContracts = async (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()

  const xinchContract = getContract(symbol, provider, network) as XINCH
  const inchLiquidityProtocolContract = getContract(
    INCH_LIQUIDITY_PROTOCOL,
    provider,
    network
  ) as InchLiquidityProtocol
  const tokenContract = getContract(
    getTokenSymbol(symbol),
    provider,
    network
  ) as Contract

  if (
    !xinchContract ||
    // !inchLiquidityProtocolContract ||
    !tokenContract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    inchLiquidityProtocolContract,
    network,
    tokenContract,
    xinchContract,
  }
}
