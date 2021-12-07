import { Contract } from '@ethersproject/contracts'
import { BaseProvider, Network } from '@ethersproject/providers'
import { X_INCH_A, X_INCH_B, X_KNC_A, X_KNC_B } from '@xtoken/abis'
import { BigNumber, ethers } from 'ethers'
import { KyberProxy } from '../types'
import {
  ICLRToken,
  IContracts,
  ILevToken,
  ILPTokenSymbols,
  IStableAssets,
  ITokenSymbols,
  IU3LPToken,
  IXAssetCLR,
  IXAssetLev,
} from '../types/xToken'
export declare const capitalizeToken: (symbol: IStableAssets) => string
export declare const getAbi: (
  contractName: IContracts
) => ethers.ContractInterface
export declare const getBalancerPoolAddress: (
  symbol: ITokenSymbols,
  chainId: number
) => string | null
export declare const getBalancerPoolContract: (
  symbol: ITokenSymbols,
  provider: BaseProvider,
  chainId: number
) => Contract | null
export declare const getBancorPoolAddress: (
  symbol: ITokenSymbols,
  chainId: number
) => string | null
export declare const getBancorPoolContract: (
  symbol: ITokenSymbols,
  provider: BaseProvider,
  chainId: number
) => Contract | null
export declare const getContract: (
  contractName: IContracts,
  provider: BaseProvider,
  network: Network
) => Contract | null
export declare const getExpectedRate: (
  kyberProxyContract: KyberProxy,
  inputAsset: string,
  outputAsset: string,
  amount: BigNumber,
  isMinRate?: boolean
) => Promise<BigNumber>
export declare const getInchPoolAddress: (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  chainId: number
) => string | null
export declare const getInchPoolContract: (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  provider: BaseProvider,
  chainId: number
) => Contract | null
export declare const getKyberPoolAddress: (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  chainId: number
) => string | null
export declare const getKyberPoolContract: (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  provider: BaseProvider,
  chainId: number
) => Contract | null
export declare const getTokenSymbol: (
  symbol: ITokenSymbols
) => 'aave' | 'alpha' | 'bnt' | 'inch' | 'knc' | 'snx'
export declare const getLPTokenSymbol: (
  symbol: ILPTokenSymbols,
  chainId?: number
) => IU3LPToken
export declare const getXAssetCLRSymbol: (symbol: ITokenSymbols) => IXAssetCLR
export declare const getXAssetCLRTokenSymbol: (symbol: IXAssetCLR) => ICLRToken
export declare const getXAssetLevTokenSymbol: (symbol: IXAssetLev) => ILevToken
export declare const getXAssetPrices: (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => Promise<import('../types/xToken').ITokenPrices>
export declare const parseFees: (fee: BigNumber) => BigNumber
export declare const getUserAvailableTokenBalance: (
  contract: Contract,
  address: string
) => Promise<number>
export declare const getExchangeRateContract: (
  provider: BaseProvider
) => Promise<Contract | null>
export declare const getUniswapPoolAddress: (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  chainId: number
) => string | null
export declare const getUniswapPoolContract: (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  provider: BaseProvider,
  chainId: number
) => Contract | null
export declare const getSigner: (
  provider: BaseProvider
) => BaseProvider | ethers.providers.JsonRpcSigner
export declare const getSignerAddress: (
  provider: BaseProvider
) => Promise<string>
export declare const isXAssetCLRSymbol: (symbol: string) => Promise<boolean>
export declare const toTitleCase: (text: string) => string
