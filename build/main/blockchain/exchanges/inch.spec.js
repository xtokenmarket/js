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
const inch_1 = require('./inch')
ava_1.default(
  'Calculate expected quantity on burn of xINCHa for ETH on 1Inch',
  async (t) => {
    const expectedQty = await inch_1.getInchEstimatedQuantity(
      abis_1.ETH,
      abis_1.X_INCH_A,
      '1000',
      abis_1.SELL,
      constants_spec_1.provider
    )
    console.log('[1Inch] Expected ETH qty for 1000 xINCHa:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity on burn of xINCHa for INCH on 1Inch',
  async (t) => {
    const expectedQty = await inch_1.getInchEstimatedQuantity(
      abis_1.X_INCH_A,
      abis_1.X_INCH_A,
      '1000',
      abis_1.SELL,
      constants_spec_1.provider
    )
    console.log('[1Inch] Expected INCH qty for 1000 xINCHa:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity on mint of xINCHa from ETH on 1Inch',
  async (t) => {
    const expectedQty = await inch_1.getInchEstimatedQuantity(
      abis_1.ETH,
      abis_1.X_INCH_A,
      '1',
      abis_1.BUY,
      constants_spec_1.provider
    )
    console.log('[1Inch] Expected xINCHa qty for 1 ETH:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity on mint of xINCHa from INCH on 1Inch',
  async (t) => {
    const expectedQty = await inch_1.getInchEstimatedQuantity(
      abis_1.X_INCH_A,
      abis_1.X_INCH_A,
      '100',
      abis_1.BUY,
      constants_spec_1.provider
    )
    console.log('[1Inch] Expected xINCHa qty for 100 INCH:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default('Get Inch Portfolio of xINCHa', async (t) => {
  const portfolio = await inch_1.getInchPortfolioItem(
    abis_1.X_INCH_A,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log(
    '[1Inch] Portfolio value of xINCHa:',
    portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
  )
  t.true(
    Number(
      portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
    ) > 0
  )
})
ava_1.default('Get Inch Portfolio of xINCHb', async (t) => {
  const portfolio = await inch_1.getInchPortfolioItem(
    abis_1.X_INCH_B,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log(
    '[1Inch] Portfolio value of xINCHb:',
    portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
  )
  t.true(
    Number(
      portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
    ) > 0
  )
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jaC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL2luY2guc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFpRTtBQUNqRSw4Q0FBc0I7QUFFdEIseURBQTREO0FBRTVELGlDQUF1RTtBQUV2RSxhQUFJLENBQUMsZ0VBQWdFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2pGLE1BQU0sV0FBVyxHQUFHLE1BQU0sK0JBQXdCLENBQ2hELFVBQUcsRUFDSCxlQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQUksRUFDSix5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3JFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLGlFQUFpRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNsRixNQUFNLFdBQVcsR0FBRyxNQUFNLCtCQUF3QixDQUNoRCxlQUFRLEVBQ1IsZUFBUSxFQUNSLE1BQU0sRUFDTixXQUFJLEVBQ0oseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN0RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxpRUFBaUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbEYsTUFBTSxXQUFXLEdBQUcsTUFBTSwrQkFBd0IsQ0FDaEQsVUFBRyxFQUNILGVBQVEsRUFDUixHQUFHLEVBQ0gsVUFBRyxFQUNILHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsa0VBQWtFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ25GLE1BQU0sV0FBVyxHQUFHLE1BQU0sK0JBQXdCLENBQ2hELGVBQVEsRUFDUixlQUFRLEVBQ1IsS0FBSyxFQUNMLFVBQUcsRUFDSCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3JFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLDhCQUE4QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMvQyxNQUFNLFNBQVMsR0FBRyxNQUFNLDJCQUFvQixDQUFDLGVBQVEsRUFBRSw0QkFBVyxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsQ0FBQTtJQUNuRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQy9DLE1BQU0sU0FBUyxHQUFHLE1BQU0sMkJBQW9CLENBQUMsZUFBUSxFQUFFLDRCQUFXLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQUUsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ25FLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUMsQ0FBQSJ9
