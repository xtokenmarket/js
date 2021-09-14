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
const uniswap_1 = require('./uniswap')
ava_1.default('Get BTC<>USDC rate', async (t) => {
  const btcUsdcRate = await uniswap_1.getBtcUsdcPrice(constants_spec_1.provider)
  console.log('[Uniswap] BTC<>USDC rate:', btcUsdcRate)
  t.true(Number(btcUsdcRate) > 0)
})
ava_1.default('Get ETH<>USDC rate', async (t) => {
  const ethUsdcRate = await uniswap_1.getEthUsdcPrice(constants_spec_1.provider)
  console.log('[Uniswap] ETH<>USDC rate:', ethUsdcRate)
  t.true(Number(ethUsdcRate) > 0)
})
/*test('Calculate expected quantity on burn of xKNCa on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    ETH,
    X_KNC_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Uniswap] Expected ETH qty for 1000 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xKNCa with KNC on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    X_KNC_A,
    X_KNC_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Uniswap] Expected KNC qty for 1000 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCa on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    ETH,
    X_KNC_A,
    '1',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCa with KNC on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    X_KNC_A,
    X_KNC_A,
    '100',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCa qty for 100 KNC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCb on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    ETH,
    X_KNC_B,
    '1',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xKNCb with KNC on Uniswap', async (t) => {
  const expectedQty = await getUniswapEstimatedQuantity(
    X_KNC_B,
    X_KNC_B,
    '100',
    BUY,
    provider
  )
  console.log('[Uniswap] Expected xKNCb qty for 100 KNC:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
ava_1.default('Get Uniswap Portfolio of xKNCa', async (t) => {
  const portfolio = await uniswap_1.getUniswapPortfolioItem(
    abis_1.X_KNC_A,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log(
    '[Uniswap] Portfolio value of xKNCa:',
    portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
  )
  t.true(
    Number(
      portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
    ) > 0
  )
})
ava_1.default('Get Uniswap Portfolio of xKNCb', async (t) => {
  const portfolio = await uniswap_1.getUniswapPortfolioItem(
    abis_1.X_KNC_B,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log(
    '[Uniswap] Portfolio value of xKNCb:',
    portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
  )
  t.true(
    Number(
      portfolio === null || portfolio === void 0 ? void 0 : portfolio.value
    ) > 0
  )
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL3VuaXN3YXAuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFtRTtBQUNuRSw4Q0FBc0I7QUFFdEIseURBQTREO0FBRTVELHVDQUtrQjtBQUVsQixhQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sV0FBVyxHQUFHLE1BQU0seUJBQWUsQ0FBQyx5QkFBUSxDQUFDLENBQUE7SUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckMsTUFBTSxXQUFXLEdBQUcsTUFBTSx5QkFBZSxDQUFDLHlCQUFRLENBQUMsQ0FBQTtJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3JELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzRUk7QUFFSixhQUFJLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2pELE1BQU0sU0FBUyxHQUFHLE1BQU0saUNBQXVCLENBQzdDLGNBQU8sRUFDUCw0QkFBVyxFQUNYLHlCQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDakQsTUFBTSxTQUFTLEdBQUcsTUFBTSxpQ0FBdUIsQ0FDN0MsY0FBTyxFQUNQLDRCQUFXLEVBQ1gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsS0FBSyxDQUFDLENBQUE7SUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQyxDQUFBIn0=
