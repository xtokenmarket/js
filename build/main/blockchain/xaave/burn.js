'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getExpectedQuantityOnBurnXAave = exports.burnXAave = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const burnXAave = async (symbol, sellForEth, amount, provider) => {
  const {
    kyberProxyContract,
    tokenContract,
    xaaveContract,
  } = await helper_1.getXAaveContracts(symbol, provider)
  const { proRataAave } = await getProRataAave(xaaveContract, amount)
  const minRate = await utils_2.getExpectedRate(
    kyberProxyContract,
    tokenContract.address,
    abis_1.ADDRESSES[abis_1.ETH],
    proRataAave,
    true
  )
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await xaaveContract.estimateGas.burn(amount, sellForEth, minRate),
    sellForEth
      ? constants_1.GAS_LIMIT_PERCENTAGE_ETH
      : constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return xaaveContract.burn(amount, sellForEth, minRate, {
    gasLimit,
  })
}
exports.burnXAave = burnXAave
const getExpectedQuantityOnBurnXAave = async (
  symbol,
  sellForEth,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    xaaveContract,
  } = await helper_1.getXAaveContracts(symbol, provider)
  const { chainId } = network
  const { BURN_FEE, proRataAave } = await getProRataAave(
    xaaveContract,
    inputAmount
  )
  let expectedQty
  if (!sellForEth) {
    expectedQty = proRataAave
  } else {
    const ethAddress = abis_1.ADDRESSES[abis_1.ETH]
    const aaveAddress = abis_1.ADDRESSES[abis_1.AAVE][chainId]
    const expectedRate = await utils_2.getExpectedRate(
      kyberProxyContract,
      aaveAddress,
      ethAddress,
      proRataAave
    )
    expectedQty = proRataAave.mul(expectedRate).div(constants_1.DEC_18)
  }
  return formatEther(expectedQty.mul(BURN_FEE).div(constants_1.DEC_18))
}
exports.getExpectedQuantityOnBurnXAave = getExpectedQuantityOnBurnXAave
const getProRataAave = async (xaaveContract, amount) => {
  const [aaveHoldings, xaaveSupply, { burnFee }] = await Promise.all([
    xaaveContract.getFundHoldings(),
    xaaveContract.totalSupply(),
    xaaveContract.feeDivisors(),
  ])
  const BURN_FEE = utils_2.parseFees(burnFee)
  const proRataAave = aaveHoldings.mul(amount).div(xaaveSupply)
  return { BURN_FEE, proRataAave }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hhYXZlL2J1cm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsdUNBQW1EO0FBQ25ELG1DQUErQjtBQUUvQiwrQ0FJd0I7QUFHeEIsdUNBQTJDO0FBQzNDLG9DQUFxRDtBQUVyRCxxQ0FBNEM7QUFFNUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sU0FBUyxHQUFHLEtBQUssRUFDNUIsTUFBcUIsRUFDckIsVUFBbUIsRUFDbkIsTUFBaUIsRUFDakIsUUFBc0IsRUFDUSxFQUFFO0lBQ2hDLE1BQU0sRUFDSixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLGFBQWEsR0FDZCxHQUFHLE1BQU0sMEJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTdDLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLGNBQWMsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFFbkUsTUFBTSxPQUFPLEdBQUcsTUFBTSx1QkFBZSxDQUNuQyxrQkFBa0IsRUFDbEIsYUFBYSxDQUFDLE9BQU8sRUFDckIsZ0JBQVMsQ0FBQyxVQUFHLENBQVcsRUFDeEIsV0FBVyxFQUNYLElBQUksQ0FDTCxDQUFBO0lBRUQsc0JBQXNCO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLHFCQUFhLENBQzVCLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFDakUsVUFBVSxDQUFDLENBQUMsQ0FBQyxvQ0FBd0IsQ0FBQyxDQUFDLENBQUMsd0NBQTRCLENBQ3JFLENBQUE7SUFFRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUU7UUFDckQsUUFBUTtLQUNULENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQS9CWSxRQUFBLFNBQVMsYUErQnJCO0FBRU0sTUFBTSw4QkFBOEIsR0FBRyxLQUFLLEVBQ2pELE1BQXFCLEVBQ3JCLFVBQW1CLEVBQ25CLE1BQWMsRUFDZCxRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RDLE1BQU0sRUFDSixrQkFBa0IsRUFDbEIsT0FBTyxFQUNQLGFBQWEsR0FDZCxHQUFHLE1BQU0sMEJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzdDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7SUFFM0IsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLGNBQWMsQ0FDcEQsYUFBYSxFQUNiLFdBQVcsQ0FDWixDQUFBO0lBQ0QsSUFBSSxXQUFzQixDQUFBO0lBRTFCLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixXQUFXLEdBQUcsV0FBVyxDQUFBO0tBQzFCO1NBQU07UUFDTCxNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLFVBQUcsQ0FBVyxDQUFBO1FBQzNDLE1BQU0sV0FBVyxHQUFHLGdCQUFTLENBQUMsV0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFNUMsTUFBTSxZQUFZLEdBQUcsTUFBTSx1QkFBZSxDQUN4QyxrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLFVBQVUsRUFDVixXQUFXLENBQ1osQ0FBQTtRQUVELFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7S0FDeEQ7SUFFRCxPQUFPLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUMzRCxDQUFDLENBQUE7QUFyQ1ksUUFBQSw4QkFBOEIsa0NBcUMxQztBQUVELE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxhQUFvQixFQUFFLE1BQWlCLEVBQUUsRUFBRTtJQUN2RSxNQUFNLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ2pFLGFBQWEsQ0FBQyxlQUFlLEVBQUU7UUFDL0IsYUFBYSxDQUFDLFdBQVcsRUFBRTtRQUMzQixhQUFhLENBQUMsV0FBVyxFQUFFO0tBQzVCLENBQUMsQ0FBQTtJQUVGLE1BQU0sUUFBUSxHQUFHLGlCQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbkMsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFFN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQTtBQUNsQyxDQUFDLENBQUEifQ==
