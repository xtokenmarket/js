import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { KYBER_PROXY } from '@xtoken/abis'

import { KyberProxy, XAAVE } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getContract, getTokenSymbol } from '../utils'

export const getXAaveContracts = async (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()

  const xaaveContract = getContract(symbol, provider, network) as XAAVE
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

  if (!xaaveContract || !kyberProxyContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    kyberProxyContract,
    network,
    tokenContract,
    xaaveContract,
  }
}
