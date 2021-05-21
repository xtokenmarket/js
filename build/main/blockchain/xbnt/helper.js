'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXBntContracts = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('../utils')
const getXBntContracts = async (symbol, provider) => {
  const network = await provider.getNetwork()
  const xbntContract = utils_1.getContract(symbol, provider, network)
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
  if (!xbntContract || !kyberProxyContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    kyberProxyContract,
    network,
    tokenContract,
    xbntContract,
  }
}
exports.getXBntContracts = getXBntContracts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGJudC9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsdUNBQTBDO0FBSTFDLG9DQUFzRDtBQUUvQyxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFDbkMsTUFBcUIsRUFDckIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBRTNDLE1BQU0sWUFBWSxHQUFHLG1CQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQVMsQ0FBQTtJQUNuRSxNQUFNLGtCQUFrQixHQUFHLG1CQUFXLENBQ3BDLGtCQUFXLEVBQ1gsUUFBUSxFQUNSLE9BQU8sQ0FDTSxDQUFBO0lBQ2YsTUFBTSxhQUFhLEdBQUcsbUJBQVcsQ0FDL0Isc0JBQWMsQ0FBQyxNQUFNLENBQUMsRUFDdEIsUUFBUSxFQUNSLE9BQU8sQ0FDSSxDQUFBO0lBRWIsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsYUFBYSxFQUFFO1FBQzFELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0tBQ2xEO0lBRUQsT0FBTztRQUNMLGtCQUFrQjtRQUNsQixPQUFPO1FBQ1AsYUFBYTtRQUNiLFlBQVk7S0FDYixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBNUJZLFFBQUEsZ0JBQWdCLG9CQTRCNUIifQ==
