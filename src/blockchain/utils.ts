import { Contract } from '@ethersproject/contracts'
import {
  BaseProvider,
  JsonRpcProvider,
  Network,
} from '@ethersproject/providers'
import {
  AAVE,
  AAVE_X_AAVE_A_CLR,
  Abi,
  ADDRESSES,
  ALPHA,
  ARBITRUM_NFT_CORE,
  BNT,
  BNT_X_BNT_A_CLR,
  BUSD,
  DAI,
  ETH,
  EXCHANGE_RATES,
  FRAX,
  GA,
  GM,
  GN,
  INCH,
  INCH_LIQUIDITY_PROTOCOL,
  INCH_X_INCH_A_CLR,
  INCH_X_INCH_B_CLR,
  KNC,
  KYBER_PROXY,
  LENDING_COMPTROLLER,
  LENDING_LINK_MARKET,
  LENDING_LINK_PRICE,
  LENDING_LIQUIDITY_POOL,
  LENDING_LPT,
  LENDING_WBTC_MARKET,
  LENDING_WBTC_PRICE,
  LENDING_WETH_MARKET,
  LENDING_WETH_PRICE,
  LINK,
  REN_BTC,
  S_ETH,
  S_USD,
  SNX,
  SYNTHETIX_ADDRESS_RESOLVER,
  TRADE_ACCOUNTING,
  UNISWAP_LIBRARY,
  UNISWAP_V2_PAIR,
  USDC,
  USDT,
  UST,
  WAGMI,
  WBTC,
  WETH,
  X_AAVE_A,
  X_AAVE_A_BALANCER_POOL,
  X_AAVE_B,
  X_AAVE_B_AAVE_CLR,
  X_AAVE_B_BALANCER_POOL,
  X_ALPHA_A,
  X_ALPHA_A_ALPHA_CLR,
  X_BNT_A,
  X_BNT_A_BANCOR_POOL,
  X_BTC_3X,
  X_ETH_3X,
  X_INCH_A,
  X_INCH_A_INCH_POOL,
  X_INCH_B,
  X_INCH_B_INCH_POOL,
  X_KNC_A,
  X_KNC_A_KNC_CLR,
  X_KNC_A_KYBER_POOL,
  X_KNC_A_UNISWAP_POOL,
  X_KNC_B,
  X_KNC_B_KNC_CLR,
  X_KNC_B_UNISWAP_POOL,
  // X_LINK_3X,
  X_SNX_A,
  X_SNX_A_BALANCER_POOL_V2,
  X_SNX_A_SNX_CLR,
  X_U3LP_A,
  X_U3LP_B,
  X_U3LP_C,
  X_U3LP_D,
  X_U3LP_E,
  X_U3LP_F,
  X_U3LP_G,
  X_U3LP_H,
  XTK,
  XTK_ETH_CLR,
  XTK_MANAGEMENT_STAKING_MODULE,
} from '@xtoken/abis'
import { BigNumber, ethers } from 'ethers'
import { ContractInterface } from 'ethers/lib/ethers'

import {
  ARBITRUM_RINKEBY_URL,
  ARBITRUM_URL,
  ChainId,
  ZERO_NUMBER,
} from '../constants'
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

import { getXAavePrices } from './xaave'
import { getXAaveContracts } from './xaave/helper'
import { getXAlphaPrices } from './xalpha'
import { getXAlphaContracts } from './xalpha/helper'
import { getXBntPrices } from './xbnt'
import { getXBntContracts } from './xbnt/helper'
import { getXInchPrices } from './xinch'
import { getXInchContracts } from './xinch/helper'
import { getXKncPrices } from './xknc'
import { getXKncContracts } from './xknc/helper'
import { getXSnxPrices } from './xsnx'
import { getXSnxContracts } from './xsnx/helper'

const { formatEther, parseEther } = ethers.utils

export const capitalizeToken = (symbol: IStableAssets) => {
  if (![REN_BTC, S_ETH, S_USD].includes(symbol)) {
    return symbol.toUpperCase()
  }
  return symbol
}

