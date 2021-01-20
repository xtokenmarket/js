import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'
import { INCH_LIQUIDITY_PROTOCOL, KYBER_PROXY } from 'xtoken-abis'

import { InchLiquidityProtocol, KyberProxy, XINCH } from '../../types'
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
  return isMinRate ? expectedRate.mul(98).div(100) : expectedRate
}

export const getXInchContracts = async (
  symbol: ITokenSymbols,
  provider: JsonRpcProvider
) => {
  const network = await provider.getNetwork()

  const xinchContract = getContract(symbol, provider, network) as XINCH
  const inchLiquidityProtocolContract = getContract(
    INCH_LIQUIDITY_PROTOCOL,
    provider,
    network
  ) as InchLiquidityProtocol
  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy
  const tokenContract = getContract(
    getTokenSymbol(symbol),
    provider,
    network
  ) as Contract

  if (
    !xinchContract ||
    !inchLiquidityProtocolContract ||
    !kyberProxyContract ||
    !tokenContract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    inchLiquidityProtocolContract,
    kyberProxyContract,
    network,
    tokenContract,
    xinchContract,
  }
}
