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
const approveXAave = async (symbol, amount, provider, spenderAddress) => {
  const { tokenContract, xaaveContract } = await helper_1.getXAaveContracts(
    symbol,
    provider
  )
  const address = spenderAddress || xaaveContract.address
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await tokenContract.estimateGas.approve(address, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(address, amount, { gasLimit })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hhYXZlL21pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsdUNBQW1EO0FBQ25ELG1DQUErQjtBQUUvQiwrQ0FJd0I7QUFHeEIsdUNBQTJDO0FBQzNDLG9DQUF1RTtBQUV2RSxxQ0FBNEM7QUFFNUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFDL0IsTUFBcUIsRUFDckIsTUFBaUIsRUFDakIsUUFBc0IsRUFDdEIsY0FBdUIsRUFDTyxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSwwQkFBaUIsQ0FDOUQsTUFBTSxFQUNOLFFBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUcsY0FBYyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUE7SUFFdkQsc0JBQXNCO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLHFCQUFhLENBQzVCLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUN4RCx3Q0FBNEIsQ0FDN0IsQ0FBQTtJQUVELE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUM3RCxDQUFDLENBQUE7QUFwQlksUUFBQSxZQUFZLGdCQW9CeEI7QUFFTSxNQUFNLDhCQUE4QixHQUFHLEtBQUssRUFDakQsTUFBcUIsRUFDckIsWUFBcUIsRUFDckIsTUFBYyxFQUNkLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEMsTUFBTSxFQUNKLGtCQUFrQixFQUNsQixPQUFPLEVBQ1AsYUFBYSxHQUNk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
