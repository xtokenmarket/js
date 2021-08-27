import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { KYBER_PROXY, UNISWAP_LIBRARY } from '@xtoken/abis'

import { KyberProxy, UniswapLibrary, XAssetCLR } from '../../types'
import { IXAssetCLR } from '../../types/xToken'
import { getContract, getXAssetCLRTokenSymbol } from '../utils'

export const getXAssetCLRContracts = async (
  symbol: IXAssetCLR,
  provider: BaseProvider
) => {
  const assets = getXAssetCLRTokenSymbol(symbol)
  const network = await provider.getNetwork()

  const xAssetCLRContract = getContract(symbol, provider, network) as XAssetCLR
  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy
  const token0Contract = getContract(assets[0], provider, network) as Contract
  const token1Contract = getContract(assets[1], provider, network) as Contract
  const uniswapLibraryContract = getContract(
    UNISWAP_LIBRARY,
    provider,
    network
  ) as UniswapLibrary

  if (
    !xAssetCLRContract ||
    !kyberProxyContract ||
    !token0Contract ||
    !token1Contract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    kyberProxyContract,
    network,
    token0Contract,
    token1Contract,
    uniswapLibraryContract,
    xAssetCLRContract,
  }
}
