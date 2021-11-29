'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getExpectedQuantityOnBurnXAlpha = exports.burnXAlpha = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const uniswapV3_1 = require('../exchanges/uniswapV3')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const burnXAlpha = async (symbol, sellForEth, amount, provider) => {
  const { xalphaContract } = await helper_1.getXAlphaContracts(symbol, provider)
  // estimate gasLimit
  const gasLimit = utils_1.getPercentage(
    await xalphaContract.estimateGas.burn(amount, sellForEth, '1'),
    sellForEth
      ? constants_1.GAS_LIMIT_PERCENTAGE_ETH
      : constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return xalphaContract.burn(amount, sellForEth, '0', {
    gasLimit,
  })
}
exports.burnXAlpha = burnXAlpha
const getExpectedQuantityOnBurnXAlpha = async (
  symbol,
  sellForEth,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const { xalphaContract } = await helper_1.getXAlphaContracts(symbol, provider)
  const { BURN_FEE, proRataAlpha } = await getProRataAlpha(
    xalphaContract,
    inputAmount
  )
  let expectedQty
  if (!sellForEth) {
    expectedQty = proRataAlpha
  } else {
    expectedQty = parseEther(
      await uniswapV3_1.getUniswapV3EstimatedQty(
        abis_1.ETH,
        abis_1.X_ALPHA_A,
        formatEther(proRataAlpha),
        abis_1.SELL,
        bignumber_1.BigNumber.from('10000'), // 1% Uniswap V3 trade fees
        provider
      )
    )
  }
  return formatEther(expectedQty.mul(BURN_FEE).div(constants_1.DEC_18))
}
exports.getExpectedQuantityOnBurnXAlpha = getExpectedQuantityOnBurnXAlpha
const getProRataAlpha = async (xalphaContract, amount) => {
  const [alphaHoldings, xalphaSupply, { burnFee }] = await Promise.all([
    xalphaContract.getNav(),
    xalphaContract.totalSupply(),
    xalphaContract.feeDivisors(),
  ])
  const BURN_FEE = utils_2.parseFees(burnFee)
  const proRataAlpha = alphaHoldings.mul(amount).div(xalphaSupply)
  return { BURN_FEE, proRataAlpha }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hhbHBoYS9idXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUdwRCx1Q0FBbUQ7QUFDbkQsbUNBQStCO0FBRS9CLCtDQUl3QjtBQUd4Qix1Q0FBMkM7QUFDM0Msc0RBQWlFO0FBQ2pFLG9DQUFvQztBQUVwQyxxQ0FBNkM7QUFFN0MsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFDN0IsTUFBcUIsRUFDckIsVUFBbUIsRUFDbkIsTUFBaUIsRUFDakIsUUFBc0IsRUFDUSxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxNQUFNLDJCQUFrQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUVyRSxvQkFBb0I7SUFDcEIsTUFBTSxRQUFRLEdBQUcscUJBQWEsQ0FDNUIsTUFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUM5RCxVQUFVLENBQUMsQ0FBQyxDQUFDLG9DQUF3QixDQUFDLENBQUMsQ0FBQyx3Q0FBNEIsQ0FDckUsQ0FBQTtJQUVELE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRTtRQUNsRCxRQUFRO0tBQ1QsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBakJZLFFBQUEsVUFBVSxjQWlCdEI7QUFFTSxNQUFNLCtCQUErQixHQUFHLEtBQUssRUFDbEQsTUFBcUIsRUFDckIsVUFBbUIsRUFDbkIsTUFBYyxFQUNkLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEMsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxlQUFlLENBQ3RELGNBQWMsRUFDZCxXQUFXLENBQ1osQ0FBQTtJQUVELElBQUksV0FBc0IsQ0FBQTtJQUUxQixJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsV0FBVyxHQUFHLFlBQVksQ0FBQTtLQUMzQjtTQUFNO1FBQ0wsV0FBVyxHQUFHLFVBQVUsQ0FDdEIsTUFBTSxvQ0FBd0IsQ0FDNUIsVUFBRyxFQUNILGdCQUFTLEVBQ1QsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUN6QixXQUFJLEVBQ0oscUJBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsMkJBQTJCO1FBQ3BELFFBQVEsQ0FDVCxDQUNGLENBQUE7S0FDRjtJQUVELE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQyxDQUFBO0FBQzNELENBQUMsQ0FBQTtBQWhDWSxRQUFBLCtCQUErQixtQ0FnQzNDO0FBRUQsTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUFFLGNBQXNCLEVBQUUsTUFBaUIsRUFBRSxFQUFFO0lBQzFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDbkUsY0FBYyxDQUFDLE1BQU0sRUFBRTtRQUN2QixjQUFjLENBQUMsV0FBVyxFQUFFO1FBQzVCLGNBQWMsQ0FBQyxXQUFXLEVBQUU7S0FDN0IsQ0FBQyxDQUFBO0lBRUYsTUFBTSxRQUFRLEdBQUcsaUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuQyxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUVoRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFBO0FBQ25DLENBQUMsQ0FBQSJ9
