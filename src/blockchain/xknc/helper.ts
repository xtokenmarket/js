import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'

import { KYBER_PROXY, X_KNC_A } from '../../constants'
import { KyberProxy, XKNC } from '../../types'
import { getContract, getTokenSymbol } from '../utils'

export const getXKncContracts = async (provider: JsonRpcProvider) => {
  const network = await provider.getNetwork()

  const xkncContract = getContract(X_KNC_A, provider, network) as XKNC
  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy
  const tokenContract = getContract(
    getTokenSymbol(X_KNC_A),
    provider,
    network
  ) as Contract

  if (!xkncContract || !kyberProxyContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    kyberProxyContract,
    network,
    tokenContract,
    xkncContract,
  }
}
