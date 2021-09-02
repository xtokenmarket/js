'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXAaveContracts = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('../utils')
const getXAaveContracts = async (symbol, provider) => {
  const network = await provider.getNetwork()
  const xaaveContract = utils_1.getContract(symbol, provider, network)
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
  if (!xaaveContract || !kyberProxyContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    kyberProxyContract,
    network,
    tokenContract,
    xaaveContract,
  }
}
exports.getXAaveContracts = getXAaveContracts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFhdmUvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHVDQUEwQztBQUkxQyxvQ0FBc0Q7QUFFL0MsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLE1BQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxNQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFVLENBQUE7SUFDckUsTUFBTSxrQkFBa0IsR0FBRyxtQkFBVyxDQUNwQyxrQkFBVyxFQUNYLFFBQVEsRUFDUixPQUFPLENBQ00sQ0FBQTtJQUNmLE1BQU0sYUFBYSxHQUFHLG1CQUFXLENBQy9CLHNCQUFjLENBQUMsTUFBTSxDQUFDLEVBQ3RCLFFBQVEsRUFDUixPQUFPLENBQ0ksQ0FBQTtJQUViLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUMzRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtLQUNsRDtJQUVELE9BQU87UUFDTCxrQkFBa0I7UUFDbEIsT0FBTztRQUNQLGFBQWE7UUFDYixhQUFhO0tBQ2QsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQTVCWSxRQUFBLGlCQUFpQixxQkE0QjdCIn0=
