'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXU3LPContracts = void 0
const utils_1 = require('../utils')
const getXU3LPContracts = async (symbol, provider) => {
  const assets = utils_1.getLPTokenSymbol(symbol, provider)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLG9DQUF3RDtBQUVqRCxNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsTUFBdUIsRUFDdkIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFHLHdCQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNqRCxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxNQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFVLENBQUE7SUFDckUsTUFBTSxjQUFjLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBYSxDQUFBO0lBQzVFLE1BQU0sY0FBYyxHQUFHLG1CQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQWEsQ0FBQTtJQUU1RSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsY0FBYyxFQUFFO1FBQ3hELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0tBQ2xEO0lBRUQsT0FBTztRQUNMLE9BQU87UUFDUCxjQUFjO1FBQ2QsY0FBYztRQUNkLGFBQWE7S0FDZCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBckJZLFFBQUEsaUJBQWlCLHFCQXFCN0IifQ==
