import { BigNumber } from '@ethersproject/bignumber'
import {
  ChainId,
  Fetcher,
  Percent,
  Route,
  Token,
  TokenAmount,
  Trade,
  TradeType,
  WETH,
} from '@uniswap/sdk'
import { ADDRESSES, BUY, ETH, USDC, WETH as WETH_SYMBOL } from '@xtoken/abis'
import { ethers } from 'ethers'
import { DEC_18 } from '../../constants'
import {
  getTokenSymbol,
  getUniswapPoolAddress,
  getUniswapPoolContract,
} from '../utils'
import { getXKncPrices } from '../xknc'
import { getXKncContracts } from '../xknc/helper'
import { getBalances } from './helper'
const { formatEther, parseEther } = ethers.utils
export const getEthUsdcPrice = async (provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const usdcAddress = ADDRESSES[USDC][chainId]
  const usdcToken = new Token(ChainId.MAINNET, usdcAddress, 6)
  const pair = await Fetcher.fetchPairData(
    usdcToken,
    WETH[usdcToken.chainId],
    provider
  )
  const route = new Route([pair], WETH[usdcToken.chainId])
  return route.midPrice.toSignificant(6)
}
export const getEthTokenPrice = async (
  tokenAddress,
  isPriceInvert,
  provider
) => {
  const token = new Token(ChainId.MAINNET, tokenAddress, 18)
  const pair = await Fetcher.fetchPairData(token, WETH[token.chainId], provider)
  const route = new Route([pair], WETH[token.chainId])
  return isPriceInvert
    ? route.midPrice.invert().toSignificant(6)
    : route.midPrice.toSignificant(6)
}
export const getUniswapEstimatedQuantity = async (
  tokenIn,
  symbol,
  amount,
  tradeType,
  provider
) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const inputAmount = parseEther(amount)
  const slippageTolerance = new Percent('50', '10000')
  const token = getTokenSymbol(symbol)
  // Addresses
  const kncAddress = ADDRESSES[token][chainId]
  const xkncAddress = ADDRESSES[symbol][chainId]
  let tokenInAddress
  if (tradeType === BUY) {
    tokenInAddress =
      tokenIn === ETH ? ADDRESSES[WETH_SYMBOL][chainId] : kncAddress
  } else {
    tokenInAddress = xkncAddress
  }
  const inputToken = new Token(chainId, tokenInAddress, 18)
  const kncToken = new Token(chainId, kncAddress, 18)
  const xKNCToken = new Token(chainId, xkncAddress, 18)
  const ethXKncPair = await Fetcher.fetchPairData(
    WETH[ChainId.MAINNET],
    xKNCToken,
    provider
  )
  const kncEthPair = await Fetcher.fetchPairData(
    kncToken,
    WETH[ChainId.MAINNET],
    provider
  )
  let pairs = [ethXKncPair]
  if (tokenIn !== ETH) {
    pairs =
      tradeType === BUY ? [kncEthPair, ethXKncPair] : [ethXKncPair, kncEthPair]
  }
  const route = new Route(pairs, inputToken)
  const trade = new Trade(
    route,
    new TokenAmount(inputToken, inputAmount.toString()),
    TradeType.EXACT_INPUT
  )
  const amountOutMin = trade.minimumAmountOut(slippageTolerance)
  return amountOutMin.toSignificant(6)
}
export const getUniswapPortfolioItem = async (symbol, address, provider) => {
  const {
    kncContract,
    kyberProxyContract,
    network,
    xkncContract,
  } = await getXKncContracts(symbol, provider)
  const { chainId } = network
  // Addresses
  const asset = `${symbol} - ${ETH.toUpperCase()}`
  const uniswapPoolAddress = getUniswapPoolAddress(symbol, chainId)
  // Contracts
  const uniswapPoolContract = getUniswapPoolContract(symbol, provider, chainId)
  let userBalance = BigNumber.from('0')
  try {
    userBalance = await uniswapPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  const { priceUsd } = await getXKncPrices(
    xkncContract,
    kncContract,
    kyberProxyContract
  )
  const uniswapPoolBalances = await getBalances(
    symbol,
    uniswapPoolAddress,
    priceUsd,
    provider,
    chainId,
    undefined,
    true
  )
  const xkncEthPoolSupply = await uniswapPoolContract.totalSupply()
  const poolPrice = parseEther(uniswapPoolBalances.eth.val)
    .mul(2)
    .mul(DEC_18)
    .div(xkncEthPoolSupply)
  const value = poolPrice.mul(userBalance).div(DEC_18)
  return {
    asset,
    balances: uniswapPoolBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice: priceUsd,
    value: formatEther(value),
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2V4Y2hhbmdlcy91bmlzd2FwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQTtBQUVwRCxPQUFPLEVBQ0wsT0FBTyxFQUNQLE9BQU8sRUFDUCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxXQUFXLEVBQ1gsS0FBSyxFQUNMLFNBQVMsRUFDVCxJQUFJLEdBQ0wsTUFBTSxjQUFjLENBQUE7QUFDckIsT0FBTyxFQUNMLFNBQVMsRUFDVCxHQUFHLEVBQ0gsR0FBRyxFQUNILElBQUksRUFDSixJQUFJLElBQUksV0FBVyxHQUdwQixNQUFNLGNBQWMsQ0FBQTtBQUNyQixPQUFPLEVBQVksTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRXpDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLHFCQUFxQixFQUNyQixzQkFBc0IsR0FDdkIsTUFBTSxVQUFVLENBQUE7QUFDakIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUN2QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUVqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXRDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtBQUVoRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUNsQyxRQUFzQixFQUNMLEVBQUU7SUFDbkIsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDM0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUUzQixNQUFNLFdBQVcsR0FBRyxT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