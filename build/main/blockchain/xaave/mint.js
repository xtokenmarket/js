'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.mintXAave = exports.getExpectedQuantityOnMintXAave = exports.approveXAave = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const approveXAave = async (symbol, amount, provider) => {
  const { tokenContract, xaaveContract } = await helper_1.getXAaveContracts(
    symbol,
    provider
  )
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await tokenContract.estimateGas.approve(xaaveContract.address, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(xaaveContract.address, amount, { gasLimit })
}
exports.approveXAave = approveXAave
const getExpectedQuantityOnMintXAave = async (
  symbol,
  tradeWithEth,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await helper_1.getXAaveContracts(symbol, provider)
  const { chainId } = network
  const [aaveHoldings, xaaveSupply, { mintFee }] = await Promise.all([
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
    xaaveContract.feeDivisors(),
  ])
  const MINT_FEE = utils_2.parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)
  const ethAddress = abis_1.ADDRESSES[abis_1.ETH]
  const aaveAddress = abis_1.ADDRESSES[abis_1.AAVE][chainId]
  let aaveExpected
  if (tradeWithEth) {
    const expectedRate = await utils_2.getExpectedRate(
      kyberProxyContract,
      ethAddress,
      aaveAddress,
      inputAmount
    )
    aaveExpected = ethToTrade.mul(expectedRate).div(constants_1.DEC_18)
  } else {
    aaveExpected = ethToTrade
  }
  const xaaveExpected = aaveExpected
    .mul(xaaveSupply)
    .div(aaveHoldings)
    .div(constants_1.DEC_18)
  return formatEther(xaaveExpected)
}
exports.getExpectedQuantityOnMintXAave = getExpectedQuantityOnMintXAave
const mintXAave = async (symbol, tradeWithEth, amount, affiliate, provider) => {
  const {
    kyberProxyContract,
    tokenContract,
    xaaveContract,
  } = await helper_1.getXAaveContracts(symbol, provider)
  if (tradeWithEth) {
    const minRate = await utils_2.getExpectedRate(
      kyberProxyContract,
      abis_1.ADDRESSES[abis_1.ETH],
      tokenContract.address,
      amount,
      true
    )
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(
      await xaaveContract.estimateGas.mint(minRate.toString(), {
        value: amount,
      }),
      constants_1.GAS_LIMIT_PERCENTAGE_ETH
    )
    return xaaveContract.mint(minRate.toString(), {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await utils_2.getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xaaveContract,
      address
    )
    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await xaaveContract.estimateGas.mintWithToken(amount, affiliate),
      constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
    )
    return xaaveContract.mintWithToken(amount, affiliate, {
      gasLimit,
    })
  }
}
exports.mintXAave = mintXAave
const _getApprovedAmount = async (tokenContract, xaaveContract, address) => {
  return tokenContract.allowance(address, xaaveContract.address)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hhYXZlL21pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsdUNBQW1EO0FBQ25ELG1DQUErQjtBQUUvQiwrQ0FJd0I7QUFHeEIsdUNBQTJDO0FBQzNDLG9DQUF1RTtBQUV2RSxxQ0FBNEM7QUFFNUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFDL0IsTUFBcUIsRUFDckIsTUFBaUIsRUFDakIsUUFBc0IsRUFDUSxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSwwQkFBaUIsQ0FDOUQsTUFBTSxFQUNOLFFBQVEsQ0FDVCxDQUFBO0lBRUQsc0JBQXNCO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLHFCQUFhLENBQzVCLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFDdEUsd0NBQTRCLENBQzdCLENBQUE7SUFFRCxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzNFLENBQUMsQ0FBQTtBQWpCWSxRQUFBLFlBQVksZ0JBaUJ4QjtBQUVNLE1BQU0sOEJBQThCLEdBQUcsS0FBSyxFQUNqRCxNQUFxQixFQUNyQixZQUFxQixFQUNyQixNQUFjLEVBQ2QsUUFBc0IsRUFDTCxFQUFFO0lBQ25CLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN0QyxNQUFNLEVBQ0osa0JBQWtCLEVBQ2xCLE9BQU8sRUFDUCxhQUFhLEdBQ2QsR0FBRyxNQUFNLDBCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMs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
