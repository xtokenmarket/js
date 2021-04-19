import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { KNC, KYBER_PROXY } from '@xtoken/abis'

import { KyberProxy, XKNC } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getContract, getTokenSymbol } from '../utils'

export const getXKncContracts = async (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()

  const xkncContract = getContract(symbol, provider, network) as XKNC
  const kncContract = getContract(KNC, provider, network)
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

  if (!xkncContract || !kncContract || !kyberProxyContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    kncContract,
    kyberProxyContract,
    network,
    tokenContract,
    xkncContract,
  }
}
