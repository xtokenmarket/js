'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.approveErc20 = void 0
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const approveErc20 = async (symbol, amount, spenderAddress, provider) => {
  const network = await provider.getNetwork()
  const tokenContract = await utils_2.getContract(symbol, provider, network)
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await tokenContract.estimateGas.approve(spenderAddress, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(spenderAddress, amount, { gasLimit })
}
exports.approveErc20 = approveErc20
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2VyYzIwL2FwcHJvdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsK0NBQThEO0FBRzlELHVDQUEyQztBQUMzQyxvQ0FBc0M7QUFFL0IsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUMvQixNQUFxQixFQUNyQixNQUFpQixFQUNqQixjQUFzQixFQUN0QixRQUFzQixFQUNRLEVBQUU7SUFDaEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDM0MsTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUFNLG1CQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBVSxDQUFBO0lBRTdFLHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsRUFDL0Qsd0NBQTRCLENBQzdCLENBQUE7SUFFRCxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDcEUsQ0FBQyxDQUFBO0FBaEJZLFFBQUEsWUFBWSxnQkFnQnhCIn0=
