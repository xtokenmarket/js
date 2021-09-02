'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.mintXInch = exports.getExpectedQuantityOnMintXInch = exports.approveXInch = void 0
const constants_1 = require('@ethersproject/constants')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_2 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const approveXInch = async (symbol, amount, provider) => {
  const { tokenContract, xinchContract } = await helper_1.getXInchContracts(
    symbol,
    provider
  )
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await tokenContract.estimateGas.approve(xinchContract.address, amount),
    constants_2.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(xinchContract.address, amount, { gasLimit })
}
exports.approveXInch = approveXInch
const getExpectedQuantityOnMintXInch = async (
  symbol,
  tradeWithEth,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const {
    inchLiquidityProtocolContract,
    network,
    xinchContract,
  } = await helper_1.getXInchContracts(symbol, provider)
  const { chainId } = network
  const [inchHoldings, xinchSupply, { mintFee }] = await Promise.all([
    xinchContract.getNav(),
    xinchContract.totalSupply(),
    xinchContract.feeDivisors(),
  ])
  const MINT_FEE = utils_2.parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)
  const inchAddress = abis_1.ADDRESSES[abis_1.INCH][chainId]
  let inchExpected
  if (tradeWithEth) {
    inchExpected = await helper_1.getExpectedRateInch(
      inchLiquidityProtocolContract,
      constants_1.AddressZero,
      inchAddress,
      inputAmount
    )
  } else {
    inchExpected = ethToTrade
  }
  let xinchExpected = inchExpected.mul(xinchSupply).div(inchHoldings)
  if (!tradeWithEth) {
    xinchExpected = xinchExpected.div(constants_2.DEC_18)
  }
  return formatEther(xinchExpected)
}
exports.getExpectedQuantityOnMintXInch = getExpectedQuantityOnMintXInch
const mintXInch = async (symbol, tradeWithEth, amount, provider) => {
  const {
    inchLiquidityProtocolContract,
    tokenContract,
    xinchContract,
  } = await helper_1.getXInchContracts(symbol, provider)
  if (tradeWithEth) {
    const minRate = await helper_1.getExpectedRateInch(
      inchLiquidityProtocolContract,
      constants_1.AddressZero,
      tokenContract.address,
      amount,
      true
    )
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(
      await xinchContract.estimateGas.mint(minRate.toString(), {
        value: amount,
      }),
      constants_2.GAS_LIMIT_PERCENTAGE_ETH
    )
    return xinchContract.mint(minRate.toString(), {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await utils_2.getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xinchContract,
      address
    )
    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(
      await xinchContract.estimateGas.mintWithToken(amount),
      constants_2.GAS_LIMIT_PERCENTAGE_DEFAULT
    )
    return xinchContract.mintWithToken(amount, { gasLimit })
  }
}
exports.mintXInch = mintXInch
const _getApprovedAmount = async (tokenContract, xinchContract, address) => {
  return tokenContract.allowance(address, xinchContract.address)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hpbmNoL21pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esd0RBQXNEO0FBR3RELHVDQUE4QztBQUM5QyxtQ0FBK0I7QUFFL0IsK0NBSXdCO0FBR3hCLHVDQUEyQztBQUMzQyxvQ0FBc0Q7QUFFdEQscUNBQWlFO0FBRWpFLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQTtBQUV6QyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQy9CLE1BQXFCLEVBQ3JCLE1BQWlCLEVBQ2pCLFFBQXNCLEVBQ1EsRUFBRTtJQUNoQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sMEJBQWlCLENBQzlELE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQTtJQUVELHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQ3RFLHdDQUE0QixDQUM3QixDQUFBO0lBRUQsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUMzRSxDQUFDLENBQUE7QUFqQlksUUFBQSxZQUFZLGdCQWlCeEI7QUFFTSxNQUFNLDhCQUE4QixHQUFHLEtBQUssRUFDakQsTUFBcUIsRUFDckIsWUFBcUIsRUFDckIsTUFBYyxFQUNkLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEMsTUFBTSxFQUNKLDZCQUE2QixFQUM3QixPQUFPLEVBQ1AsYUFBYSxHQUNkLEdBQUcsTUFBTSwwQkFBaUIsQ0FBQyxNQUFNLEVB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
