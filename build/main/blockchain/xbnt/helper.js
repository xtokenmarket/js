'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXBntContracts = void 0
const utils_1 = require('../utils')
const getXBntContracts = async (symbol, provider) => {
  const network = await provider.getNetwork()
  const xbntContract = utils_1.getContract(symbol, provider, network)
  const tokenContract = utils_1.getContract(
    utils_1.getTokenSymbol(symbol),
    provider,
    network
  )
  if (!xbntContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    network,
    tokenContract,
    xbntContract,
  }
}
exports.getXBntContracts = getXBntContracts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGJudC9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0Esb0NBQXNEO0FBRS9DLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUNuQyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsTUFBTSxZQUFZLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBUyxDQUFBO0lBQ25FLE1BQU0sYUFBYSxHQUFHLG1CQUFXLENBQy9CLHNCQUFjLENBQUMsTUFBTSxDQUFDLEVBQ3RCLFFBQVEsRUFDUixPQUFPLENBQ0ksQ0FBQTtJQUViLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDbkMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7S0FDbEQ7SUFFRCxPQUFPO1FBQ0wsT0FBTztRQUNQLGFBQWE7UUFDYixZQUFZO0tBQ2IsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQXRCWSxRQUFBLGdCQUFnQixvQkFzQjVCIn0=
