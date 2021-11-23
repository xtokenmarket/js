'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXInchContracts = exports.getExpectedRateInch = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const utils_1 = require('../utils')
const getExpectedRateInch = async (
  inchLiquidityProtocolContract,
  inputAsset,
  outputAsset,
  amount,
  isMinRate = false
) => {
  const expectedRate = await inchLiquidityProtocolContract.getReturn(
    inputAsset,
    outputAsset,
    amount
  )
  return isMinRate ? ethers_1.BigNumber.from('0') : expectedRate
}
exports.getExpectedRateInch = getExpectedRateInch
const getXInchContracts = async (symbol, provider) => {
  const network = await provider.getNetwork()
  const xinchContract = utils_1.getContract(symbol, provider, network)
  const inchLiquidityProtocolContract = utils_1.getContract(
    abis_1.INCH_LIQUIDITY_PROTOCOL,
    provider,
    network
  )
  const tokenContract = utils_1.getContract(
    utils_1.getTokenSymbol(symbol),
    provider,
    network
  )
  if (
    !xinchContract ||
    // !inchLiquidityProtocolContract ||
    !tokenContract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    inchLiquidityProtocolContract,
    network,
    tokenContract,
    xinchContract,
  }
}
exports.getXInchContracts = getXInchContracts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHVDQUFzRDtBQUN0RCxtQ0FBa0M7QUFJbEMsb0NBQXNEO0FBRS9DLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxFQUN0Qyw2QkFBb0QsRUFDcEQsVUFBa0IsRUFDbEIsV0FBbUIsRUFDbkIsTUFBaUIsRUFDakIsU0FBUyxHQUFHLEtBQUssRUFDakIsRUFBRTtJQUNGLE1BQU0sWUFBWSxHQUFHLE1BQU0sNkJBQTZCLENBQUMsU0FBUyxDQUNoRSxVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sQ0FDUCxDQUFBO0lBQ0QsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLGtCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUE7QUFDdkQsQ0FBQyxDQUFBO0FBYlksUUFBQSxtQkFBbUIsdUJBYS9CO0FBRU0sTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLE1BQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxNQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFVLENBQUE7SUFDckUsTUFBTSw2QkFBNkIsR0FBRyxtQkFBVyxDQUMvQyw4QkFBdUIsRUFDdkIsUUFBUSxFQUNSLE9BQU8sQ0FDaUIsQ0FBQTtJQUMxQixNQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUMvQixzQkFBYyxDQUFDLE1BQU0sQ0FBQyxFQUN0QixRQUFRLEVBQ1IsT0FBTyxDQUNJLENBQUE7SUFFYixJQUNFLENBQUMsYUFBYTtRQUNkLG9DQUFvQztRQUNwQyxDQUFDLGFBQWEsRUFDZDtRQUNBLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0tBQ2xEO0lBRUQsT0FBTztRQUNMLDZCQUE2QjtRQUM3QixPQUFPO1FBQ1AsYUFBYTtRQUNiLGFBQWE7S0FDZCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBaENZLFFBQUEsaUJBQWlCLHFCQWdDN0IifQ==
