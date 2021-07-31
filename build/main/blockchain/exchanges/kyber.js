'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getKyberPortfolioItem = exports.getKyberEstimatedQuantity = void 0
const sdk_1 = require('@dynamic-amm/sdk')
const bignumber_1 = require('@ethersproject/bignumber')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../utils')
const xknc_1 = require('../xknc')
const helper_1 = require('../xknc/helper')
const helper_2 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const getKyberEstimatedQuantity = async (
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
  const dmmFactoryAddress = abis_1.ADDRESSES[abis_1.DMM_FACTORY][chainId]
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
    dmmFactoryAddress,
    provider
  )
  const kncEthPair = await sdk_1.Fetcher.fetchPairData(
    kncToken,
    sdk_1.WETH[sdk_1.ChainId.MAINNET],
    dmmFactoryAddress,
    provider
  )
  let pairs = [...ethXKncPair]
  if (tokenIn !== abis_1.ETH) {
    pairs =
      tradeType === abis_1.BUY
        ? [...kncEthPair, ...ethXKncPair]
        : [...ethXKncPair, ...kncEthPair]
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
exports.getKyberEstimatedQuantity = getKyberEstimatedQuantity
const getKyberPortfolioItem = async (symbol, address, provider) => {
  const {
    kncContract,
    kyberProxyContract,
    network,
    xkncContract,
  } = await helper_1.getXKncContracts(symbol, provider)
  const { chainId } = network
  // Addresses
  const asset = `${symbol}<>${abis_1.ETH.toUpperCase()}`
  const kyberPoolAddress = utils_1.getKyberPoolAddress(symbol, chainId)
  // Contracts
  const kyberPoolContract = utils_1.getKyberPoolContract(
    symbol,
    provider,
    chainId
  )
  let userBalance = bignumber_1.BigNumber.from('0')
  try {
    userBalance = await kyberPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  const { priceUsd } = await xknc_1.getXKncPrices(
    xkncContract,
    kncContract,
    kyberProxyContract
  )
  const kyberPoolBalances = await helper_2.getBalances(
    symbol,
    kyberPoolAddress,
    priceUsd,
    provider,
    chainId,
    undefined,
    true
  )
  const xkncEthPoolSupply = await kyberPoolContract.totalSupply()
  const poolPrice = parseEther(kyberPoolBalances.eth.val)
    .mul(2)
    .mul(constants_1.DEC_18)
    .div(xkncEthPoolSupply)
  const value = poolPrice.mul(userBalance).div(constants_1.DEC_18)
  return {
    asset,
    balances: kyberPoolBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice: priceUsd,
    value: formatEther(value),
  }
}
exports.getKyberPortfolioItem = getKyberPortfolioItem
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3liZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9leGNoYW5nZXMva3liZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMENBVXlCO0FBQ3pCLHdEQUFvRDtBQUVwRCx1Q0FPcUI7QUFDckIsbUNBQXlDO0FBRXpDLCtDQUF3QztBQUd4QyxvQ0FJaUI7QUFDakIsa0NBQXVDO0FBQ3ZDLDJDQUFpRDtBQUVqRCxxQ0FBc0M7QUFFdEMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0seUJBQXlCLEdBQUcsS0FBSyxFQUM1QyxPQUFvQyxFQUNwQyxNQUFzQixFQUN0QixNQUFjLEVBQ2QsU0FBcUIsRUFDckIsUUFBc0IsRUFDTCxFQUFFO0lBQ25CLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQzNDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7SUFFM0IsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxhQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3BELE1BQU0sS0FBSyxHQUFHLHNCQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFcEMsWUFBWTtJQUNaLE1BQU0saUJBQWlCLEdBQUcsZ0JBQVMsQ0FBQyxrQkFBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDekQsTUFBTSxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM1QyxNQUFNLFdBQVcsR0FBRyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzlDLElBQUksY0FBc0IsQ0FBQTtJQUUxQixJQUFJLFNBQVMsS0FBSyxVQUFH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
