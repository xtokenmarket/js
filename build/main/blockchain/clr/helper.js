'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXAssetCLRContracts = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('../utils')
const getXAssetCLRContracts = async (symbol, provider) => {
  const assets = utils_1.getXAssetCLRTokenSymbol(symbol)
  const network = await provider.getNetwork()
  const xAssetCLRContract = utils_1.getContract(symbol, provider, network)
  const token0Contract = utils_1.getContract(assets[0], provider, network)
  const token1Contract = utils_1.getContract(assets[1], provider, network)
  const uniswapLibraryContract = utils_1.getContract(
    abis_1.UNISWAP_LIBRARY,
    provider,
    network
  )
  if (!xAssetCLRContract || !token0Contract || !token1Contract) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    network,
    token0Contract,
    token1Contract,
    uniswapLibraryContract,
    xAssetCLRContract,
  }
}
exports.getXAssetCLRContracts = getXAssetCLRContracts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vY2xyL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1Q0FBOEM7QUFJOUMsb0NBQStEO0FBRXhELE1BQU0scUJBQXFCLEdBQUcsS0FBSyxFQUN4QyxNQUFrQixFQUNsQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxNQUFNLEdBQUcsK0JBQXVCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDOUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsTUFBTSxpQkFBaUIsR0FBRyxtQkFBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFjLENBQUE7SUFDN0UsTUFBTSxjQUFjLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBYSxDQUFBO0lBQzVFLE1BQU0sY0FBYyxHQUFHLG1CQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQWEsQ0FBQTtJQUM1RSxNQUFNLHNCQUFzQixHQUFHLG1CQUFXLENBQ3hDLHNCQUFlLEVBQ2YsUUFBUSxFQUNSLE9BQU8sQ0FDVSxDQUFBO0lBRW5CLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUM1RCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtLQUNsRDtJQUVELE9BQU87UUFDTCxPQUFPO1FBQ1AsY0FBYztRQUNkLGNBQWM7UUFDZCxzQkFBc0I7UUFDdEIsaUJBQWlCO0tBQ2xCLENBQUE7QUFDSCxDQUFDLENBQUE7QUEzQlksUUFBQSxxQkFBcUIseUJBMkJqQyJ9