export const getAbi = (contractName: IContracts) => {
  switch (contractName) {
    case AAVE:
    case ALPHA:
    case BNT:
    case BUSD:
    case DAI:
    case ETH:
    case FRAX:
    case INCH:
    case KNC:
    case REN_BTC:
    case S_ETH:
    case S_USD:
    case USDC:
    case USDT:
    case UST:
    case WBTC:
    case WETH:
    case XTK:
    case LINK:
      return Abi.ERC20 as ContractInterface
    case EXCHANGE_RATES:
      return Abi.ExchangeRates as ContractInterface
    case INCH_LIQUIDITY_PROTOCOL:
      return Abi.InchLiquidityProtocol as ContractInterface
    case KYBER_PROXY:
      return Abi.KyberProxy as ContractInterface
    case SNX:
      return Abi.Synthetix as ContractInterface
    case TRADE_ACCOUNTING:
      return Abi.TradeAccounting as ContractInterface
    case UNISWAP_LIBRARY:
      return Abi.UniswapLibrary as ContractInterface
    case UNISWAP_V2_PAIR:
      return Abi.UniswapV2Pair as ContractInterface
    case X_AAVE_A:
    case X_AAVE_B:
      return Abi.xAAVE as ContractInterface
    case X_ALPHA_A:
      return Abi.xALPHA as ContractInterface
    case X_BNT_A:
      return Abi.xBNT as ContractInterface
    case X_INCH_A:
    case X_INCH_B:
      return Abi.xINCH as ContractInterface
    case X_KNC_A:
    case X_KNC_B:
      return Abi.xKNC as ContractInterface
    case X_SNX_A:
      return Abi.xSNX as ContractInterface
    case X_U3LP_A:
    case X_U3LP_B:
    case X_U3LP_C:
    case X_U3LP_D:
    case X_U3LP_E:
    case X_U3LP_F:
    case X_U3LP_G:
    case X_U3LP_H:
      return Abi.xU3LP as ContractInterface
    case XTK_MANAGEMENT_STAKING_MODULE:
      return Abi.XTKManagementStakingModule as ContractInterface
    case AAVE_X_AAVE_A_CLR:
    case BNT_X_BNT_A_CLR:
    case INCH_X_INCH_A_CLR:
    case INCH_X_INCH_B_CLR:
    case X_AAVE_B_AAVE_CLR:
    case X_ALPHA_A_ALPHA_CLR:
    case X_KNC_A_KNC_CLR:
    case X_KNC_B_KNC_CLR:
    case X_SNX_A_SNX_CLR:
    case XTK_ETH_CLR:
      return Abi.xAssetCLR as ContractInterface
    case LENDING_COMPTROLLER:
      return Abi.Comptroller as ContractInterface
    case LENDING_LIQUIDITY_POOL:
      return Abi.LiquidityPool as ContractInterface
    case LENDING_LPT:
      return Abi.LPT as ContractInterface
    // case LENDING_X_AAVE_A_MARKET:
    // case LENDING_X_AAVE_B_MARKET:
    // case LENDING_X_INCH_A_MARKET:
    // case LENDING_X_INCH_B_MARKET:
    // case LENDING_X_KNC_A_MARKET:
    // case LENDING_X_KNC_B_MARKET:
    case LENDING_WBTC_MARKET:
    case LENDING_WETH_MARKET:
    case LENDING_LINK_MARKET:
      return Abi.Market as ContractInterface
    /*case LENDING_X_AAVE_A_PRICE:
    case LENDING_X_AAVE_B_PRICE:
      return Abi.xAAVEPrice as ContractInterface
    case LENDING_X_INCH_A_PRICE:
    case LENDING_X_INCH_B_PRICE:
      return Abi.xINCHPrice as ContractInterface
    case LENDING_X_KNC_A_PRICE:
    case LENDING_X_KNC_B_PRICE:
      return Abi.xKNCPrice as ContractInterface
     */
    case LENDING_WBTC_PRICE:
    case LENDING_WETH_PRICE:
    case LENDING_LINK_PRICE:
      return Abi.NativePrice as ContractInterface
    case ARBITRUM_NFT_CORE:
      return Abi.ArbitrumNFTCore as ContractInterface
    case GM:
    case GA:
    case GN:
    case WAGMI:
      return Abi.GM as ContractInterface
    case X_BTC_3X:
    case X_ETH_3X:
      // case X_LINK_3X:
      return Abi.xAssetLev as ContractInterface
  }
}

export const getBalancerPoolAddress = (
  symbol: ITokenSymbols,
  chainId: number
) => {
  let address
  switch (symbol) {
    case X_AAVE_A:
      address = ADDRESSES[X_AAVE_A_BALANCER_POOL][chainId]
      break
    case X_AAVE_B:
      address = ADDRESSES[X_AAVE_B_BALANCER_POOL][chainId]
      break
    case X_SNX_A:
      address = ADDRESSES[X_SNX_A_BALANCER_POOL_V2][chainId]
      break
    default:
      address = null
  }
  return address
}

export const getBalancerPoolContract = (
  symbol: ITokenSymbols,
  provider: BaseProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getBalancerPoolAddress(symbol, chainId)

  if (!address) return null

  return new ethers.Contract(address, Abi.BalancerPool, getSigner(provider))
}

