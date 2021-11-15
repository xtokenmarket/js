'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXU3LPContracts = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('../utils')
const getXU3LPContracts = async (symbol, provider) => {
  const assets = utils_1.getLPTokenSymbol(symbol)
  const network = await provider.getNetwork()
  const xu3lpContract = utils_1.getContract(symbol, provider, network)
  const kyberProxyContract = utils_1.getContract(
    abis_1.KYBER_PROXY,
    provider,
    network
  )
  const token0Contract = utils_1.getContract(assets[0], provider, network)
  const token1Contract = utils_1.getContract(assets[1], provider, network)
  if (
    !xu3lpContract ||
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
    xu3lpContract,
  }
}
exports.getXU3LPContracts = getXU3LPContracts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHVDQUEwQztBQUkxQyxvQ0FBd0Q7QUFFakQsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLE1BQXVCLEVBQ3ZCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLE1BQU0sR0FBRyx3QkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QyxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxNQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFVLENBQUE7SUFDckUsTUFBTSxrQkFBa0IsR0FBRyxtQkFBVyxDQUNwQyxrQkFBVyxFQUNYLFFBQVEsRUFDUixPQUFPLENBQ00sQ0FBQTtJQUNmLE1BQU0sY0FBYyxHQUFHLG1CQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQWEsQ0FBQTtJQUM1RSxNQUFNLGNBQWMsR0FBRyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFhLENBQUE7SUFFNUUsSUFDRSxDQUFDLGFBQWE7UUFDZCxDQUFDLGtCQUFrQjtRQUNuQixDQUFDLGNBQWM7UUFDZixDQUFDLGNBQWMsRUFDZjtRQUNBLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0tBQ2xEO0lBRUQsT0FBTztRQUNMLGtCQUFrQjtRQUNsQixPQUFPO1FBQ1AsY0FBYztRQUNkLGNBQWM7UUFDZCxhQUFhO0tBQ2QsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQWhDWSxRQUFBLGlCQUFpQixxQkFnQzdCIn0=
