import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { KYBER_PROXY } from '@xtoken/abis'

import { KyberProxy, XAAVE } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getContract, getTokenSymbol } from '../utils'

export const getXHegicContracts = async (
  symbol: ITokenSymbols,
  provider: JsonRpcProvider
) => {
  const network = await provider.getNetwork()

  // TODO: Change type to `XHEGIC` contract
  const xhegicContract = getContract(symbol, provider, network) as XAAVE
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

  if (!xhegicContract || !kyberProxyContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    kyberProxyContract,
    network,
    tokenContract,
    xhegicContract,
  }
}
