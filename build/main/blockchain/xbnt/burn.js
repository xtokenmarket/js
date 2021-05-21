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
    await xbntContract.estimateGas.burn(amount, sellForEth, '1'),
    sellForEth
      ? constants_1.GAS_LIMIT_PERCENTAGE_ETH
      : constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return xbntContract.burn(amount, sellForEth, '1', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hibnQvYnVybi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSx1Q0FBa0Q7QUFDbEQsbUNBQStCO0FBRS9CLCtDQUl3QjtBQUd4Qix1Q0FBMkM7QUFDM0Msb0NBQXFEO0FBRXJELHFDQUEyQztBQUUzQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUMzQixNQUFxQixFQUNyQixVQUFtQixFQUNuQixNQUFpQixFQUNqQixRQUFzQixFQUNRLEVBQUU7SUFDaEMsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0seUJBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRWpFLHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLEVBQzVELFVBQVUsQ0FBQyxDQUFDLENBQUMsb0NBQXdCLENBQUMsQ0FBQyxDQUFDLHdDQUE0QixDQUNyRSxDQUFBO0lBRUQsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFO1FBQ2hELFFBQVE7S0FDVCxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFqQlksUUFBQSxRQUFRLFlBaUJwQjtBQUVNLE1BQU0sNkJBQTZCLEdBQUcsS0FBSyxFQUNoRCxNQUFxQixFQUNyQixVQUFtQixFQUNuQixNQUFjLEVBQ2QsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN0QyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0seUJBQWdCLENBQzFFLE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQTtJQUNELE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7SUFFM0IsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLGFBQWEsQ0FDbEQsWUFBWSxFQUNaLFdBQVcsQ0FDWixDQUFBO0lBQ0QsSUFBSSxXQUFzQixDQUFBO0lBRTFCLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixXQUFXLEdBQUcsVUFBVSxDQUFBO0tBQ3pCO1NBQU07UUFDTCxNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLFVBQUcsQ0FBVyxDQUFBO1FBQzNDLE1BQU0sVUFBVSxHQUFHLGdCQUFTLENBQUMsVUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFMUMsTUFBTSxZQUFZLEdBQUcsTUFBTSx1QkFBZSxDQUN4QyxrQkFBa0IsRUFDbEIsVUFBVSxFQUNWLFVBQVUsRUFDVixVQUFVLENBQ1gsQ0FBQTtRQUVELFdBQVcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7S0FDdkQ7SUFFRCxPQUFPLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUMzRCxDQUFDLENBQUE7QUFwQ1ksUUFBQSw2QkFBNkIsaUNBb0N6QztBQUVELE1BQU0sYUFBYSxHQUFHLEtBQUssRUFBRSxZQUFrQixFQUFFLE1BQWlCLEVBQUUsRUFBRTtJQUNwRSxNQUFNLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQy9ELFlBQVksQ0FBQyxNQUFNLEVBQUU7UUFDckIsWUFBWSxDQUFDLFdBQVcsRUFBRTtRQUMxQixZQUFZLENBQUMsV0FBVyxFQUFFO0tBQzNCLENBQUMsQ0FBQTtJQUVGLE1BQU0sUUFBUSxHQUFHLGlCQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbkMsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7SUFFMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQTtBQUNqQyxDQUFDLENBQUEifQ==
