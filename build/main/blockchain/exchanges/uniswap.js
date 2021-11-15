'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getUniswapPortfolioItem = exports.getUniswapEstimatedQuantity = exports.getEthTokenPrice = exports.getEthUsdcPrice = exports.getBtcUsdcPrice = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const sdk_1 = require('@uniswap/sdk')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../utils')
const xknc_1 = require('../xknc')
const helper_1 = require('../xknc/helper')
const helper_2 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const getBtcUsdcPrice = async (provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const usdcAddress = abis_1.ADDRESSES[abis_1.USDC][chainId]
  const usdcToken = new sdk_1.Token(sdk_1.ChainId.MAINNET, usdcAddress, 6)
  const wbtcAddress = abis_1.ADDRESSES[abis_1.WBTC][chainId]
  const wbtcToken = new sdk_1.Token(sdk_1.ChainId.MAINNET, wbtcAddress, 8)
  const pair = await sdk_1.Fetcher.fetchPairData(usdcToken, wbtcToken, provider)
  const route = new sdk_1.Route([pair], wbtcToken)
  return route.midPrice.toSignificant(6)
}
exports.getBtcUsdcPrice = getBtcUsdcPrice
const getEthUsdcPrice = async (provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const usdcAddress = abis_1.ADDRESSES[abis_1.USDC][chainId]
  const usdcToken = new sdk_1.Token(sdk_1.ChainId.MAINNET, usdcAddress, 6)
  const pair = await sdk_1.Fetcher.fetchPairData(
    usdcToken,
    sdk_1.WETH[usdcToken.chainId],
    provider
  )
  const route = new sdk_1.Route([pair], sdk_1.WETH[usdcToken.chainId])
  return route.midPrice.toSignificant(6)
}
exports.getEthUsdcPrice = getEthUsdcPrice
const getEthTokenPrice = async (tokenAddress, isPriceInvert, provider) => {
  const token = new sdk_1.Token(sdk_1.ChainId.MAINNET, tokenAddress, 18)
  const pair = await sdk_1.Fetcher.fetchPairData(
    token,
    sdk_1.WETH[token.chainId],
    provider
  )
  const route = new sdk_1.Route([pair], sdk_1.WETH[token.chainId])
  return isPriceInvert
    ? route.midPrice.invert().toSignificant(6)
    : route.midPrice.toSignificant(6)
}
exports.getEthTokenPrice = getEthTokenPrice
const getUniswapEstimatedQuantity = async (
  tokenIn,
  symbol,
  amount,
  tradeType,
  provider
) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const inputAmount = parseEther(amount)
  const slippageTolerance = new sdk_1.Percent('50', '10000')
  const token = utils_1.getTokenSymbol(symbol)
  // Addresses
  const kncAddress = abis_1.ADDRESSES[token][chainId]
  const xkncAddress = abis_1.ADDRESSES[symbol][chainId]
  let tokenInAddress
  if (tradeType === abis_1.BUY) {
    tokenInAddress =
      tokenIn === abis_1.ETH
        ? abis_1.ADDRESSES[abis_1.WETH][chainId]
        : kncAddress
  } else {
    tokenInAddress = xkncAddress
  }
  const inputToken = new sdk_1.Token(chainId, tokenInAddress, 18)
  const kncToken = new sdk_1.Token(chainId, kncAddress, 18)
  const xKNCToken = new sdk_1.Token(chainId, xkncAddress, 18)
  const ethXKncPair = await sdk_1.Fetcher.fetchPairData(
    sdk_1.WETH[sdk_1.ChainId.MAINNET],
    xKNCToken,
    provider
  )
  const kncEthPair = await sdk_1.Fetcher.fetchPairData(
    kncToken,
    sdk_1.WETH[sdk_1.ChainId.MAINNET],
    provider
  )
  let pairs = [ethXKncPair]
  if (tokenIn !== abis_1.ETH) {
    pairs =
      tradeType === abis_1.BUY
        ? [kncEthPair, ethXKncPair]
        : [ethXKncPair, kncEthPair]
  }
  const route = new sdk_1.Route(pairs, inputToken)
  const trade = new sdk_1.Trade(
    route,
    new sdk_1.TokenAmount(inputToken, inputAmount.toString()),
    sdk_1.TradeType.EXACT_INPUT
  )
  const amountOutMin = trade.minimumAmountOut(slippageTolerance)
  return amountOutMin.toSignificant(6)
}
exports.getUniswapEstimatedQuantity = getUniswapEstimatedQuantity
const getUniswapPortfolioItem = async (symbol, address, provider) => {
  const { network, xkncContract } = await helper_1.getXKncContracts(
    symbol,
    provider
  )
  const { chainId } = network
  // Addresses
  const asset = `${symbol} - ${abis_1.ETH.toUpperCase()}`
  const uniswapPoolAddress = utils_1.getUniswapPoolAddress(symbol, chainId)
  // Contracts
  const uniswapPoolContract = utils_1.getUniswapPoolContract(
    symbol,
    provider,
    chainId
  )
  let userBalance = bignumber_1.BigNumber.from('0')
  try {
    userBalance = await uniswapPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  const { priceUsd } = await xknc_1.getXKncPrices(xkncContract)
  const uniswapPoolBalances = await helper_2.getBalances(
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
    .mul(constants_1.DEC_18)
    .div(xkncEthPoolSupply)
  const value = poolPrice.mul(userBalance).div(constants_1.DEC_18)
  return {
    asset,
    balances: uniswapPoolBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice: priceUsd,
    value: formatEther(value),
  }
}
exports.getUniswapPortfolioItem = getUniswapPortfolioItem
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2V4Y2hhbmdlcy91bmlzd2FwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUVwRCxzQ0FVcUI7QUFDckIsdUNBU3FCO0FBQ3JCLG1DQUErQjtBQUUvQiwrQ0FBd0M7QUFHeEMsb0NBSWlCO0FBQ2pCLGtDQUF1QztBQUN2QywyQ0FBaUQ7QUFFakQscUNBQXNDO0FBRXRDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQTtBQUV6QyxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQ2xDLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMzQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sV0FBVyxHQUFHLGdCQUFTLENBQUMsV0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxXQUFLLENBQUMsYUFBTyxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFFNUQsTUFBTSxXQUFXLEdBQUcsZ0JBQVMsQ0FBQyxXQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM1QyxNQUFNLFNBQVMsR0FBRyxJQUFJLFdBQUssQ0FBQyxhQUFPLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUU1RCxNQUFNLElBQUksR0FBRyxNQUFNLGFBQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN4RSxNQUFNLEtBQUssR0FBRyxJQUFJLFdBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBRTFDLE9B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
