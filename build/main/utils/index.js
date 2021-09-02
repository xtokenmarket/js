'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getTWAP = exports.getPercentage = exports.formatNumber = void 0
const ethers_1 = require('ethers')
const utils_1 = require('ethers/lib/utils')
const formatNumber = (val, digits = 4) => {
  const n = Number(val)
  return Number.isInteger(n) ? n : parseFloat(n.toFixed(digits))
}
exports.formatNumber = formatNumber
const getPercentage = (amount, percent) => {
  return amount.mul(percent).div(100)
}
exports.getPercentage = getPercentage
/**
 * Return actual twap price from ABDK 64.64 representation
 * Used with xU3LP getAssetPrice()
 */
const getTWAP = (twap) => {
  twap = twap.mul(10000).div(ethers_1.BigNumber.from(2).pow(64))
  return utils_1.parseEther((twap.toNumber() / 10000).toString())
}
exports.getTWAP = getTWAP
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQWtDO0FBQ2xDLDRDQUE2QztBQUV0QyxNQUFNLFlBQVksR0FBRyxDQUFDLEdBQVcsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUU7SUFDdEQsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0FBQ2hFLENBQUMsQ0FBQTtBQUhZLFFBQUEsWUFBWSxnQkFHeEI7QUFFTSxNQUFNLGFBQWEsR0FBRyxDQUFDLE1BQWlCLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDbEUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQUE7QUFGWSxRQUFBLGFBQWEsaUJBRXpCO0FBRUQ7OztHQUdHO0FBQ0ksTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFlLEVBQUUsRUFBRTtJQUN6QyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDckQsT0FBTyxrQkFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDekQsQ0FBQyxDQUFBO0FBSFksUUFBQSxPQUFPLFdBR25CIn0=
