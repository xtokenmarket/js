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
const balancer_1 = require('./balancer')
ava_1.default(
  'Calculate expected quantity on burn of xAAVEa on Balancer',
  async (t) => {
    const expectedQty = await balancer_1.getBalancerEstimatedQuantity(
      abis_1.X_AAVE_A,
      abis_1.X_AAVE_A,
      '1000',
      abis_1.SELL,
      constants_spec_1.provider
    )
    console.log('[Balancer] Expected AAVE qty for 1000 xAAVEa:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity on mint of xAAVEa on Balancer',
  async (t) => {
    const expectedQty = await balancer_1.getBalancerEstimatedQuantity(
      abis_1.ETH,
      abis_1.X_AAVE_A,
      '1',
      abis_1.BUY,
      constants_spec_1.provider
    )
    console.log('[Balancer] Expected xAAVEa qty for 1 ETH:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity on burn of xAAVEb on Balancer',
  async (t) => {
    const expectedQty = await balancer_1.getBalancerEstimatedQuantity(
      abis_1.X_AAVE_B,
      abis_1.X_AAVE_B,
      '1000',
      abis_1.SELL,
      constants_spec_1.provider
    )
    console.log('[Balancer] Expected AAVE qty for 1000 xAAVEb:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
ava_1.default(
  'Calculate expected quantity on mint of xAAVEb on Balancer',
  async (t) => {
    const expectedQty = await balancer_1.getBalancerEstimatedQuantity(
      abis_1.ETH,
      abis_1.X_AAVE_B,
      '1',
      abis_1.BUY,
      constants_spec_1.provider
    )
    console.log('[Balancer] Expected xAAVEb qty for 1 ETH:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
/*test('Calculate expected quantity on burn of xSNXa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    X_SNX_A,
    X_SNX_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Balancer] Expected SNX qty for 1000 xSNXa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xSNXa on Balancer', async (t) => {
  const expectedQty = await getBalancerEstimatedQuantity(
    ETH,
    X_SNX_A,
    '1',
    BUY,
    provider
  )
  console.log('[Balancer] Expected xSNXa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
ava_1.default('Get Balancer Portfolio of xAAVEa', async (t) => {
  const portfolio = await balancer_1.getBalancerPortfolioItem(
    abis_1.X_AAVE_A,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log(
    '[Balancer] Portfolio value of xAAVEa:',
    portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
  )
  t.true(
    Number(
      portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
    ) > 0
  )
})
ava_1.default('Get Balancer Portfolio of xAAVEb', async (t) => {
  const portfolio = await balancer_1.getBalancerPortfolioItem(
    abis_1.X_AAVE_B,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log(
    '[Balancer] Portfolio value of xAAVEb:',
    portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
  )
  t.true(
    Number(
      portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
    ) > 0
  )
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2V4Y2hhbmdlcy9iYWxhbmNlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBQWlFO0FBQ2pFLDhDQUFzQjtBQUV0Qix5REFBNEQ7QUFFNUQseUNBR21CO0FBRW5CLGFBQUksQ0FBQywyREFBMkQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDNUUsTUFBTSxXQUFXLEdBQUcsTUFBTSx1Q0FBNEIsQ0FDcEQsZUFBUSxFQUNSLGVBQVEsRUFDUixNQUFNLEVBQ04sV0FBSSxFQUNKLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDekUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsMkRBQTJELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzVFLE1BQU0sV0FBVyxHQUFHLE1BQU0sdUNBQTRCLENBQ3BELFVBQUcsRUFDSCxlQUFRLEVBQ1IsR0FBRyxFQUNILFVBQUcsRUFDSCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3JFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLDJEQUEyRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM1RSxNQUFNLFdBQVcsR0FBRyxNQUFNLHVDQUE0QixDQUNwRCxlQUFRLEVBQ1IsZUFBUSxFQUNSLE1BQU0sRUFDTixXQUFJLEVBQ0oseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN6RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQywyREFBMkQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDNUUsTUFBTSxXQUFXLEdBQUcsTUFBTSx1Q0FBNEIsQ0FDcEQsVUFBRyxFQUNILGVBQVEsRUFDUixHQUFHLEVBQ0gsVUFBRyxFQUNILHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDckUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXNCSTtBQUVKLGFBQUksQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxtQ0FBd0IsQ0FDOUMsZUFBUSxFQUNSLDRCQUFXLEVBQ1gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsS0FBSyxDQUFDLENBQUE7SUFDdEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLGtDQUFrQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuRCxNQUFNLFNBQVMsR0FBRyxNQUFNLG1DQUF3QixDQUM5QyxlQUFRLEVBQ1IsNEJBQVcsRUFDWCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsQ0FBQTtJQUN0RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFDLENBQUEifQ==
