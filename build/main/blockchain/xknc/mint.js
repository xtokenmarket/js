'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.mintXKnc = exports.getExpectedQuantityOnMintXKnc = exports.approveXKnc = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const approveXKnc = async (symbol, amount, provider) => {
  const { tokenContract, xkncContract } = await helper_1.getXKncContracts(
    symbol,
    provider
  )
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await tokenContract.estimateGas.approve(xkncContract.address, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(xkncContract.address, amount, { gasLimit })
}
exports.approveXKnc = approveXKnc
const getExpectedQuantityOnMintXKnc = async (
  symbol,
  tradeWithEth,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xkncContract,
  } = await helper_1.getXKncContracts(symbol, provider)
  const { chainId } = network
  const [kncBalBefore, currentSupply, { mintFee }] = await Promise.all([
    xkncContract.getFundKncBalanceTwei(),
    xkncContract.totalSupply(),
    xkncContract.feeDivisors(),
  ])
  const MINT_FEE = utils_2.parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)
  const ethAddress = abis_1.ADDRESSES[abis_1.ETH]
  const kncAddress = abis_1.ADDRESSES[abis_1.KNC][chainId]
  let kncBalanceAfter
  if (tradeWithEth) {
    const expectedRate = await utils_2.getExpectedRate(
      kyberProxyContract,
      ethAddress,
      kncAddress,
      inputAmount
    )
    const kncExpected = ethToTrade.mul(expectedRate)
    kncBalanceAfter = kncExpected.add(kncBalBefore)
  } else {
    kncBalanceAfter = ethToTrade.add(kncBalBefore)
  }
  const mintAmount = kncBalanceAfter
    .sub(kncBalBefore)
    .mul(currentSupply)
    .div(kncBalBefore)
    .div(constants_1.DEC_18)
  return formatEther(
    tradeWithEth ? mintAmount.div(constants_1.DEC_18) : mintAmount
  )
}
exports.getExpectedQuantityOnMintXKnc = getExpectedQuantityOnMintXKnc
const mintXKnc = async (symbol, tradeWithEth, amount, provider) => {
  const {
    kyberProxyContract,
    tokenContract,
    xkncContract,
  } = await helper_1.getXKncContracts(symbol, provider)
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
      await xkncContract.estimateGas.mint(minRate.toString(), {
        value: amount,
      }),
      constants_1.GAS_LIMIT_PERCENTAGE_ETH
    )
    return xkncContract.mint(minRate.toString(), {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await utils_2.getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xkncContract,
      address
    )
    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(
      await xkncContract.estimateGas.mintWithToken(amount),
      constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
    )
    return xkncContract.mintWithToken(amount, { gasLimit })
  }
}
exports.mintXKnc = mintXKnc
const _getApprovedAmount = async (tokenContract, xkncContract, address) => {
  return tokenContract.allowance(address, xkncContract.address)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hrbmMvbWludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSx1Q0FBa0Q7QUFDbEQsbUNBQStCO0FBRS9CLCtDQUl3QjtBQUd4Qix1Q0FBMkM7QUFDM0Msb0NBQXVFO0FBRXZFLHFDQUEyQztBQUUzQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixNQUFxQixFQUNyQixNQUFpQixFQUNqQixRQUFzQixFQUNRLEVBQUU7SUFDaEMsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUM1RCxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUE7SUFFRCxzQkFBc0I7SUFDdEIsTUFBTSxRQUFRLEdBQUcscUJBQWEsQ0FDNUIsTUFBTSxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUNyRSx3Q0FBNEIsQ0FDN0IsQ0FBQTtJQUVELE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDMUUsQ0FBQyxDQUFBO0FBakJZLFFBQUEsV0FBVyxlQWlCdkI7QUFFTSxNQUFNLDZCQUE2QixHQUFHLEtBQUssRUFDaEQsTUFBcUIsRUFDckIsWUFBcUIsRUFDckIsTUFBYyxFQUNkLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUMxRSxNQUFNLEVBQ04sUUFBUSxDQUNULENB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
