'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.mintXAlpha = exports.getExpectedQuantityOnMintXAlpha = exports.approveXAlpha = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const uniswapV3_1 = require('../exchanges/uniswapV3')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const approveXAlpha = async (symbol, amount, provider) => {
  const { tokenContract, xalphaContract } = await helper_1.getXAlphaContracts(
    symbol,
    provider
  )
  // estimate gasLimit
  const gasLimit = utils_1.getPercentage(
    await tokenContract.estimateGas.approve(xalphaContract.address, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(xalphaContract.address, amount, { gasLimit })
}
exports.approveXAlpha = approveXAlpha
const getExpectedQuantityOnMintXAlpha = async (
  symbol,
  tradeWithEth,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const { xalphaContract } = await helper_1.getXAlphaContracts(symbol, provider)
  const [alphaHoldings, xalphaSupply, { mintFee }] = await Promise.all([
    xalphaContract.getNav(),
    xalphaContract.totalSupply(),
    xalphaContract.feeDivisors(),
  ])
  const MINT_FEE = utils_2.parseFees(mintFee)
  const ethToTrade = inputAmount.mul(MINT_FEE)
  let alphaExpected
  if (tradeWithEth) {
    const expectedRate = await uniswapV3_1.getUniswapV3EstimatedQty(
      abis_1.ETH,
      abis_1.X_ALPHA_A,
      amount,
      abis_1.BUY,
      bignumber_1.BigNumber.from('10000'), // 1% Uniswap V3 trade fees
      provider
    )
    alphaExpected = ethToTrade
      .mul(parseEther(expectedRate))
      .div(constants_1.DEC_18)
  } else {
    alphaExpected = ethToTrade
  }
  const xalphaExpected = alphaExpected
    .mul(xalphaSupply)
    .div(alphaHoldings)
    .div(constants_1.DEC_18)
  return formatEther(xalphaExpected)
}
exports.getExpectedQuantityOnMintXAlpha = getExpectedQuantityOnMintXAlpha
const mintXAlpha = async (symbol, tradeWithEth, amount, provider) => {
  const { tokenContract, xalphaContract } = await helper_1.getXAlphaContracts(
    symbol,
    provider
  )
  if (tradeWithEth) {
    // estimate gasLimit
    const gasLimit = utils_1.getPercentage(
      await xalphaContract.estimateGas.mint('1', {
        value: amount,
      }),
      constants_1.GAS_LIMIT_PERCENTAGE_ETH
    )
    return xalphaContract.mint('1', {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await utils_2.getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xalphaContract,
      address
    )
    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }
    // estimate gasLimit
    const gasLimit = utils_1.getPercentage(
      await xalphaContract.estimateGas.mintWithToken(amount),
      constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
    )
    return xalphaContract.mintWithToken(amount, { gasLimit })
  }
}
exports.mintXAlpha = mintXAlpha
const _getApprovedAmount = async (tokenContract, xalphaContract, address) => {
  return tokenContract.allowance(address, xalphaContract.address)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hhbHBoYS9taW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUdwRCx1Q0FBa0Q7QUFDbEQsbUNBQStCO0FBRS9CLCtDQUl3QjtBQUd4Qix1Q0FBMkM7QUFDM0Msc0RBQWlFO0FBQ2pFLG9DQUFzRDtBQUV0RCxxQ0FBNkM7QUFFN0MsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsTUFBcUIsRUFDckIsTUFBaUIsRUFDakIsUUFBc0IsRUFDUSxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLEdBQUcsTUFBTSwyQkFBa0IsQ0FDaEUsTUFBTSxFQUNOLFFBQVEsQ0FDVCxDQUFBO0lBRUQsb0JBQW9CO0lBQ3BCLE1BQU0sUUFBUSxHQUFHLHFCQUFhLENBQzVCLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFDdkUsd0NBQTRCLENBQzdCLENBQUE7SUFFRCxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzVFLENBQUMsQ0FBQTtBQWpCWSxRQUFBLGFBQWEsaUJBaUJ6QjtBQUVNLE1BQU0sK0JBQStCLEdBQUcsS0FBSyxFQUNsRCxNQUFxQixFQUNyQixZQUFxQixFQUNyQixNQUFjLEVBQ2QsUUFBc0IsRUFDTCxFQUFFO0lBQ25CLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN0QyxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsTUFBTSwyQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFckUsTUFBTSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNuRSxjQUFjLENBQUMsTUFBTSxFQUFFO1FBQ3ZCLGNBQWMsQ0FBQyxXQUFXLEVBQUU7UUFDNUIsY0FBYyxDQUFDLFdBQVcsRUFBRTtLQUM3QixDQUFDLENBQUE7SUFFRixNQUFNLFFBQVEsR0FBRyxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ25DLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFNUMsSUFBSSxhQUF3QixDQUFBO0lBRTVCLElBQUksWUFBWSxFQUFFO1FBQ2hCLE1BQU0sWUFBWSxHQUFHLE1BQU0sb0NBQXdCLENBQ2pELFVBQUcsRUFDSCxnQkFBUyxFQUNULE1BQU0sRUFDTixVQUFHLEVBQ0gscUJBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsMkJBQTJCO1FBQ3BELFFBQVEsQ0FDVCxDQUFBO1FBQ0QsYUFBYSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtLQUNyRTtTQUFNO1FBQ0wsYUFBYSxHQUFHLFVBQVUsQ0FBQTtLQUMzQjtJQUVELE1BQU0sY0FBYyxHQUFHLGFBQWE7U0FDakMsR0FBRyxDQUFDLFlBQVksQ0FBQztTQUNqQixHQUFHLENBQUMsYUFBYSxDQUFDO1NBQ2xCLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7SUFFZCxPQUFPLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUE7QUF4Q1ksUUFBQSwrQkFBK0IsbUNBd0MzQztBQUVNLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFDN0IsTUFBcUIsRUFDckIsWUFBcUIsRUFDckIsTUFBaUIsRUFDakIsUUFBc0IsRUFDUSxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLEdBQUcsTUFBTSwyQkFBa0IsQ0FDaEUsTUFBTSxFQUNOLFFBQVEsQ0FDVCxDQUFBO0lBRUQsSUFBSSxZQUFZLEVBQUU7UUFDaEIsb0JBQW9CO1FBQ3BCLE1BQU0sUUFBUSxHQUFHLHFCQUFhLENBQzVCLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3pDLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQyxFQUNGLG9DQUF3QixDQUN6QixDQUFBO1FBRUQsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM5QixRQUFRO1lBQ1IsS0FBSyxFQUFFLE1BQU07U0FDZCxDQUFDLENBQUE7S0FDSDtTQUFNO1FBQ0wsTUFBTSxPQUFPLEdBQUcsTUFBTSx3QkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNoRCxNQUFNLGNBQWMsR0FBRyxNQUFNLGtCQUFrQixDQUM3QyxhQUFhLEVBQ2IsY0FBYyxFQUNkLE9BQU8sQ0FDUixDQUFBO1FBRUQsSUFBSSxjQUFjLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzdCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDbkIsSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FDdEQsQ0FBQTtTQUNGO1FBRUQsb0JBQW9CO1FBQ3BCLE1BQU0sUUFBUSxHQUFHLHFCQUFhLENBQzVCLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQ3RELHdDQUE0QixDQUM3QixDQUFBO1FBRUQsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7S0FDMUQ7QUFDSCxDQUFDLENBQUE7QUE5Q1ksUUFBQSxVQUFVLGNBOEN0QjtBQUVELE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxFQUM5QixhQUF1QixFQUN2QixjQUFzQixFQUN0QixPQUFlLEVBQ2YsRUFBRTtJQUNGLE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ2pFLENBQUMsQ0FBQSJ9
