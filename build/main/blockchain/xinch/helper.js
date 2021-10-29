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
  const kyberProxyContract = utils_1.getContract(
    abis_1.KYBER_PROXY,
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
    !kyberProxyContract ||
    !tokenContract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    inchLiquidityProtocolContract,
    kyberProxyContract,
    network,
    tokenContract,
    xinchContract,
  }
}
exports.getXInchContracts = getXInchContracts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHVDQUFtRTtBQUNuRSxtQ0FBa0M7QUFJbEMsb0NBQXNEO0FBRS9DLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxFQUN0Qyw2QkFBb0QsRUFDcEQsVUFBa0IsRUFDbEIsV0FBbUIsRUFDbkIsTUFBaUIsRUFDakIsU0FBUyxHQUFHLEtBQUssRUFDakIsRUFBRTtJQUNGLE1BQU0sWUFBWSxHQUFHLE1BQU0sNkJBQTZCLENBQUMsU0FBUyxDQUNoRSxVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sQ0FDUCxDQUFBO0lBQ0QsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLGtCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUE7QUFDdkQsQ0FBQyxDQUFBO0FBYlksUUFBQSxtQkFBbUIsdUJBYS9CO0FBRU0sTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLE1BQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxNQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFVLENBQUE7SUFDckUsTUFBTSw2QkFBNkIsR0FBRyxtQkFBVyxDQUMvQyw4QkFBdUIsRUFDdkIsUUFBUSxFQUNSLE9BQU8sQ0FDaUIsQ0FBQTtJQUMxQixNQUFNLGtCQUFrQixHQUFHLG1CQUFXLENBQ3BDLGtCQUFXLEVBQ1gsUUFBUSxFQUNSLE9BQU8sQ0FDTSxDQUFBO0lBQ2YsTUFBTSxhQUFhLEdBQUcsbUJBQVcsQ0FDL0Isc0JBQWMsQ0FBQyxNQUFNLENBQUMsRUFDdEIsUUFBUSxFQUNSLE9BQU8sQ0FDSSxDQUFBO0lBRWIsSUFDRSxDQUFDLGFBQWE7UUFDZCxvQ0FBb0M7UUFDcEMsQ0FBQyxrQkFBa0I7UUFDbkIsQ0FBQyxhQUFhLEVBQ2Q7UUFDQSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtLQUNsRDtJQUVELE9BQU87UUFDTCw2QkFBNkI7UUFDN0Isa0JBQWtCO1FBQ2xCLE9BQU87UUFDUCxhQUFhO1FBQ2IsYUFBYTtLQUNkLENBQUE7QUFDSCxDQUFDLENBQUE7QUF2Q1ksUUFBQSxpQkFBaUIscUJBdUM3QiJ9
