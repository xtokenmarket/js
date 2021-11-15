'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const abis_1 = require('@xtoken/abis')
const ava_1 = __importDefault(require('ava'))
const constants_spec_1 = require('./constants.spec')
const xToken_1 = require('./xToken')
const xToken = new xToken_1.XToken(constants_spec_1.provider)
ava_1.default('Initialize xToken with wrong network', async (t) => {
  const xTokenRopsten = new xToken_1.XToken(constants_spec_1.ropstenProvider)
  try {
    // xAAVEa contract doesn't exist for Ropsten
    await xTokenRopsten.getExpectedQuantityOnBurn(abis_1.X_AAVE_A, true, '1')
  } catch (e) {
    t.is(e.message, 'Unknown error')
  }
})
ava_1.default(
  'Burn throws exceeded maximum redeemable error for huge amount',
  async (t) => {
    try {
      await xToken.burn(abis_1.X_AAVE_A, true, '1000000')
    } catch (e) {
      t.is(e.message, 'Specified amount exceeds maximum redeemable tokens')
    }
  }
)
ava_1.default(
  'Expected quantity on burn throws error for invalid amount',
  async (t) => {
    try {
      await xToken.getExpectedQuantityOnBurn(abis_1.X_AAVE_A, true, '0')
    } catch (e) {
      t.is(e.message, 'Invalid value for amount')
    }
  }
)
ava_1.default(
  'Expected quantity on mint throws error for invalid amount',
  async (t) => {
    try {
      await xToken.getExpectedQuantityOnMint(abis_1.X_AAVE_A, true, '0')
    } catch (e) {
      t.is(e.message, 'Invalid value for amount')
    }
  }
)
ava_1.default('Best return on mint xAAVEa', async (t) => {
  const bestReturn = await xToken.getBestReturn(
    abis_1.X_AAVE_A,
    false,
    '1',
    abis_1.BUY
  )
  console.log(JSON.stringify(bestReturn))
  t.true(Number(bestReturn.best.expectedQuantity) > 0)
})
ava_1.default('Best return on mint xALPHAa', async (t) => {
  const bestReturn = await xToken.getBestReturn(
    abis_1.X_ALPHA_A,
    false,
    '1',
    abis_1.BUY
  )
  console.log(JSON.stringify(bestReturn))
  t.true(Number(bestReturn.best.expectedQuantity) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieFRva2VuLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMveFRva2VuLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBdUQ7QUFDdkQsOENBQXNCO0FBRXRCLHFEQUE0RDtBQUM1RCxxQ0FBaUM7QUFFakMsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMseUJBQVEsQ0FBQyxDQUFBO0FBRW5DLGFBQUksQ0FBQyxzQ0FBc0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdkQsTUFBTSxhQUFhLEdBQUcsSUFBSSxlQUFNLENBQUMsZ0NBQWUsQ0FBQyxDQUFBO0lBRWpELElBQUk7UUFDRiw0Q0FBNEM7UUFDNUMsTUFBTSxhQUFhLENBQUMseUJBQXlCLENBQUMsZUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtLQUNuRTtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFBO0tBQ2pDO0FBQ0gsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsK0RBQStELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2hGLElBQUk7UUFDRixNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtLQUM3QztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLG9EQUFvRCxDQUFDLENBQUE7S0FDdEU7QUFDSCxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQywyREFBMkQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDNUUsSUFBSTtRQUNGLE1BQU0sTUFBTSxDQUFDLHlCQUF5QixDQUFDLGVBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7S0FDNUQ7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQyxDQUFBO0tBQzVDO0FBQ0gsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsMkRBQTJELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzVFLElBQUk7UUFDRixNQUFNLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxlQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0tBQzVEO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsMEJBQTBCLENBQUMsQ0FBQTtLQUM1QztBQUNILENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLDRCQUE0QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM3QyxNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBRyxDQUFDLENBQUE7SUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7SUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RELENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLDZCQUE2QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM5QyxNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFVBQUcsQ0FBQyxDQUFBO0lBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO0lBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0RCxDQUFDLENBQUMsQ0FBQSJ9
