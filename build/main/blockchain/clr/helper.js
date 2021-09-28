'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXAssetCLRContracts = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('../utils')
const getXAssetCLRContracts = async (symbol, provider) => {
  const assets = utils_1.getXAssetCLRTokenSymbol(symbol)
  const network = await provider.getNetwork()
  const xAssetCLRContract = utils_1.getContract(symbol, provider, network)
  const kyberProxyContract = utils_1.getContract(
    abis_1.KYBER_PROXY,
    provider,
    network
  )
  const token0Contract = utils_1.getContract(assets[0], provider, network)
  const token1Contract = utils_1.getContract(assets[1], provider, network)
  const uniswapLibraryContract = utils_1.getContract(
    abis_1.UNISWAP_LIBRARY,
    provider,
    network
  )
  if (
    !xAssetCLRContract ||
    !kyberProxyContract ||
    !token0Contract ||
    !token1Contract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    kyberProxyContract,
    network,
    token0Contract,
    token1Contract,
    uniswapLibraryContract,
    xAssetCLRContract,
  }
}
exports.getXAssetCLRContracts = getXAssetCLRContracts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vY2xyL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1Q0FBMkQ7QUFJM0Qsb0NBQStEO0FBRXhELE1BQU0scUJBQXFCLEdBQUcsS0FBSyxFQUN4QyxNQUFrQixFQUNsQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxNQUFNLEdBQUcsK0JBQXVCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDOUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsTUFBTSxpQkFBaUIsR0FBRyxtQkFBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFjLENBQUE7SUFDN0UsTUFBTSxrQkFBa0IsR0FBRyxtQkFBVyxDQUNwQyxrQkFBVyxFQUNYLFFBQVEsRUFDUixPQUFPLENBQ00sQ0FBQTtJQUNmLE1BQU0sY0FBYyxHQUFHLG1CQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQWEsQ0FBQTtJQUM1RSxNQUFNLGNBQWMsR0FBRyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFhLENBQUE7SUFDNUUsTUFBTSxzQkFBc0IsR0FBRyxtQkFBVyxDQUN4QyxzQkFBZSxFQUNmLFFBQVEsRUFDUixPQUFPLENBQ1UsQ0FBQTtJQUVuQixJQUNFLENBQUMsaUJBQWlCO1FBQ2xCLENBQUMsa0JBQWtCO1FBQ25CLENBQUMsY0FBYztRQUNmLENBQUMsY0FBYyxFQUNmO1FBQ0EsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7S0FDbEQ7SUFFRCxPQUFPO1FBQ0wsa0JBQWtCO1FBQ2xCLE9BQU87UUFDUCxjQUFjO1FBQ2QsY0FBYztRQUNkLHNCQUFzQjtRQUN0QixpQkFBaUI7S0FDbEIsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQXRDWSxRQUFBLHFCQUFxQix5QkFzQ2pDIn0=
