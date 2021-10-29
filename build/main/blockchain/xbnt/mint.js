'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.mintXBnt = exports.getExpectedQuantityOnMintXBnt = exports.approveXBnt = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const approveXBnt = async (symbol, amount, provider, spenderAddress) => {
  const { tokenContract, xbntContract } = await helper_1.getXBntContracts(
    symbol,
    provider
  )
  const address = spenderAddress || xbntContract.address
  const contract = spenderAddress ? xbntContract : tokenContract
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await contract.estimateGas.approve(address, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return contract.approve(address, amount, { gasLimit })
}
exports.approveXBnt = approveXBnt
const getExpectedQuantityOnMintXBnt = async (
  symbol,
  tradeWithEth,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xbntContract,
  } = await helper_1.getXBntContracts(symbol, provider)
  const { chainId } = network
  const [bntHoldings, xbntSupply, { mintFee }] = await Promise.all([
    xbntContract.getNav(),
    xbntContract.totalSupply(),
    xbntContract.feeDivisors(),
  ])
  const MINT_FEE = utils_2.parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)
  const ethAddress = abis_1.ADDRESSES[abis_1.ETH]
  const bntAddress = abis_1.ADDRESSES[abis_1.BNT][chainId]
  let bntExpected
  if (tradeWithEth) {
    const expectedRate = await utils_2.getExpectedRate(
      kyberProxyContract,
      ethAddress,
      bntAddress,
      inputAmount
    )
    bntExpected = ethToTrade.mul(expectedRate).div(constants_1.DEC_18)
  } else {
    bntExpected = ethToTrade
  }
  const xbntExpected = bntExpected
    .mul(xbntSupply)
    .div(bntHoldings)
    .div(constants_1.DEC_18)
  return formatEther(xbntExpected)
}
exports.getExpectedQuantityOnMintXBnt = getExpectedQuantityOnMintXBnt
const mintXBnt = async (symbol, tradeWithEth, amount, provider) => {
  const { tokenContract, xbntContract } = await helper_1.getXBntContracts(
    symbol,
    provider
  )
  if (tradeWithEth) {
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(
      await xbntContract.estimateGas.mint('1', {
        value: amount,
      }),
      constants_1.GAS_LIMIT_PERCENTAGE_ETH
    )
    return xbntContract.mint('1', {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await utils_2.getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xbntContract,
      address
    )
    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(
      await xbntContract.estimateGas.mintWithToken(amount),
      constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
    )
    return xbntContract.mintWithToken(amount, { gasLimit })
  }
}
exports.mintXBnt = mintXBnt
const _getApprovedAmount = async (tokenContract, xbntContract, address) => {
  return tokenContract.allowance(address, xbntContract.address)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hibnQvbWludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSx1Q0FBa0Q7QUFDbEQsbUNBQStCO0FBRS9CLCtDQUl3QjtBQUd4Qix1Q0FBMkM7QUFDM0Msb0NBQXVFO0FBRXZFLHFDQUEyQztBQUUzQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixNQUFxQixFQUNyQixNQUFpQixFQUNqQixRQUFzQixFQUN0QixjQUF1QixFQUNPLEVBQUU7SUFDaEMsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUM1RCxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxjQUFjLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQTtJQUN0RCxNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFBO0lBRTlELHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFDbkQsd0NBQTRCLENBQzdCLENBQUE7SUFFRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDeEQsQ0FBQyxDQUFBO0FBckJZLFFBQUEsV0FBVyxlQXFCdkI7QUFFTSxNQUFNLDZCQUE2QixHQUFHLEtBQUssRUFDaEQsTUFBcUIsRUFDckIsWUFBcUIsRUFDckIsTUFBYyxFQUNkLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLFdBQVcsR0FBRyxVQUFV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