export const getBancorPoolAddress = (
  symbol: ITokenSymbols,
  chainId: number
) => {
  let address
  switch (symbol) {
    case X_BNT_A:
      address = ADDRESSES[X_BNT_A_BANCOR_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}

export const getBancorPoolContract = (
  symbol: ITokenSymbols,
  provider: BaseProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getBancorPoolAddress(symbol, chainId)

  if (!address) return null

  return new ethers.Contract(address, Abi.BancorSmartToken, getSigner(provider))
}

export const getContract = (
  contractName: IContracts,
  provider: BaseProvider,
  network: Network
) => {
  if (!provider) return null

  const address = ADDRESSES[contractName][network.chainId]
  if (!address) return null

  return new ethers.Contract(address, getAbi(contractName), getSigner(provider))
}

export const getExpectedRate = async (
  kyberProxyContract: KyberProxy,
  inputAsset: string,
  outputAsset: string,
  amount: BigNumber,
  isMinRate = false
) => {
  if (isMinRate) {
    return ZERO_NUMBER
  }

  const { expectedRate } = await kyberProxyContract.getExpectedRate(
    inputAsset,
    outputAsset,
    amount
  )
  return expectedRate
}

export const getInchPoolAddress = (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  chainId: number
) => {
  let address
  switch (symbol) {
    case X_INCH_A:
      address = ADDRESSES[X_INCH_A_INCH_POOL][chainId]
      break
    case X_INCH_B:
      address = ADDRESSES[X_INCH_B_INCH_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}

export const getInchPoolContract = (
  symbol: typeof X_INCH_A | typeof X_INCH_B,
  provider: BaseProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getInchPoolAddress(symbol, chainId) as string

  return new ethers.Contract(
    address,
    Abi.InchLiquidityProtocol,
    getSigner(provider)
  )
}

export const getKyberPoolAddress = (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  chainId: number
) => {
  let address
  switch (symbol) {
    case X_KNC_A:
      address = ADDRESSES[X_KNC_A_KYBER_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}

export const getKyberPoolContract = (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  provider: BaseProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getKyberPoolAddress(symbol, chainId) as string

  return new ethers.Contract(address, Abi.DMMPool, getSigner(provider))
}

export const getTokenSymbol = (symbol: ITokenSymbols) => {
  switch (symbol) {
    case X_AAVE_A:
    case X_AAVE_B:
      return AAVE
    case X_ALPHA_A:
      return ALPHA
    case X_BNT_A:
      return BNT
    case X_INCH_A:
    case X_INCH_B:
      return INCH
    case X_KNC_A:
    case X_KNC_B:
      return KNC
    case X_SNX_A:
      return SNX
  }
}

export const getLPTokenSymbol = (
  symbol: ILPTokenSymbols,
  chainId = 1
): IU3LPToken => {
  switch (symbol) {
    case X_U3LP_A:
      return { 0: DAI, 1: USDC }
    case X_U3LP_B:
      if (chainId === ChainId.Arbitrum) {
        return { 0: USDT, 1: USDC }
      } else {
        return { 0: USDC, 1: USDT }
      }
    case X_U3LP_C:
      return { 0: S_USD, 1: USDC }
    case X_U3LP_D:
      return { 0: S_ETH, 1: WETH }
    case X_U3LP_E:
      return { 0: WBTC, 1: REN_BTC }
    case X_U3LP_F:
      return { 0: USDC, 1: UST }
    case X_U3LP_G:
      return { 0: FRAX, 1: USDC }
    case X_U3LP_H:
      return { 0: BUSD, 1: USDT }
  }
}

export const getXAssetCLRSymbol = (symbol: ITokenSymbols): IXAssetCLR => {
  switch (symbol) {
    case X_AAVE_A:
      return AAVE_X_AAVE_A_CLR
    case X_AAVE_B:
      return X_AAVE_B_AAVE_CLR
    case X_ALPHA_A:
      return X_ALPHA_A_ALPHA_CLR
    case X_BNT_A:
      return BNT_X_BNT_A_CLR
    case X_INCH_A:
      return INCH_X_INCH_A_CLR
    case X_INCH_B:
      return INCH_X_INCH_B_CLR
    case X_KNC_A:
      return X_KNC_A_KNC_CLR
    case X_KNC_B:
      return X_KNC_B_KNC_CLR
    case X_SNX_A:
      return X_SNX_A_SNX_CLR
  }
}

export const getXAssetCLRTokenSymbol = (symbol: IXAssetCLR): ICLRToken => {
  switch (symbol) {
    case AAVE_X_AAVE_A_CLR:
      return { 0: AAVE, 1: X_AAVE_A }
    case BNT_X_BNT_A_CLR:
      return { 0: BNT, 1: X_BNT_A }
    case INCH_X_INCH_A_CLR:
      return { 0: INCH, 1: X_INCH_A }
    case INCH_X_INCH_B_CLR:
      return { 0: INCH, 1: X_INCH_B }
    case X_AAVE_B_AAVE_CLR:
      return { 0: X_AAVE_B, 1: AAVE }
    case X_ALPHA_A_ALPHA_CLR:
      return { 0: X_ALPHA_A, 1: ALPHA }
    case X_KNC_A_KNC_CLR:
      return { 0: X_KNC_A, 1: KNC }
    case X_KNC_B_KNC_CLR:
      return { 0: X_KNC_B, 1: KNC }
    case X_SNX_A_SNX_CLR:
      return { 0: X_SNX_A, 1: SNX }
    case XTK_ETH_CLR:
      return { 0: XTK, 1: WETH }
  }
}

export const getXAssetLevTokenSymbol = (symbol: IXAssetLev): ILevToken => {
  switch (symbol) {
    case X_BTC_3X:
      return WBTC
    case X_ETH_3X:
      return WETH
    // case X_LINK_3X:
    //   return LINK
  }
}

export const getXAssetPrices = async (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => {
  switch (symbol) {
    case X_AAVE_A:
    case X_AAVE_B: {
      const { xaaveContract } = await getXAaveContracts(symbol, provider)
      return getXAavePrices(xaaveContract)
    }
    case X_ALPHA_A: {
      const { xalphaContract } = await getXAlphaContracts(symbol, provider)
      return getXAlphaPrices(xalphaContract)
    }
    case X_BNT_A: {
      const { xbntContract } = await getXBntContracts(symbol, provider)
      return getXBntPrices(xbntContract)
    }
    case X_INCH_A:
    case X_INCH_B: {
      const { xinchContract } = await getXInchContracts(symbol, provider)
      return getXInchPrices(xinchContract)
    }
    case X_KNC_A:
    case X_KNC_B: {
      const { xkncContract } = await getXKncContracts(symbol, provider)
      return getXKncPrices(xkncContract)
    }
    case X_SNX_A: {
      const { xsnxContract } = await getXSnxContracts(provider)
      return getXSnxPrices(xsnxContract)
    }
  }
}

export const parseFees = (fee: BigNumber) => {
  return parseEther(fee.isZero() ? '1' : String(1 - 1 / fee.toNumber()))
}

export const getUserAvailableTokenBalance = async (
  contract: Contract,
  address: string
) => {
  let balance
  if (contract.address === ADDRESSES[SNX][1]) {
    balance = await contract.transferableSynthetix(address)
  } else {
    balance = await contract.balanceOf(address)
  }
  return Math.floor(Number(formatEther(balance.toString())) * 10000) / 10000
}

export const getExchangeRateContract = async (provider: BaseProvider) => {
  if (!provider) return null

  const resolver = new ethers.Contract(
    ADDRESSES[SYNTHETIX_ADDRESS_RESOLVER][1],
    Abi.AddressResolver,
    provider
  )
  const address = resolver.getAddress(
    ethers.utils.formatBytes32String('ExchangeRates')
  )

  if (!address) return null

  return new ethers.Contract(address, Abi.ExchangeRates, getSigner(provider))
}

export const getUniswapPoolAddress = (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  chainId: number
) => {
  let address
  switch (symbol) {
    case X_KNC_A:
      address = ADDRESSES[X_KNC_A_UNISWAP_POOL][chainId]
      break
    case X_KNC_B:
      address = ADDRESSES[X_KNC_B_UNISWAP_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}

export const getUniswapPoolContract = (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  provider: BaseProvider,
  chainId: number
) => {
  if (!provider || !symbol) return null

  const address = getUniswapPoolAddress(symbol, chainId) as string

  return new ethers.Contract(address, Abi.UniswapV2Pair, getSigner(provider))
}

export const getSigner = (provider: BaseProvider) => {
  try {
    // Arbitrum provider for test cases
    if (
      [ARBITRUM_URL, ARBITRUM_RINKEBY_URL].includes(
        (provider as JsonRpcProvider).connection.url
      )
    ) {
      return provider
    }
    return (provider as JsonRpcProvider).getSigner()
  } catch (e) {
    return provider
  }
}

export const getSignerAddress = async (provider: BaseProvider) => {
  const signer = (provider as JsonRpcProvider).getSigner()
  return signer.getAddress()
}

export const isXAssetCLRSymbol = async (symbol: string) => {
  return [
    AAVE_X_AAVE_A_CLR,
    BNT_X_BNT_A_CLR,
    INCH_X_INCH_A_CLR,
    INCH_X_INCH_B_CLR,
    X_AAVE_B_AAVE_CLR,
    X_KNC_A_KNC_CLR,
    X_KNC_B_KNC_CLR,
    X_SNX_A_SNX_CLR,
  ].includes(symbol)
}

export const toTitleCase = (text: string) => {
  return text[0].toUpperCase() + text.slice(1).toLowerCase()
}
