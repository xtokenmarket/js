import {
  AAVE,
  AAVE_X_AAVE_A_CLR,
  Abi,
  ADDRESSES,
  ALPHA,
  BNT,
  BNT_X_BNT_A_CLR,
  BUSD,
  DAI,
  ETH,
  EXCHANGE_RATES,
  FRAX,
  INCH,
  INCH_LIQUIDITY_PROTOCOL,
  INCH_X_INCH_A_CLR,
  INCH_X_INCH_B_CLR,
  KNC,
  KYBER_PROXY,
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
  X_SNX_A,
  X_SNX_A_BALANCER_POOL_V2,
  X_SNX_A_SNX_CLR,
  X_SNX_ADMIN,
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
import { ethers } from 'ethers'
import { ZERO_NUMBER } from '../constants'
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
export const capitalizeToken = (symbol) => {
  if (![REN_BTC, S_ETH, S_USD].includes(symbol)) {
    return symbol.toUpperCase()
  }
  return symbol
}
export const getAbi = (contractName) => {
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
      return Abi.ERC20
    case EXCHANGE_RATES:
      return Abi.ExchangeRates
    case INCH_LIQUIDITY_PROTOCOL:
      return Abi.InchLiquidityProtocol
    case KYBER_PROXY:
      return Abi.KyberProxy
    case SNX:
      return Abi.Synthetix
    case TRADE_ACCOUNTING:
      return Abi.TradeAccounting
    case UNISWAP_LIBRARY:
      return Abi.UniswapLibrary
    case UNISWAP_V2_PAIR:
      return Abi.UniswapV2Pair
    case X_AAVE_A:
    case X_AAVE_B:
      return Abi.xAAVE
    case X_ALPHA_A:
      return Abi.xALPHA
    case X_BNT_A:
      return Abi.xBNT
    case X_INCH_A:
    case X_INCH_B:
      return Abi.xINCH
    case X_KNC_A:
    case X_KNC_B:
      return Abi.xKNC
    case X_SNX_A:
      return Abi.xSNX
    case X_U3LP_A:
    case X_U3LP_B:
    case X_U3LP_C:
    case X_U3LP_D:
    case X_U3LP_E:
    case X_U3LP_F:
    case X_U3LP_G:
    case X_U3LP_H:
      return Abi.xU3LP
    case XTK_MANAGEMENT_STAKING_MODULE:
      return Abi.XTKManagementStakingModule
    case AAVE_X_AAVE_A_CLR:
    case X_ALPHA_A_ALPHA_CLR:
    case BNT_X_BNT_A_CLR:
    case INCH_X_INCH_A_CLR:
    case INCH_X_INCH_B_CLR:
    case X_AAVE_B_AAVE_CLR:
    case X_KNC_A_KNC_CLR:
    case X_KNC_B_KNC_CLR:
    case X_SNX_A_SNX_CLR:
    case XTK_ETH_CLR:
      return Abi.xAssetCLR
  }
}
export const getBalancerPoolAddress = (symbol, chainId) => {
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
export const getBalancerPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = getBalancerPoolAddress(symbol, chainId)
  if (!address) return null
  return new ethers.Contract(address, Abi.BalancerPool, getSigner(provider))
}
export const getBancorPoolAddress = (symbol, chainId) => {
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
export const getBancorPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = getBancorPoolAddress(symbol, chainId)
  if (!address) return null
  return new ethers.Contract(address, Abi.BancorSmartToken, getSigner(provider))
}
export const getContract = (contractName, provider, network) => {
  if (!provider) return null
  const address = ADDRESSES[contractName][network.chainId]
  if (!address) return null
  return new ethers.Contract(address, getAbi(contractName), getSigner(provider))
}
export const getExpectedRate = async (
  kyberProxyContract,
  inputAsset,
  outputAsset,
  amount,
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
export const getInchPoolAddress = (symbol, chainId) => {
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
export const getInchPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = getInchPoolAddress(symbol, chainId)
  return new ethers.Contract(
    address,
    Abi.InchLiquidityProtocol,
    getSigner(provider)
  )
}
export const getKyberPoolAddress = (symbol, chainId) => {
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
export const getKyberPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = getKyberPoolAddress(symbol, chainId)
  return new ethers.Contract(address, Abi.DMMPool, getSigner(provider))
}
export const getTokenSymbol = (symbol) => {
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
export const getLPTokenSymbol = (symbol) => {
  switch (symbol) {
    case X_U3LP_A:
      return { 0: DAI, 1: USDC }
    case X_U3LP_B:
      return { 0: USDC, 1: USDT }
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
export const getXAssetCLRSymbol = (symbol) => {
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
export const getXAssetCLRTokenSymbol = (symbol) => {
  switch (symbol) {
    case AAVE_X_AAVE_A_CLR:
      return { 0: AAVE, 1: X_AAVE_A }
    case X_ALPHA_A_ALPHA_CLR:
      return { 0: ALPHA, 1: X_ALPHA_A }
    case BNT_X_BNT_A_CLR:
      return { 0: BNT, 1: X_BNT_A }
    case INCH_X_INCH_A_CLR:
      return { 0: INCH, 1: X_INCH_A }
    case INCH_X_INCH_B_CLR:
      return { 0: INCH, 1: X_INCH_B }
    case X_AAVE_B_AAVE_CLR:
      return { 0: X_AAVE_B, 1: AAVE }
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
export const getXAssetPrices = async (symbol, provider) => {
  switch (symbol) {
    case X_AAVE_A:
    case X_AAVE_B: {
      const {
        kyberProxyContract,
        network,
        xaaveContract,
      } = await getXAaveContracts(symbol, provider)
      return getXAavePrices(xaaveContract, kyberProxyContract, network.chainId)
    }
    case X_ALPHA_A: {
      const { kyberProxyContract, xalphaContract } = await getXAlphaContracts(
        symbol,
        provider
      )
      return getXAlphaPrices(xalphaContract, kyberProxyContract)
    }
    case X_BNT_A: {
      const { kyberProxyContract, xbntContract } = await getXBntContracts(
        symbol,
        provider
      )
      return getXBntPrices(xbntContract, kyberProxyContract)
    }
    case X_INCH_A:
    case X_INCH_B: {
      const {
        kyberProxyContract,
        network,
        xinchContract,
      } = await getXInchContracts(symbol, provider)
      return getXInchPrices(xinchContract, kyberProxyContract, network.chainId)
    }
    case X_KNC_A:
    case X_KNC_B: {
      const {
        kncContract,
        kyberProxyContract,
        xkncContract,
      } = await getXKncContracts(symbol, provider)
      return getXKncPrices(xkncContract, kncContract, kyberProxyContract)
    }
    case X_SNX_A: {
      const {
        network,
        snxContract,
        tradeAccountingContract,
        xsnxContract,
      } = await getXSnxContracts(provider)
      const exchangeRatesContract = await getExchangeRateContract(provider)
      return getXSnxPrices(
        xsnxContract,
        ADDRESSES[X_SNX_ADMIN][network.chainId],
        tradeAccountingContract,
        exchangeRatesContract,
        snxContract,
        provider
      )
    }
  }
}
export const parseFees = (fee) => {
  return parseEther(fee.isZero() ? '1' : String(1 - 1 / fee.toNumber()))
}
export const getTokenBalance = async (tokenAddress, userAddress, provider) => {
  const contract = new ethers.Contract(tokenAddress, Abi.ERC20, provider)
  return contract.balanceOf(userAddress)
}
export const getUserAvailableTokenBalance = async (contract, address) => {
  let balance
  if (contract.address === ADDRESSES[SNX][1]) {
    balance = await contract.transferableSynthetix(address)
  } else {
    balance = await contract.balanceOf(address)
  }
  return Math.floor(Number(formatEther(balance.toString())) * 10000) / 10000
}
export const getExchangeRateContract = async (provider) => {
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
export const getUniswapPoolAddress = (symbol, chainId) => {
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
export const getUniswapPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = getUniswapPoolAddress(symbol, chainId)
  return new ethers.Contract(address, Abi.UniswapV2Pair, getSigner(provider))
}
export const getSigner = (provider) => {
  try {
    return provider.getSigner()
  } catch (e) {
    return provider
  }
}
export const getSignerAddress = async (provider) => {
  const signer = provider.getSigner()
  return signer.getAddress()
}
export const isXAssetCLRSymbol = async (symbol) => {
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
export const toTitleCase = (text) => {
  return text[0].toUpperCase() + text.slice(1).toLowerCase()
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQ0wsSUFBSSxFQUNKLGlCQUFpQixFQUNqQixHQUFHLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxHQUFHLEVBQ0gsZUFBZSxFQUNmLElBQUksRUFDSixHQUFHLEVBQ0gsR0FBRyxFQUNILGNBQWMsRUFDZCxJQUFJLEVBQ0osSUFBSSxFQUNKLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLEdBQUcsRUFDSCxXQUFXLEVBQ1gsT0FBTyxFQUNQLEtBQUssRUFDTCxLQUFLLEVBQ0wsR0FBRyxFQUNILDBCQUEwQixFQUMxQixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLGVBQWUsRUFDZixJQUFJLEVBQ0osSUFBSSxFQUNKLEdBQUcsRUFDSCxJQUFJLEVBQ0osSUFBSSxFQUNKLFFBQVEsRUFDUixzQkFBc0IsRUFDdEIsUUFBUSxFQUNSLGlCQUFpQixFQUNqQixzQkFBc0IsRUFDdEIsU0FBUyxFQUNULG1CQUFtQixFQUNuQixPQUFPLEVBQ1AsbUJBQW1CLEVBQ25CLFFBQVEsRUFDUixrQkFBa0IsRUFDbEIsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixPQUFPLEVBQ1AsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixvQkFBb0IsRUFDcEIsT0FBTyxFQUNQLGVBQWUsRUFDZixvQkFBb0IsRUFDcEIsT0FBTyxFQUNQLHdCQUF3QixFQUN4QixlQUFlLEVBQ2YsV0FBVyxFQUNYLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsR0FBRyxFQUNILFdBQVcsRUFDWCw2QkFBNkIsR0FDOUIsTUFBTSxjQUFjLENBQUE7QUFDckIsT0FBTyxFQUFhLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FB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
