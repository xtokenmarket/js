import {
  AAVE,
  AAVE_X_AAVE_A_CLR,
  Abi,
  ADDRESSES,
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
  LENDING_COMPTROLLER,
  LENDING_LIQUIDITY_POOL,
  LENDING_LPT,
  LENDING_X_AAVE_A_MARKET,
  LENDING_X_AAVE_A_PRICE,
  LENDING_X_AAVE_B_MARKET,
  LENDING_X_AAVE_B_PRICE,
  LENDING_X_INCH_A_MARKET,
  LENDING_X_INCH_A_PRICE,
  LENDING_X_INCH_B_MARKET,
  LENDING_X_INCH_B_PRICE,
  LENDING_X_KNC_A_MARKET,
  LENDING_X_KNC_A_PRICE,
  LENDING_X_KNC_B_MARKET,
  LENDING_X_KNC_B_PRICE,
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
    case BNT_X_BNT_A_CLR:
    case INCH_X_INCH_A_CLR:
    case INCH_X_INCH_B_CLR:
    case X_AAVE_B_AAVE_CLR:
    case X_KNC_A_KNC_CLR:
    case X_KNC_B_KNC_CLR:
    case X_SNX_A_SNX_CLR:
    case XTK_ETH_CLR:
      return Abi.xAssetCLR
    case LENDING_COMPTROLLER:
      return Abi.Comptroller
    case LENDING_LIQUIDITY_POOL:
      return Abi.LiquidityPool
    case LENDING_LPT:
      return Abi.LPT
    case LENDING_X_AAVE_A_MARKET:
    case LENDING_X_AAVE_B_MARKET:
    case LENDING_X_INCH_A_MARKET:
    case LENDING_X_INCH_B_MARKET:
    case LENDING_X_KNC_A_MARKET:
    case LENDING_X_KNC_B_MARKET:
      return Abi.Market
    case LENDING_X_AAVE_A_PRICE:
    case LENDING_X_AAVE_B_PRICE:
      return Abi.xAAVEPrice
    case LENDING_X_INCH_A_PRICE:
    case LENDING_X_INCH_B_PRICE:
      return Abi.xINCHPrice
    case LENDING_X_KNC_A_PRICE:
    case LENDING_X_KNC_B_PRICE:
      return Abi.xKNCPrice
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQ0wsSUFBSSxFQUNKLGlCQUFpQixFQUNqQixHQUFHLEVBQ0gsU0FBUyxFQUNULEdBQUcsRUFDSCxlQUFlLEVBQ2YsSUFBSSxFQUNKLEdBQUcsRUFDSCxHQUFHLEVBQ0gsY0FBYyxFQUNkLElBQUksRUFDSixJQUFJLEVBQ0osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsR0FBRyxFQUNILFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIsc0JBQXNCLEVBQ3RCLFdBQVcsRUFDWCx1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3RCLHVCQUF1QixFQUN2QixzQkFBc0IsRUFDdEIsdUJBQXVCLEVBQ3ZCLHNCQUFzQixFQUN0Qix1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3RCLHNCQUFzQixFQUN0QixxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQixPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxHQUFHLEVBQ0gsMEJBQTBCLEVBQzFCLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsZUFBZSxFQUNmLElBQUksRUFDSixJQUFJLEVBQ0osR0FBRyxFQUNILElBQUksRUFDSixJQUFJLEVBQ0osUUFBUSxFQUNSLHNCQUFzQixFQUN0QixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLHNCQUFzQixFQUN0QixPQUFPLEVBQ1AsbUJBQW1CLEVBQ25CLFFBQVEsRUFDUixrQkFBa0IsRUFDbEIsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixPQUFPLEVBQ1AsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixvQkFBb0IsRUFDcEIsT0FBTyxFQUNQLGVBQWUsRUFDZixvQkFBb0IsRUFDcEIsT0FBTyxFQUNQLHdCQUF3QixFQUN4QixlQUFlLEVBQ2YsV0FBVyxFQUNYLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsR0FBRyxFQUNILFdBQVcsRUFDWCw2QkFBNkIsR0FDOUIsTUFBTSxjQUFjLENBQUE7QUFDckIsT0FBTyxFQUFhLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUcxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBWTFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFDeEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUN0QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDaEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUN4QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3RDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ3RDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUVoRCxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7QUFFaEQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBcUIsRUFBRSxFQUFFO0lBQ3ZELElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzdDLE9BQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFBO0tBQzVCO0lBQ0QsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxZQUF3QixFQUFFLEVBQUU7SUFDakQsUUFBUSxZQUFZLEVBQUU7UUFDcEIsS0FBSyxJQUFJLENBQUM7UUFDVixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssSUFBSSxDQUFDO1FBQ1YsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssSUFBSSxDQUFDO1FBQ1YsS0FBSyxJQUFJLENBQUM7UUFDVixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssT0FBTyxDQUFDO1FBQ2IsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssSUFBSSxDQUFDO1FBQ1YsS0FBSyxJQUFJLENBQUM7UUFDVixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssSUFBSSxDQUFDO1FBQ1YsS0FBSyxJQUFJLENBQUM7UUFDVixLQUFLLEdBQUc7WUFDTixPQUFPLEdBQUcsQ0FBQyxLQUEwQixDQUFBO1FBQ3ZDLEtBQUssY0FBYztZQUNqQixPQUFPLEdBQUcsQ0FBQyxhQUFrQyxDQUFBO1FBQy9DLEtBQUssdUJBQXVCO1lBQzFCLE9BQU8sR0FBRyxDQUFDLHFCQUEwQyxDQUFBO1FBQ3ZELEtBQUssV0FBVztZQUNkLE9BQU8sR0FBRyxDQUFDLFVBQStCLENBQUE7UUFDNUMsS0FBSyxHQUFHO1lBQ04sT0FBTyxHQUFHLENBQUMsU0FBOEIsQ0FBQTtRQUMzQyxLQUFLLGdCQUFnQjtZQUNuQixPQUFPLEdBQUcsQ0FBQyxlQUFvQyxDQUFBO1FBQ2pELEtBQUssZUFBZTtZQUNsQixPQUFPLEdBQUcsQ0FBQyxjQUFtQyxDQUFBO1FBQ2hELEtBQUssZUFBZTtZQUNsQixPQUFPLEdBQUcsQ0FBQyxhQUFrQyxDQUFBO1FBQy9DLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxRQUFRO1lBQ1gsT0FBTyxHQUFHLENBQUMsS0FBMEIsQ0FBQTtRQUN2QyxLQUFLLE9BQU87WUFDVixPQUFPLEdBQUcsQ0FBQyxJQUF5QixDQUFBO1FBQ3RDLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxRQUFRO1lBQ1gsT0FBTyxHQUFHLENBQUMsS0FBMEIsQ0FBQTtRQUN2QyxLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssT0FBTztZQUNWLE9BQU8sR0FBRyxDQUFDLElBQXlCLENBQUE7UUFDdEMsS0FBSyxPQUFPO1lBQ1YsT0FBTyxHQUFHLENBQUMsSUFBeUIsQ0FBQTtRQUN0QyxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssUUFBUTtZQUNYLE9BQU8sR0FBRyxDQUFDLEtBQTBCLENBQUE7UUFDdkMsS0FBSyw2QkFBNkI7WUFDaEMsT0FBTyxHQUFHLENBQUMsMEJBQStDLENBQUE7UUFDNUQsS0FBSyxpQkFBaUIsQ0FBQztRQUN2QixLQUFLLGVBQWUsQ0FBQztRQUNyQixLQUFLLGlCQUFpQixDQUFDO1FBQ3ZCLEtBQUssaUJBQWlCLENBQUM7UUFDdkIsS0FBSyxpQkFBaUIsQ0FBQztRQUN2QixLQUFLLGVBQWUsQ0FBQztRQUNyQixLQUFLLGVBQWUsQ0FBQztRQUNyQixLQUFLLGVBQWUsQ0FBQztRQUNyQixLQUFLLFdBQVc7WUFDZCxPQUFPLEdBQUcsQ0FBQyxTQUE4QixDQUFBO1FBQzNDLEtBQUssbUJBQW1CO1lBQ3RCLE9BQU8sR0FBRyxDQUFDLFdBQWdDLENBQUE7UUFDN0MsS0FBSyxzQkFBc0I7WUFDekIsT0FBTyxHQUFHLENBQUMsYUFBa0MsQ0FBQTtRQUMvQyxLQUFLLFdBQVc7WUFDZCxPQUFPLEdBQUcsQ0FBQyxHQUF3QixDQUFBO1FBQ3JDLEtBQUssdUJBQXVCLENBQUM7UUFDN0IsS0FBSyx1QkFBdUIsQ0FBQztRQUM3QixLQUFLLHVCQUF1QixDQUFDO1FBQzdCLEtBQUssdUJBQXVCLENBQUM7UUFDN0IsS0FBSyxzQkFBc0IsQ0FBQztRQUM1QixLQUFLLHNCQUFzQjtZQUN6QixPQUFPLEdBQUcsQ0FBQyxNQUEyQixDQUFBO1FBQ3hDLEtBQUssc0JBQXNCLENBQUM7UUFDNUIsS0FBSyxzQkFBc0I7WUFDekIsT0FBTyxHQUFHLENBQUMsVUFBK0IsQ0FBQTtRQUM1QyxLQUFLLHNCQUFzQixDQUFDO1FBQzVCLEtBQUssc0JBQXNCO1lBQ3pCLE9BQU8sR0FBRyxDQUFDLFVBQStCLENBQUE7UUFDNUMsS0FBSyxxQkFBcUIsQ0FBQztRQUMzQixLQUFLLHFCQUFxQjtZQUN4QixPQUFPLEdBQUcsQ0FBQyxTQUE4QixDQUFBO0tBQzVDO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsQ0FDcEMsTUFBcUIsRUFDckIsT0FBZSxFQUNmLEVBQUU7SUFDRixJQUFJLE9BQU8sQ0FBQTtJQUNYLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxRQUFRO1lBQ1gsT0FBTyxHQUFHLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3BELE1BQUs7UUFDUCxLQUFLLFFBQVE7WUFDWCxPQUFPLEdBQUcsU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDcEQsTUFBSztRQUNQLEtBQUssT0FBTztZQUNWLE9BQU8sR0FBRyxTQUFTLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN0RCxNQUFLO1FBQ1A7WUFDRSxPQUFPLEdBQUcsSUFBSSxDQUFBO0tBQ2pCO0lBQ0QsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsQ0FDckMsTUFBcUIsRUFDckIsUUFBc0IsRUFDdEIsT0FBZSxFQUNmLEVBQUU7SUFDRixJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFBO0lBRXJDLE1BQU0sT0FBTyxHQUFHLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUV2RCxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBRXpCLE9BQU8sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0FBQzVFLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQ2xDLE1BQXFCLEVBQ3JCLE9BQWUsRUFDZixFQUFFO0lBQ0YsSUFBSSxPQUFPLENBQUE7SUFDWCxRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssT0FBTztZQUNWLE9BQU8sR0FBRyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNqRCxNQUFLO1FBQ1A7WUFDRSxPQUFPLEdBQUcsSUFBSSxDQUFBO0tBQ2pCO0lBQ0QsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsQ0FDbkMsTUFBcUIsRUFDckIsUUFBc0IsRUFDdEIsT0FBZSxFQUNmLEVBQUU7SUFDRixJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFBO0lBRXJDLE1BQU0sT0FBTyxHQUFHLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUVyRCxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBRXpCLE9BQU8sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7QUFDaEYsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQ3pCLFlBQXdCLEVBQ3hCLFFBQXNCLEVBQ3RCLE9BQWdCLEVBQ2hCLEVBQUU7SUFDRixJQUFJLENBQUMsUUFBUTtRQUFFLE9BQU8sSUFBSSxDQUFBO0lBRTFCLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEQsSUFBSSxDQUFDLE9BQU87UUFBRSxPQUFPLElBQUksQ0FBQTtJQUV6QixPQUFPLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0FBQ2hGLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQ2xDLGtCQUE4QixFQUM5QixVQUFrQixFQUNsQixXQUFtQixFQUNuQixNQUFpQixFQUNqQixTQUFTLEdBQUcsS0FBSyxFQUNqQixFQUFFO0lBQ0YsSUFBSSxTQUFTLEVBQUU7UUFDYixPQUFPLFdBQVcsQ0FBQTtLQUNuQjtJQUVELE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUFDLGVBQWUsQ0FDL0QsVUFBVSxFQUNWLFdBQVcsRUFDWCxNQUFNLENBQ1AsQ0FBQTtJQUNELE9BQU8sWUFBWSxDQUFBO0FBQ3JCLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLENBQ2hDLE1BQXlDLEVBQ3pDLE9BQWUsRUFDZixFQUFFO0lBQ0YsSUFBSSxPQUFPLENBQUE7SUFDWCxRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssUUFBUTtZQUNYLE9BQU8sR0FBRyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNoRCxNQUFLO1FBQ1AsS0FBSyxRQUFRO1lBQ1gsT0FBTyxHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2hELE1BQUs7UUFDUDtZQUNFLE9BQU8sR0FBRyxJQUFJLENBQUE7S0FDakI7SUFDRCxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxDQUNqQyxNQUF5QyxFQUN6QyxRQUFzQixFQUN0QixPQUFlLEVBQ2YsRUFBRTtJQUNGLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFFckMsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBVyxDQUFBO0lBRTdELE9BQU8sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUN4QixPQUFPLEVBQ1AsR0FBRyxDQUFDLHFCQUFxQixFQUN6QixTQUFTLENBQUMsUUFBUSxDQUFDLENBQ3BCLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxDQUNqQyxNQUF1QyxFQUN2QyxPQUFlLEVBQ2YsRUFBRTtJQUNGLElBQUksT0FBTyxDQUFBO0lBQ1gsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLE9BQU87WUFDVixPQUFPLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDaEQsTUFBSztRQUNQO1lBQ0UsT0FBTyxHQUFHLElBQUksQ0FBQTtLQUNqQjtJQUNELE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQ2xDLE1BQXVDLEVBQ3ZDLFFBQXNCLEVBQ3RCLE9BQWUsRUFDZixFQUFFO0lBQ0YsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPLElBQUksQ0FBQTtJQUVyQyxNQUFNLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFXLENBQUE7SUFFOUQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7QUFDdkUsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLENBQUMsTUFBcUIsRUFBRSxFQUFFO0lBQ3RELFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFFBQVE7WUFDWCxPQUFPLElBQUksQ0FBQTtRQUNiLEtBQUssT0FBTztZQUNWLE9BQU8sR0FBRyxDQUFBO1FBQ1osS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFFBQVE7WUFDWCxPQUFPLElBQUksQ0FBQTtRQUNiLEtBQUssT0FBTyxDQUFDO1FBQ2IsS0FBSyxPQUFPO1lBQ1YsT0FBTyxHQUFHLENBQUE7UUFDWixLQUFLLE9BQU87WUFDVixPQUFPLEdBQUcsQ0FBQTtLQUNiO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxNQUF1QixFQUFjLEVBQUU7SUFDdEUsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLFFBQVE7WUFDWCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDNUIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFBO1FBQzdCLEtBQUssUUFBUTtZQUNYLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQTtRQUM5QixLQUFLLFFBQVE7WUFDWCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDOUIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFBO1FBQ2hDLEtBQUssUUFBUTtZQUNYLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUM1QixLQUFLLFFBQVE7WUFDWCxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDN0IsS0FBSyxRQUFRO1lBQ1gsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFBO0tBQzlCO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxNQUFxQixFQUFjLEVBQUU7SUFDdEUsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLFFBQVE7WUFDWCxPQUFPLGlCQUFpQixDQUFBO1FBQzFCLEtBQUssUUFBUTtZQUNYLE9BQU8saUJBQWlCLENBQUE7UUFDMUIsS0FBSyxPQUFPO1lBQ1YsT0FBTyxlQUFlLENBQUE7UUFDeEIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxpQkFBaUIsQ0FBQTtRQUMxQixLQUFLLFFBQVE7WUFDWCxPQUFPLGlCQUFpQixDQUFBO1FBQzFCLEtBQUssT0FBTztZQUNWLE9BQU8sZUFBZSxDQUFBO1FBQ3hCLEtBQUssT0FBTztZQUNWLE9BQU8sZUFBZSxDQUFBO1FBQ3hCLEtBQUssT0FBTztZQUNWLE9BQU8sZUFBZSxDQUFBO0tBQ3pCO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxNQUFrQixFQUFhLEVBQUU7SUFDdkUsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLGlCQUFpQjtZQUNwQixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUE7UUFDakMsS0FBSyxlQUFlO1lBQ2xCLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQTtRQUMvQixLQUFLLGlCQUFpQjtZQUNwQixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUE7UUFDakMsS0FBSyxpQkFBaUI7WUFDcEIsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFBO1FBQ2pDLEtBQUssaUJBQWlCO1lBQ3BCLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQTtRQUNqQyxLQUFLLGVBQWU7WUFDbEIsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQy9CLEtBQUssZUFBZTtZQUNsQixPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDL0IsS0FBSyxlQUFlO1lBQ2xCLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUMvQixLQUFLLFdBQVc7WUFDZCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUE7S0FDN0I7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUNsQyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssUUFBUSxDQUFDLENBQUM7WUFDYixNQUFNLEVBQ0osa0JBQWtCLEVBQ2xCLE9BQU8sRUFDUCxhQUFhLEdBQ2QsR0FBRyxNQUFNLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUM3QyxPQUFPLGNBQWMsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQzFFO1FBQ0QsS0FBSyxPQUFPLENBQUMsQ0FBQztZQUNaLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLGdCQUFnQixDQUNqRSxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUE7WUFDRCxPQUFPLGFBQWEsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtTQUN2RDtRQUNELEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxRQUFRLENBQUMsQ0FBQztZQUNiLE1BQU0sRUFDSixrQkFBa0IsRUFDbEIsT0FBTyxFQUNQLGFBQWEsR0FDZCxHQUFHLE1BQU0saUJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQzdDLE9BQU8sY0FBYyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDMUU7UUFDRCxLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssT0FBTyxDQUFDLENBQUM7WUFDWixNQUFNLEVBQ0osV0FBVyxFQUNYLGtCQUFrQixFQUNsQixZQUFZLEdBQ2IsR0FBRyxNQUFNLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUM1QyxPQUFPLGFBQWEsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixDQUFDLENBQUE7U0FDcEU7UUFDRCxLQUFLLE9BQU8sQ0FBQyxDQUFDO1lBQ1osTUFBTSxFQUNKLE9BQU8sRUFDUCxXQUFXLEVBQ1gsdUJBQXVCLEVBQ3ZCLFlBQVksR0FDYixHQUFHLE1BQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDcEMsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLE1BQU0sdUJBQXVCLENBQzFELFFBQVEsQ0FDVCxDQUFrQixDQUFBO1lBQ25CLE9BQU8sYUFBYSxDQUNsQixZQUFZLEVBQ1osU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFDdkMsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQixXQUFXLEVBQ1gsUUFBUSxDQUNULENBQUE7U0FDRjtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLENBQUMsR0FBYyxFQUFFLEVBQUU7SUFDMUMsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDeEUsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUcsS0FBSyxFQUMvQyxRQUFrQixFQUNsQixPQUFlLEVBQ2YsRUFBRTtJQUNGLElBQUksT0FBTyxDQUFBO0lBQ1gsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMxQyxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDeEQ7U0FBTTtRQUNMLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDNUM7SUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQTtBQUM1RSxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxLQUFLLEVBQUUsUUFBc0IsRUFBRSxFQUFFO0lBQ3RFLElBQUksQ0FBQyxRQUFRO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFFMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUNsQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDeEMsR0FBRyxDQUFDLGVBQWUsRUFDbkIsUUFBUSxDQUNULENBQUE7SUFDRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxDQUNsRCxDQUFBO0lBRUQsSUFBSSxDQUFDLE9BQU87UUFBRSxPQUFPLElBQUksQ0FBQTtJQUV6QixPQUFPLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUM3RSxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxDQUNuQyxNQUF1QyxFQUN2QyxPQUFlLEVBQ2YsRUFBRTtJQUNGLElBQUksT0FBTyxDQUFBO0lBQ1gsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLE9BQU87WUFDVixPQUFPLEdBQUcsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDbEQsTUFBSztRQUNQLEtBQUssT0FBTztZQUNWLE9BQU8sR0FBRyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNsRCxNQUFLO1FBQ1A7WUFDRSxPQUFPLEdBQUcsSUFBSSxDQUFBO0tBQ2pCO0lBQ0QsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsQ0FDcEMsTUFBdUMsRUFDdkMsUUFBc0IsRUFDdEIsT0FBZSxFQUNmLEVBQUU7SUFDRixJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFBO0lBRXJDLE1BQU0sT0FBTyxHQUFHLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQVcsQ0FBQTtJQUVoRSxPQUFPLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUM3RSxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxRQUFzQixFQUFFLEVBQUU7SUFDbEQsSUFBSTtRQUNGLE9BQVEsUUFBNEIsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtLQUNqRDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxRQUFRLENBQUE7S0FDaEI7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsUUFBc0IsRUFBRSxFQUFFO0lBQy9ELE1BQU0sTUFBTSxHQUFJLFFBQTRCLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDeEQsT0FBTyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUE7QUFDNUIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUFFLE1BQWMsRUFBRSxFQUFFO0lBQ3hELE9BQU87UUFDTCxpQkFBaUI7UUFDakIsZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIsaUJBQWlCO1FBQ2pCLGVBQWU7UUFDZixlQUFlO1FBQ2YsZUFBZTtLQUNoQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNwQixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtJQUMxQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBQzVELENBQUMsQ0FBQSJ9
