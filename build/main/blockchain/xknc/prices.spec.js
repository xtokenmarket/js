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
ava_1.default('Get xKNCa prices', async (t) => {
  const {
    kncContract,
    kyberProxyContract,
    xkncContract,
  } = await helper_1.getXKncContracts(abis_1.X_KNC_A, constants_spec_1.provider)
  const { aum, priceEth, priceUsd } = await prices_1.getXKncPrices(
    xkncContract,
    kncContract,
    kyberProxyContract
  )
  console.log('xKNCa aum:', aum)
  console.log('xKNCa priceEth:', priceEth)
  console.log('xKNCa priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
ava_1.default('Get xKNCb prices', async (t) => {
  const {
    kncContract,
    kyberProxyContract,
    xkncContract,
  } = await helper_1.getXKncContracts(abis_1.X_KNC_B, constants_spec_1.provider)
  const { aum, priceEth, priceUsd } = await prices_1.getXKncPrices(
    xkncContract,
    kncContract,
    kyberProxyContract
  )
  console.log('xKNCb aum:', aum)
  console.log('xKNCb priceEth:', priceEth)
  console.log('xKNCb priceUsd:', priceUsd)
  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94a25jL3ByaWNlcy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBQStDO0FBQy9DLDhDQUFzQjtBQUd0Qix5REFBK0M7QUFFL0MscUNBQTJDO0FBQzNDLHFDQUF3QztBQUV4QyxhQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ25DLE1BQU0sRUFDSixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLFlBQVksR0FDYixHQUFHLE1BQU0seUJBQWdCLENBQUMsY0FBTyxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUU3QyxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLHNCQUFhLENBQ3JELFlBQVksRUFDWixXQUF1QixFQUN2QixrQkFBa0IsQ0FDbkIsQ0FBQTtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN4QyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuQyxNQUFNLEVBQ0osV0FBVyxFQUNYLGtCQUFrQixFQUNsQixZQUFZLEdBQ2IsR0FBRyxNQUFNLHlCQUFnQixDQUFDLGNBQU8sRUFBRSx5QkFBUSxDQUFDLENBQUE7SUFFN0MsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxzQkFBYSxDQUNyRCxZQUFZLEVBQ1osV0FBdUIsRUFDdkIsa0JBQWtCLENBQ25CLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUMsQ0FBQSJ9
