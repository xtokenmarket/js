'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getExpectedQuantityOnBurnXKnc = exports.burnXKnc = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const burnXKnc = async (symbol, sellForEth, amount, provider) => {
  const {
    kyberProxyContract,
    tokenContract,
    xkncContract,
  } = await helper_1.getXKncContracts(symbol, provider)
  const minRate = await utils_2.getExpectedRate(
    kyberProxyContract,
    tokenContract.address,
    abis_1.ADDRESSES[abis_1.ETH],
    amount,
    true
  )
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await xkncContract.estimateGas.burn(amount, !sellForEth, minRate),
    sellForEth
      ? constants_1.GAS_LIMIT_PERCENTAGE_ETH
      : constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  // `xKNC` contract has `redeemForKnc` instead of `sellForEth` bool
  return xkncContract.burn(amount, !sellForEth, minRate, { gasLimit })
}
exports.burnXKnc = burnXKnc
const getExpectedQuantityOnBurnXKnc = async (
  symbol,
  sellForEth,
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
  const [kncFundBal, totalSupply, { burnFee }] = await Promise.all([
    xkncContract.getFundKncBalanceTwei(),
    xkncContract.totalSupply(),
    xkncContract.feeDivisors(),
  ])
  const BURN_FEE = utils_2.parseFees(burnFee)
  const proRataKnc = kncFundBal.mul(inputAmount).div(totalSupply)
  let expectedQty
  if (!sellForEth) {
    expectedQty = proRataKnc
  } else {
    const ethAddress = abis_1.ADDRESSES[abis_1.ETH]
    const kncAddress = abis_1.ADDRESSES[abis_1.KNC][chainId]
    const expectedRate = await utils_2.getExpectedRate(
      kyberProxyContract,
      kncAddress,
      ethAddress,
      proRataKnc
    )
    expectedQty = proRataKnc.mul(expectedRate).div(constants_1.DEC_18)
  }
  return formatEther(expectedQty.mul(BURN_FEE).div(constants_1.DEC_18))
}
exports.getExpectedQuantityOnBurnXKnc = getExpectedQuantityOnBurnXKnc
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hrbmMvYnVybi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSx1Q0FBa0Q7QUFDbEQsbUNBQStCO0FBRS9CLCtDQUl3QjtBQUV4Qix1Q0FBMkM7QUFDM0Msb0NBQXFEO0FBRXJELHFDQUEyQztBQUUzQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUMzQixNQUFxQixFQUNyQixVQUFtQixFQUNuQixNQUFpQixFQUNqQixRQUFzQixFQUNRLEVBQUU7SUFDaEMsTUFBTSxFQUNKLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsWUFBWSxHQUNiLEdBQUcsTUFBTSx5QkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFNUMsTUFBTSxPQUFPLEdBQUcsTUFBTSx1QkFBZSxDQUNuQyxrQkFBa0IsRUFDbEIsYUFBYSxDQUFDLE9BQU8sRUFDckIsZ0JBQVMsQ0FBQyxVQUFHLENBQVcsRUFDeEIsTUFBTSxFQUNOLElBQUksQ0FDTCxDQUFBO0lBRUQsc0JBQXNCO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLHFCQUFhLENBQzVCLE1BQU0sWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUNqRSxVQUFVLENBQUMsQ0FBQyxDQUFDLG9DQUF3QixDQUFDLENBQUMsQ0FBQyx3Q0FBNEIsQ0FDckUsQ0FBQTtJQUVELGtFQUFrRTtJQUNsRSxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDdEUsQ0FBQyxDQUFBO0FBNUJZLFFBQUEsUUFBUSxZQTRCcEI7QUFFTSxNQUFNLDZCQUE2QixHQUFHLEtBQUssRUFDaEQsTUFBcUIsRUFDckIsVUFBbUIsRUFDbkIsTUFBYyxFQUNkLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUMxRSxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUE7SUFDRCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDL0QsWUFBWSxDQUFDLHFCQUFxQixFQUFFO1FBQ3BDLFlBQVksQ0FBQyxXQUFXLEVBQUU7UUFDMUIsWUFBWSxDQUFDLFdBQVcsRUFBRTtLQUMzQixDQUFDLENBQUE7SUFFRixNQUFNLFFBQVEsR0FBRyxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ25DLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQy9ELElBQUksV0FBc0IsQ0FBQTtJQUUxQixJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsV0FBVyxHQUFHLFVBQVUsQ0FBQTtLQUN6QjtTQUFNO1FBQ0wsTUFBTSxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxVQUFHLENBQVcsQ0FBQTtRQUMzQyxNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLFVBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRTFDLE1BQU0sWUFBWSxHQUFHLE1BQU0sdUJBQWUsQ0FDeEMsa0JBQWtCLEVBQ2xCLFVBQVUsRUFDVixVQUFVLEVBQ1YsVUFBVSxDQUNYLENBQUE7UUFFRCxXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO0tBQ3ZEO0lBRUQsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFDLENBQUE7QUFDM0QsQ0FBQyxDQUFBO0FBeENZLFFBQUEsNkJBQTZCLGlDQXdDekMifQ==
