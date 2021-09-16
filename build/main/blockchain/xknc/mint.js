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
const approveXKnc = async (symbol, amount, provider, spenderAddress) => {
  const { tokenContract, xkncContract } = await helper_1.getXKncContracts(
    symbol,
    provider
  )
  const address = spenderAddress || xkncContract.address
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await tokenContract.estimateGas.approve(address, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(address, amount, { gasLimit })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hrbmMvbWludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSx1Q0FBa0Q7QUFDbEQsbUNBQStCO0FBRS9CLCtDQUl3QjtBQUd4Qix1Q0FBMkM7QUFDM0Msb0NBQXVFO0FBRXZFLHFDQUEyQztBQUUzQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixNQUFxQixFQUNyQixNQUFpQixFQUNqQixRQUFzQixFQUN0QixjQUF1QixFQUNPLEVBQUU7SUFDaEMsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUM1RCxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxjQUFjLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQTtJQUV0RCxzQkFBc0I7SUFDdEIsTUFBTSxRQUFRLEdBQUcscUJBQWEsQ0FDNUIsTUFBTSxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQ3hELHdDQUE0QixDQUM3QixDQUFBO0lBRUQsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzdELENBQUMsQ0FBQTtBQXBCWSxRQUFBLFdBQVcsZUFvQnZCO0FBRU0sTUFBTSw2QkFBNkIsR0FBRyxLQUFLLEVBQ2hELE1BQXFCLEVBQ3JCLFlBQXFCLEVBQ3JCLE1BQWMsRUFDZCxRQUFzQixFQUNMLEVBQUU7SUFDbkIsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLEdB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
