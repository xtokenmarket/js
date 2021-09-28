import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { KYBER_PROXY } from '@xtoken/abis'

import { KyberProxy, XALPHA } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getContract, getTokenSymbol } from '../utils'

export const getXAlphaContracts = async (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()

  const xalphaContract = getContract(symbol, provider, network) as XALPHA
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

  if (!xalphaContract) {
    console.log('no xalphaContract')
  }

  if (!kyberProxyContract) {
    console.log('no kyberProxyContract')
  }

  if (!tokenContract) {
    console.log('no tokenContract')
  }

  if (!xalphaContract || !kyberProxyContract || !tokenContract) {
    // console.log('hello world')
    return Promise.reject(new Error('Contract missing'))
  }

  return {
    kyberProxyContract,
    network,
    tokenContract,
    xalphaContract,
  }
}
