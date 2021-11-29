'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getInchPortfolioItem = exports.getInchEstimatedQuantity = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const constants_1 = require('@ethersproject/constants')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_2 = require('../../constants')
const utils_1 = require('../utils')
const xinch_1 = require('../xinch')
const helper_1 = require('../xinch/helper')
const helper_2 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const getInchEstimatedQuantity = async (
  tokenIn,
  symbol,
  amount,
  tradeType,
  provider
) => {
  let inputAmount = parseEther(amount)
  const {
    inchLiquidityProtocolContract,
    network,
  } = await helper_1.getXInchContracts(symbol, provider)
  const { chainId } = network
  // Addresses
  const inchAddress = abis_1.ADDRESSES[abis_1.INCH][chainId]
  const xinchAddress = abis_1.ADDRESSES[symbol][chainId]
  // Contracts
  const inchPoolContract = utils_1.getInchPoolContract(
    symbol,
    provider,
    chainId
  )
  let expectedQty
  // Get equivalent `ETH` quantity from the input `1INCH` amount
  if (tradeType === abis_1.BUY && tokenIn !== abis_1.ETH) {
    inputAmount = await helper_1.getExpectedRateInch(
      inchLiquidityProtocolContract,
      inchAddress,
      constants_1.AddressZero,
      inputAmount
    )
  }
  expectedQty = await inchPoolContract.getReturn(
    tradeType === abis_1.BUY ? constants_1.AddressZero : xinchAddress,
    tradeType === abis_1.BUY ? xinchAddress : constants_1.AddressZero,
    inputAmount
  )
  // Get final `1INCH` quantity from the estimated `ETH` quantity
  if (tradeType === abis_1.SELL && tokenIn !== abis_1.ETH) {
    expectedQty = await helper_1.getExpectedRateInch(
      inchLiquidityProtocolContract,
      constants_1.AddressZero,
      inchAddress,
      expectedQty
    )
  }
  return formatEther(expectedQty)
}
exports.getInchEstimatedQuantity = getInchEstimatedQuantity
const getInchPortfolioItem = async (symbol, address, provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  // Addresses
  const asset = `${symbol} - ${abis_1.ETH.toUpperCase()}`
  const inchPoolAddress = utils_1.getInchPoolAddress(symbol, chainId)
  // Contracts
  const inchPoolContract = utils_1.getInchPoolContract(
    symbol,
    provider,
    chainId
  )
  let userBalance = bignumber_1.BigNumber.from('0')
  try {
    userBalance = await inchPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  const xinchContract = utils_1.getContract(symbol, provider, network)
  const { priceUsd } = await xinch_1.getXInchPrices(xinchContract)
  const inchPoolBalances = await helper_2.getBalances(
    symbol,
    inchPoolAddress,
    priceUsd,
    provider,
    chainId
  )
  const xinchEthPoolSupply = await inchPoolContract.totalSupply()
  const poolPrice = parseEther(inchPoolBalances.eth.val)
    .mul(2)
    .mul(constants_2.DEC_18)
    .div(xinchEthPoolSupply)
  const value = poolPrice.mul(userBalance).div(constants_2.DEC_18)
  return {
    asset,
    balances: inchPoolBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice: priceUsd,
    value: formatEther(value),
  }
}
exports.getInchPortfolioItem = getInchPortfolioItem
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2V4Y2hhbmdlcy9pbmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUNwRCx3REFBc0Q7QUFFdEQsdUNBUXFCO0FBQ3JCLG1DQUErQjtBQUUvQiwrQ0FBd0M7QUFHeEMsb0NBQStFO0FBQy9FLG9DQUF5QztBQUN6Qyw0Q0FBd0U7QUFFeEUscUNBQXNDO0FBRXRDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQTtBQUV6QyxNQUFNLHdCQUF3QixHQUFHLEtBQUssRUFDM0MsT0FBdUQsRUFDdkQsTUFBeUMsRUFDekMsTUFBYyxFQUNkLFNBQXFCLEVBQ3JCLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDcEMsTUFBTSxFQUFFLDZCQUE2QixFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sMEJBQWlCLENBQ3hFLE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQTtJQUNELE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7SUFFM0IsWUFBWTtJQUNaLE1BQU0sV0FBVyxHQUFHLGdCQUFTLENBQUMsV0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUMsTUFBTSxZQUFZLEdBQUcsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUUvQyxZQUFZO0lBQ1osTUFBTSxnQkFBZ0IsR0FBRywyQkFBbUIsQ0FDMUMsTUFBTSxFQUNOLFFBQVEsRUFDUixPQUFPLENBQ2lCLENBQUE7SUFFMUIsSUFBSSxXQUFXLENBQUE7SUFFZiw4REFBOEQ7SUFDOUQsSUFBSSxTQUFTLEtBQUssVUFBRyxJQUFJLE9BQU8sS0FBSyxVQUFHLEVBQUU7UUFDeEMsV0FBVyxHQUFHLE1BQU0sNEJB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
