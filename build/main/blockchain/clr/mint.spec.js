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
const mint_1 = require('./mint')
ava_1.default(
  `Calculate ${abis_1.AAVE_X_AAVE_A_CLR} expected quantity on mint with AAVE`,
  async (t) => {
    const { expectedQty } = await mint_1.getExpectedQuantityOnMintXAssetCLR(
      abis_1.AAVE_X_AAVE_A_CLR,
      0,
      '10',
      constants_spec_1.provider
    )
    console.log(
      `Expected ${abis_1.AAVE_X_AAVE_A_CLR} qty for 10 AAVE:`,
      expectedQty
    )
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  `Calculate ${abis_1.AAVE_X_AAVE_A_CLR} expected quantity on mint with xAAVEa`,
  async (t) => {
    const { expectedQty } = await mint_1.getExpectedQuantityOnMintXAssetCLR(
      abis_1.AAVE_X_AAVE_A_CLR,
      1,
      '1000',
      constants_spec_1.provider
    )
    console.log(
      `Expected ${abis_1.AAVE_X_AAVE_A_CLR} qty for 1000 xAAVEa:`,
      expectedQty
    )
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(`Get ${abis_1.AAVE_X_AAVE_A_CLR} pool ratio`, async (t) => {
  const poolRatio = await mint_1.getPoolRatioXAssetCLR(
    abis_1.AAVE_X_AAVE_A_CLR,
    constants_spec_1.provider
  )
  console.log(`Pool ratio of ${abis_1.AAVE_X_AAVE_A_CLR}:`, poolRatio)
  t.true(Number(poolRatio) > 0)
})
ava_1.default(
  `Calculate ${abis_1.XTK_ETH_CLR} expected quantity on mint with XTK`,
  async (t) => {
    const { expectedQty } = await mint_1.getExpectedQuantityOnMintXAssetCLR(
      abis_1.XTK_ETH_CLR,
      0,
      '100',
      constants_spec_1.provider
    )
    console.log(`Expected ${abis_1.XTK_ETH_CLR} qty for 100 XTK:`, expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  `Calculate ${abis_1.XTK_ETH_CLR} expected quantity on mint with ETH`,
  async (t) => {
    const { expectedQty } = await mint_1.getExpectedQuantityOnMintXAssetCLR(
      abis_1.XTK_ETH_CLR,
      1,
      '1',
      constants_spec_1.provider
    )
    console.log(`Expected ${abis_1.XTK_ETH_CLR} qty for 1 ETH:`, expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(`Get ${abis_1.XTK_ETH_CLR} pool ratio`, async (t) => {
  const poolRatio = await mint_1.getPoolRatioXAssetCLR(
    abis_1.XTK_ETH_CLR,
    constants_spec_1.provider
  )
  console.log(`Pool ratio of ${abis_1.XTK_ETH_CLR}:`, poolRatio)
  t.true(Number(poolRatio) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vY2xyL21pbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUE2RDtBQUM3RCw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLGlDQUdlO0FBRWYsYUFBSSxDQUFDLGFBQWEsd0JBQWlCLHNDQUFzQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSx5Q0FBa0MsQ0FDOUQsd0JBQWlCLEVBQ2pCLENBQUMsRUFDRCxJQUFJLEVBQ0oseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLHdCQUFpQixtQkFBbUIsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMxRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxhQUFhLHdCQUFpQix3Q0FBd0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdkYsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0seUNBQWtDLENBQzlELHdCQUFpQixFQUNqQixDQUFDLEVBQ0QsTUFBTSxFQUNOLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSx3QkFBaUIsdUJBQXVCLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDOUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsT0FBTyx3QkFBaUIsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN0RCxNQUFNLFNBQVMsR0FBRyxNQUFNLDRCQUFxQixDQUFDLHdCQUFpQixFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQix3QkFBaUIsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLGFBQWEsa0JBQVcscUNBQXFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzlFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLHlDQUFrQyxDQUM5RCxrQkFBVyxFQUNYLENBQUMsRUFDRCxLQUFLLEVBQ0wseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLGtCQUFXLG1CQUFtQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLGFBQWEsa0JBQVcscUNBQXFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzlFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLHlDQUFrQyxDQUM5RCxrQkFBVyxFQUNYLENBQUMsRUFDRCxHQUFHLEVBQ0gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLGtCQUFXLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ2xFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLE9BQU8sa0JBQVcsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNoRCxNQUFNLFNBQVMsR0FBRyxNQUFNLDRCQUFxQixDQUFDLGtCQUFXLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLGtCQUFXLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUN2RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUMsQ0FBQSJ9
