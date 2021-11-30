'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXU3LPContracts = void 0
const utils_1 = require('../utils')
const getXU3LPContracts = async (symbol, provider) => {
  const { chainId } = await provider.getNetwork()
  const assets = utils_1.getLPTokenSymbol(symbol, chainId)
  const network = await provider.getNetwork()
  const xu3lpContract = utils_1.getContract(symbol, provider, network)
  const token0Contract = utils_1.getContract(assets[0], provider, network)
  const token1Contract = utils_1.getContract(assets[1], provider, network)
  if (!xu3lpContract || !token0Contract || !token1Contract) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    network,
    token0Contract,
    token1Contract,
    xu3lpContract,
  }
}
exports.getXU3LPContracts = getXU3LPContracts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLG9DQUF3RDtBQUVqRCxNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsTUFBdUIsRUFDdkIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMvQyxNQUFNLE1BQU0sR0FBRyx3QkFBZ0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDaEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsTUFBTSxhQUFhLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBVSxDQUFBO0lBQ3JFLE1BQU0sY0FBYyxHQUFHLG1CQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQWEsQ0FBQTtJQUM1RSxNQUFNLGNBQWMsR0FBRyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFhLENBQUE7SUFFNUUsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUN4RCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtLQUNsRDtJQUVELE9BQU87UUFDTCxPQUFPO1FBQ1AsY0FBYztRQUNkLGNBQWM7UUFDZCxhQUFhO0tBQ2QsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQXRCWSxRQUFBLGlCQUFpQixxQkFzQjdCIn0=
