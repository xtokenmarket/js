'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getExpectedQuantityOnBurnXBnt = exports.burnXBnt = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const burnXBnt = async (symbol, sellForEth, amount, provider) => {
  const { xbntContract } = await helper_1.getXBntContracts(symbol, provider)
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await xbntContract.estimateGas.burn(
      amount,
      sellForEth,
      constants_1.BNT_ETH_PATH,
      '1'
    ),
    sellForEth
      ? constants_1.GAS_LIMIT_PERCENTAGE_ETH
      : constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return xbntContract.burn(amount, sellForEth, constants_1.BNT_ETH_PATH, '1', {
    gasLimit,
  })
}
exports.burnXBnt = burnXBnt
const getExpectedQuantityOnBurnXBnt = async (
  symbol,
  sellForEth,
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
  const { BURN_FEE, proRataBnt } = await getProRataBnt(
    xbntContract,
    inputAmount
  )
  let expectedQty
  if (!sellForEth) {
    expectedQty = proRataBnt
  } else {
    const ethAddress = abis_1.ADDRESSES[abis_1.ETH]
    const bntAddress = abis_1.ADDRESSES[abis_1.BNT][chainId]
    const expectedRate = await utils_2.getExpectedRate(
      kyberProxyContract,
      bntAddress,
      ethAddress,
      proRataBnt
    )
    expectedQty = proRataBnt.mul(expectedRate).div(constants_1.DEC_18)
  }
  return formatEther(expectedQty.mul(BURN_FEE).div(constants_1.DEC_18))
}
exports.getExpectedQuantityOnBurnXBnt = getExpectedQuantityOnBurnXBnt
const getProRataBnt = async (xbntContract, amount) => {
  const [bntHoldings, xbntSupply, { burnFee }] = await Promise.all([
    xbntContract.getNav(),
    xbntContract.totalSupply(),
    xbntContract.feeDivisors(),
  ])
  const BURN_FEE = utils_2.parseFees(burnFee)
  const proRataBnt = bntHoldings.mul(amount).div(xbntSupply)
  return { BURN_FEE, proRataBnt }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hibnQvYnVybi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSx1Q0FBa0Q7QUFDbEQsbUNBQStCO0FBRS9CLCtDQUt3QjtBQUd4Qix1Q0FBMkM7QUFDM0Msb0NBQXFEO0FBRXJELHFDQUEyQztBQUUzQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUMzQixNQUFxQixFQUNyQixVQUFtQixFQUNuQixNQUFpQixFQUNqQixRQUFzQixFQUNRLEVBQUU7SUFDaEMsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0seUJBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRWpFLHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsd0JBQVksRUFBRSxHQUFHLENBQUMsRUFDMUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxvQ0FBd0IsQ0FBQyxDQUFDLENBQUMsd0NBQTRCLENBQ3JFLENBQUE7SUFFRCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSx3QkFBWSxFQUFFLEdBQUcsRUFBRTtRQUM5RCxRQUFRO0tBQ1QsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBakJZLFFBQUEsUUFBUSxZQWlCcEI7QUFFTSxNQUFNLDZCQUE2QixHQUFHLEtBQUssRUFDaEQsTUFBcUIsRUFDckIsVUFBbUIsRUFDbkIsTUFBYyxFQUNkLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUMxRSxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUE7SUFDRCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxhQUFhLENBQ2xELFlBQVksRUFDWixXQUFXLENBQ1osQ0FBQTtJQUNELElBQUksV0FBc0IsQ0FBQTtJQUUxQixJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsV0FBVyxHQUFHLFVBQVUsQ0FBQTtLQUN6QjtTQUFNO1FBQ0wsTUFBTSxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxVQUFHLENBQVcsQ0FBQTtRQUMzQyxNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLFVBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRTFDLE1BQU0sWUFBWSxHQUFHLE1BQU0sdUJBQWUsQ0FDeEMsa0JBQWtCLEVBQ2xCLFVBQVUsRUFDVixVQUFVLEVBQ1YsVUFBVSxDQUNYLENBQUE7UUFFRCxXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO0tBQ3ZEO0lBRUQsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFDLENBQUE7QUFDM0QsQ0FBQyxDQUFBO0FBcENZLFFBQUEsNkJBQTZCLGlDQW9DekM7QUFFRCxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQUUsWUFBa0IsRUFBRSxNQUFpQixFQUFFLEVBQUU7SUFDcEUsTUFBTSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUMvRCxZQUFZLENBQUMsTUFBTSxFQUFFO1FBQ3JCLFlBQVksQ0FBQyxXQUFXLEVBQUU7UUFDMUIsWUFBWSxDQUFDLFdBQVcsRUFBRTtLQUMzQixDQUFDLENBQUE7SUFFRixNQUFNLFFBQVEsR0FBRyxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ25DLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBRTFELE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUE7QUFDakMsQ0FBQyxDQUFBIn0=
