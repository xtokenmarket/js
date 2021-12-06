"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { BUY, ETH, SELL, X_BNT_A } from '@xtoken/abis'
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("ethers/lib/utils");
const constants_spec_1 = require("../../constants.spec");
const bancor_1 = require("./bancor");
ava_1.default('Get Bancor Network address', async (t) => {
    const bancorNetworkAddress = await bancor_1.getBancorNetworkAddress(constants_spec_1.provider);
    console.log('[Bancor] Bancor Network address:', bancorNetworkAddress);
    t.true(utils_1.isAddress(bancorNetworkAddress));
});
ava_1.default('Get BNT ETH price', async (t) => {
    const minReturn = await bancor_1.getBntEthPrice(constants_spec_1.provider);
    console.log('[Bancor] minReturn:', minReturn);
    t.true(Number(minReturn) > 0);
});
/*test('Calculate expected quantity on burn of xBNTa with ETH on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    ETH,
    X_BNT_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Bancor] Expected ETH qty for 1000 xBNTa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xBNTa with BNT on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    X_BNT_A,
    X_BNT_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Bancor] Expected BNT qty for 1000 xBNTa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xBNTa on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    ETH,
    X_BNT_A,
    '1',
    BUY,
    provider
  )
  console.log('[Bancor] Expected xBNTa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xBNTa with BNT on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    X_BNT_A,
    X_BNT_A,
    '100',
    BUY,
    provider
  )
  console.log('[Bancor] Expected xBNTa qty for 100 BNT:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Get Bancor Portfolio of xBNTa', async (t) => {
  const portfolio = await getBancorPortfolioItem(X_BNT_A, testAddress, provider)
  console.log('[Bancor] Portfolio value of xBNTa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuY29yLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9leGNoYW5nZXMvYmFuY29yLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5REFBeUQ7QUFDekQsOENBQXNCO0FBQ3RCLDRDQUE0QztBQUU1Qyx5REFBK0M7QUFFL0MscUNBS2lCO0FBRWpCLGFBQUksQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDN0MsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLGdDQUF1QixDQUFDLHlCQUFRLENBQUMsQ0FBQTtJQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFDckUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsTUFBTSxTQUFTLEdBQUcsTUFBTSx1QkFBYyxDQUFDLHlCQUFRLENBQUMsQ0FBQTtJQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFvREkifQ==