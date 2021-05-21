'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const abis_1 = require('@xtoken/abis')
const ava_1 = __importDefault(require('ava'))
const utils_1 = require('ethers/lib/utils')
const constants_spec_1 = require('../../constants.spec')
const bancor_1 = require('./bancor')
ava_1.default('Get Bancor Network address', async (t) => {
  const bancorNetworkAddress = await bancor_1.getBancorNetworkAddress(
    constants_spec_1.provider
  )
  console.log('[Bancor] Bancor Network address:', bancorNetworkAddress)
  t.true(utils_1.isAddress(bancorNetworkAddress))
})
ava_1.default('Get BNT ETH price', async (t) => {
  const minReturn = await bancor_1.getBntEthPrice(constants_spec_1.provider)
  console.log('[Bancor] minReturn:', minReturn)
  t.true(Number(minReturn) > 0)
})
ava_1.default(
  'Calculate expected quantity on burn of xBNTa with ETH on Bancor',
  async (t) => {
    const expectedQty = await bancor_1.getBancorEstimatedQuantity(
      abis_1.ETH,
      abis_1.X_BNT_A,
      '1000',
      abis_1.SELL,
      constants_spec_1.provider
    )
    console.log('[Bancor] Expected ETH qty for 1000 xBNTa:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity on burn of xBNTa with BNT on Bancor',
  async (t) => {
    const expectedQty = await bancor_1.getBancorEstimatedQuantity(
      abis_1.X_BNT_A,
      abis_1.X_BNT_A,
      '1000',
      abis_1.SELL,
      constants_spec_1.provider
    )
    console.log('[Bancor] Expected BNT qty for 1000 xBNTa:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity on mint of xBNTa on Bancor',
  async (t) => {
    const expectedQty = await bancor_1.getBancorEstimatedQuantity(
      abis_1.ETH,
      abis_1.X_BNT_A,
      '1',
      abis_1.BUY,
      constants_spec_1.provider
    )
    console.log('[Bancor] Expected xBNTa qty for 1 ETH:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity on mint of xBNTa with BNT on Bancor',
  async (t) => {
    const expectedQty = await bancor_1.getBancorEstimatedQuantity(
      abis_1.X_BNT_A,
      abis_1.X_BNT_A,
      '100',
      abis_1.BUY,
      constants_spec_1.provider
    )
    console.log('[Bancor] Expected xBNTa qty for 100 BNT:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default('Get Bancor Portfolio of xBNTa', async (t) => {
  const portfolio = await bancor_1.getBancorPortfolioItem(
    abis_1.X_BNT_A,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log(
    '[Bancor] Portfolio value of xBNTa:',
    portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
  )
  t.true(
    Number(
      portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
    ) > 0
  )
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuY29yLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9leGNoYW5nZXMvYmFuY29yLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBc0Q7QUFDdEQsOENBQXNCO0FBQ3RCLDRDQUE0QztBQUU1Qyx5REFBNEQ7QUFFNUQscUNBS2lCO0FBRWpCLGFBQUksQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDN0MsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLGdDQUF1QixDQUFDLHlCQUFRLENBQUMsQ0FBQTtJQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFDckUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsTUFBTSxTQUFTLEdBQUcsTUFBTSx1QkFBYyxDQUFDLHlCQUFRLENBQUMsQ0FBQTtJQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLGlFQUFpRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNsRixNQUFNLFdBQVcsR0FBRyxNQUFNLG1DQUEwQixDQUNsRCxVQUFHLEVBQ0gsY0FBTyxFQUNQLE1BQU0sRUFDTixXQUFJLEVBQ0oseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxpRUFBaUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbEYsTUFBTSxXQUFXLEdBQUcsTUFBTSxtQ0FBMEIsQ0FDbEQsY0FBTyxFQUNQLGNBQU8sRUFDUCxNQUFNLEVBQ04sV0FBSSxFQUNKLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDckUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsd0RBQXdELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3pFLE1BQU0sV0FBVyxHQUFHLE1BQU0sbUNBQTBCLENBQ2xELFVBQUcsRUFDSCxjQUFPLEVBQ1AsR0FBRyxFQUNILFVBQUcsRUFDSCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ2xFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLGlFQUFpRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNsRixNQUFNLFdBQVcsR0FBRyxNQUFNLG1DQUEwQixDQUNsRCxjQUFPLEVBQ1AsY0FBTyxFQUNQLEtBQUssRUFDTCxVQUFHLEVBQ0gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNwRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQywrQkFBK0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDaEQsTUFBTSxTQUFTLEdBQUcsTUFBTSwrQkFBc0IsQ0FBQyxjQUFPLEVBQUUsNEJBQVcsRUFBRSx5QkFBUSxDQUFDLENBQUE7SUFDOUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsS0FBSyxDQUFDLENBQUE7SUFDbkUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQyxDQUFBIn0=
