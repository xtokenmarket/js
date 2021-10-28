'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const abis_1 = require('@xtoken/abis')
const ava_1 = __importDefault(require('ava'))
const constants_spec_1 = require('../../constants.spec')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
ava_1.default('Get xALPHAa prices', async (t) => {
  const {
    kyberProxyContract,
    xalphaContract,
  } = await helper_1.getXAlphaContracts(
    abis_1.X_ALPHA_A,
    constants_spec_1.provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXAlphaPrices(
    xalphaContract,
    kyberProxyContract
  )
  console.log('xALPHAa aum: ', aum)
  console.log('xALPHAa priceEth: ', priceEth)
  console.log('xALPHAa priceUsd: ', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWxwaGEvcHJpY2VzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBd0M7QUFDeEMsOENBQXNCO0FBRXRCLHlEQUErQztBQUUvQyxxQ0FBNkM7QUFDN0MscUNBQTBDO0FBRTFDLGFBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxHQUFHLE1BQU0sMkJBQWtCLENBQ3JFLGdCQUFTLEVBQ1QseUJBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSx3QkFBZSxDQUN2RCxjQUFjLEVBQ2Qsa0JBQWtCLENBQ25CLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFM0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUMsQ0FBQSJ9
