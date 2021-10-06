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
ava_1.default('Get xBNTa prices', async (t) => {
  const { kyberProxyContract, xbntContract } = await helper_1.getXBntContracts(
    abis_1.X_BNT_A,
    constants_spec_1.provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXBntPrices(
    xbntContract,
    kyberProxyContract
  )
  console.log('xBNTa aum:', aum)
  console.log('xBNTa priceEth:', priceEth)
  console.log('xBNTa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94Ym50L3ByaWNlcy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBQXNDO0FBQ3RDLDhDQUFzQjtBQUV0Qix5REFBK0M7QUFFL0MscUNBQTJDO0FBQzNDLHFDQUF3QztBQUV4QyxhQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ25DLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUNqRSxjQUFPLEVBQ1AseUJBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxzQkFBYSxDQUNyRCxZQUFZLEVBQ1osa0JBQWtCLENBQ25CLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUMsQ0FBQSJ9
