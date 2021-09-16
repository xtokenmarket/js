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
const approveXInch = async (symbol, amount, provider, spenderAddress) => {
  const { tokenContract, xinchContract } = await helper_1.getXInchContracts(
    symbol,
    provider
  )
  const address = spenderAddress || xinchContract.address
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await tokenContract.estimateGas.approve(address, amount),
    constants_2.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(address, amount, { gasLimit })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hpbmNoL21pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esd0RBQXNEO0FBR3RELHVDQUE4QztBQUM5QyxtQ0FBK0I7QUFFL0IsK0NBSXdCO0FBR3hCLHVDQUEyQztBQUMzQyxvQ0FBc0Q7QUFFdEQscUNBQWlFO0FBRWpFLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQTtBQUV6QyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQy9CLE1BQXFCLEVBQ3JCLE1BQWlCLEVBQ2pCLFFBQXNCLEVBQ3RCLGNBQXVCLEVBQ08sRUFBRTtJQUNoQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sMEJBQWlCLENBQzlELE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQTtJQUVELE1BQU0sT0FBTyxHQUFHLGNBQWMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFBO0lBRXZELHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFDeEQsd0NBQTRCLENBQzdCLENBQUE7SUFFRCxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDN0QsQ0FBQyxDQUFBO0FBcEJZLFFBQUEsWUFBWSxnQkFvQnhCO0FBRU0sTUFBTSw4QkFBOEIsR0FBRyxLQUFLLEVBQ2pELE1BQXFCLEVBQ3JCLFlBQXFCLEVBQ3JCLE1BQWMsRUFDZCxRQUFzQixFQUNMLEVBQUU7SUFDbkIsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RDLE1BQU0sRUFDSiw2QkFBNkIsRUFDN0IsT0FBTyxF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
