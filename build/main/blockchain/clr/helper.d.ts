import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { KyberProxy, UniswapLibrary, XAssetCLR } from '../../types'
import { IXAssetCLR } from '../../types/xToken'
export declare const getXAssetCLRContracts: (
  symbol: IXAssetCLR,
  provider: BaseProvider
) => Promise<{
  kyberProxyContract: KyberProxy
  network: import('@ethersproject/providers').Network
  token0Contract: Contract
  token1Contract: Contract
  uniswapLibraryContract: UniswapLibrary
  xAssetCLRContract: XAssetCLR
}>