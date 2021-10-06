'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXAlphaContracts = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('../utils')
const getXAlphaContracts = async (symbol, provider) => {
  const network = await provider.getNetwork()
  const xalphaContract = utils_1.getContract(symbol, provider, network)
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
  if (!xalphaContract) {
    console.log('no xalphaContract')
  }
  if (!kyberProxyContract) {
    console.log('no kyberProxyContract')
  }
  if (!tokenContract) {
    console.log('no tokenContract')
  }
  if (!xalphaContract || !kyberProxyContract || !tokenContract) {
    // console.log('hello world')
    return Promise.reject(new Error('Contract missing'))
  }
  return {
    kyberProxyContract,
    network,
    tokenContract,
    xalphaContract,
  }
}
exports.getXAlphaContracts = getXAlphaContracts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1Q0FBMEM7QUFJMUMsb0NBQXNEO0FBRS9DLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxFQUNyQyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsTUFBTSxjQUFjLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBVyxDQUFBO0lBQ3ZFLE1BQU0sa0JBQWtCLEdBQUcsbUJBQVcsQ0FDcEMsa0JBQVcsRUFDWCxRQUFRLEVBQ1IsT0FBTyxDQUNNLENBQUE7SUFFZixNQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUMvQixzQkFBYyxDQUFDLE1BQU0sQ0FBQyxFQUN0QixRQUFRLEVBQ1IsT0FBTyxDQUNJLENBQUE7SUFFYixJQUFJLENBQUMsY0FBYyxFQUFFO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtLQUNqQztJQUVELElBQUksQ0FBQyxrQkFBa0IsRUFBRTtRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7S0FDckM7SUFFRCxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtLQUNoQztJQUVELElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUM1RCw2QkFBNkI7UUFDN0IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQTtLQUNyRDtJQUVELE9BQU87UUFDTCxrQkFBa0I7UUFDbEIsT0FBTztRQUNQLGFBQWE7UUFDYixjQUFjO0tBQ2YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQTFDWSxRQUFBLGtCQUFrQixzQkEwQzlCIn0=
