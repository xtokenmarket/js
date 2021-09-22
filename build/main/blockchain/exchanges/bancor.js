'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getBancorPortfolioItem = exports.getBancorEstimatedQuantity = exports.getBntEthPrice = exports.getBancorNetworkAddress = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../utils')
const xbnt_1 = require('../xbnt')
const helper_1 = require('../xbnt/helper')
const helper_2 = require('./helper')
const uniswap_1 = require('./uniswap')
const getBancorNetworkAddress = async (provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const ContractRegistry = new ethers_1.Contract(
    abis_1.ADDRESSES[abis_1.BANCOR_CONTRACT_REGISTRY][chainId],
    abis_1.Abi.BancorContractRegistry,
    utils_2.getSigner(provider)
  )
  const bancorNetworkName = utils_1.formatBytes32String('BancorNetwork')
  return ContractRegistry.addressOf(bancorNetworkName)
}
exports.getBancorNetworkAddress = getBancorNetworkAddress
const getBntEthPrice = async (provider) => {
  const bancorNetworkAddress = await exports.getBancorNetworkAddress(provider)
  const BancorNetworkContract = new ethers_1.Contract(
    bancorNetworkAddress,
    abis_1.Abi.BancorNetwork,
    utils_2.getSigner(provider)
  )
  const rate = await BancorNetworkContract.rateByPath(
    constants_1.BNT_ETH_PATH,
    utils_1.parseEther('1')
  )
  return utils_1.formatEther(rate)
}
exports.getBntEthPrice = getBntEthPrice
const getBancorEstimatedQuantity = async (
  tokenIn,
  symbol,
  amount,
  tradeType,
  provider
) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const inputAmount = utils_1.parseEther(amount)
  const token = utils_2.getTokenSymbol(symbol)
  // Bancor Network Contract
  const bancorNetworkAddress = await exports.getBancorNetworkAddress(provider)
  const BancorNetworkContract = new ethers_1.Contract(
    bancorNetworkAddress,
    abis_1.Abi.BancorNetwork,
    utils_2.getSigner(provider)
  )
  // Addresses
  const bntAddress = abis_1.ADDRESSES[token][chainId]
  const xbntAddress = abis_1.ADDRESSES[symbol][chainId]
  let tokenInAddress
  let tokenOutAddress
  if (tradeType === abis_1.BUY) {
    tokenInAddress =
      tokenIn === abis_1.ETH ? abis_1.ADDRESSES[abis_1.ETH] : bntAddress
    tokenOutAddress = xbntAddress
  } else {
    tokenInAddress = xbntAddress
    tokenOutAddress =
      tokenIn === abis_1.ETH ? abis_1.ADDRESSES[abis_1.ETH] : bntAddress
  }
  const path = await BancorNetworkContract.conversionPath(
    tokenInAddress,
    tokenOutAddress
  )
  const rate = await BancorNetworkContract.rateByPath(path, inputAmount)
  return utils_1.formatEther(rate)
}
exports.getBancorEstimatedQuantity = getBancorEstimatedQuantity
const getBancorPortfolioItem = async (symbol, address, provider) => {
  const {
    kyberProxyContract,
    network,
    xbntContract,
  } = await helper_1.getXBntContracts(symbol, provider)
  const { chainId } = network
  const asset = `${symbol} - ${abis_1.BNT.toUpperCase()}`
  // Pool address which has `xBNTa` and `BNT` balances
  const bancorPoolAddress = '0xA35Cf3bDF58EF1cE6a9657659Ebe4cD8b491F2cE'
  // Contracts
  const bancorPoolContract = utils_2.getBancorPoolContract(
    symbol,
    provider,
    chainId
  )
  let userBalance = bignumber_1.BigNumber.from('0')
  try {
    userBalance = await bancorPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  const [ethUsdcPrice, bntEthPrice] = await Promise.all([
    uniswap_1.getEthUsdcPrice(provider),
    exports.getBntEthPrice(provider),
  ])
  const underlyingPrice = utils_1
    .parseEther(bntEthPrice)
    .mul(utils_1.parseEther(ethUsdcPrice))
    .div(constants_1.DEC_18)
  const { priceUsd } = await xbnt_1.getXBntPrices(
    xbntContract,
    kyberProxyContract
  )
  const bancorPoolBalances = await helper_2.getBalances(
    symbol,
    bancorPoolAddress,
    priceUsd,
    provider,
    chainId,
    underlyingPrice,
    false
  )
  const xbntBntPoolSupply = await bancorPoolContract.totalSupply()
  const poolPrice = utils_1
    .parseEther(bancorPoolBalances.totalVal)
    .mul(constants_1.DEC_18)
    .div(xbntBntPoolSupply)
  const value = poolPrice.mul(userBalance).div(constants_1.DEC_18)
  return {
    asset,
    balances: bancorPoolBalances,
    poolPrice: utils_1.formatEther(poolPrice),
    quantity: utils_1.formatEther(userBalance),
    tokenPrice: priceUsd,
    value: utils_1.formatEther(value),
  }
}
exports.getBancorPortfolioItem = getBancorPortfolioItem
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuY29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL2JhbmNvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBb0Q7QUFFcEQsdUNBUXFCO0FBQ3JCLG1DQUFpQztBQUNqQyw0Q0FBK0U7QUFFL0UsK0NBQXNEO0FBR3RELG9DQUEyRTtBQUMzRSxrQ0FBdUM7QUFDdkMsMkNBQWlEO0FBRWpELHFDQUFzQztBQUN0Qyx1Q0FBMkM7QUFFcEMsTUFBTSx1QkFBdUIsR0FBRyxLQUFLLEVBQzFDLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMzQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxpQkFBUSxDQUNuQyxnQkFBUyxDQUFDLCtCQUF3QixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQzVDLFVBQUcsQ0FBQyxzQkFBc0IsRUFDMUIsaUJBQVMsQ0FBQyxRQUFRLENBQUMsQ0FDcEIsQ0FBQTtJQUNELE1BQU0saUJBQWlCLEdBQUcsMkJBQW1CLENBQUMsZUFBZSxDQUFDLENBQUE7SUFFOUQsT0FBTyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUN0RCxDQUFDLENBQUE7QUFkWSxRQUFBLHVCQUF1QiwyQkFjbkM7QUFFTSxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQ2pDLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLG9CQUFvQixHQUFHLE1BQU0sK0JBQXVCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEUsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLGlCQUFRLENBQ3hDLG9CQUFvQixFQUNwQixVQUFHLENBQUMsYUFBYSxFQUNqQixpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUNILENBQUE7SUFFbEIsTUFB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
