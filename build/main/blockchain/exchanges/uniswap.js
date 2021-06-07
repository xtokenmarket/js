'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getUniswapPortfolioItem = exports.getUniswapEstimatedQuantity = exports.getEthTokenPrice = exports.getEthUsdcPrice = void 0
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
  const {
    kncContract,
    kyberProxyContract,
    network,
    xkncContract,
  } = await helper_1.getXKncContracts(symbol, provider)
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
  const { priceUsd } = await xknc_1.getXKncPrices(
    xkncContract,
    kncContract,
    kyberProxyContract
  )
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2V4Y2hhbmdlcy91bmlzd2FwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUVwRCxzQ0FVcUI7QUFDckIsdUNBUXFCO0FBQ3JCLG1DQUF5QztBQUV6QywrQ0FBd0M7QUFHeEMsb0NBSWlCO0FBQ2pCLGtDQUF1QztBQUN2QywyQ0FBaUQ7QUFFakQscUNBQXNDO0FBRXRDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQTtBQUV6QyxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQ2xDLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMzQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sV0FBVyxHQUFHLGdCQUFTLENBQUMsV0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxXQUFLLENBQUMsYUFBTyxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFFNUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxhQUFPLENBQUMsYUFBYSxDQUN0QyxTQUFTLEVBQ1QsVUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFDdkIsUUFBUSxDQUNULENBQUE7SUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLFdBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUV4RCxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3hDLENBQUMsQ0FBQTtBQWpCWSxRQUFBLGVBQWUsbUJBaUIzQjtBQUVN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
