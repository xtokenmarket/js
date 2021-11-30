"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const mint_1 = require("./mint");
ava_1.default('Calculate xBTC3x expected quantity on mint with WBTC', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXAssetLev(abis_1.X_BTC_3X, false, '1', constants_spec_1.arbitrumProvider);
    console.log('Expected xBTC3x qty for 1 WBTC: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate xBTC3x expected quantity on mint with ETH', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXAssetLev(abis_1.X_BTC_3X, true, '1', constants_spec_1.arbitrumProvider);
    console.log('Expected xBTC3x qty for 1 ETH: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate xETH3x expected quantity on mint with WETH', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXAssetLev(abis_1.X_ETH_3X, false, '1', constants_spec_1.arbitrumProvider);
    console.log('Expected xETH3x qty for 1 WETH: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate xETH3x expected quantity on mint with ETH', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXAssetLev(abis_1.X_ETH_3X, true, '1', constants_spec_1.arbitrumProvider);
    console.log('Expected xETH3x qty for 1 ETH: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
/*test('Calculate xLINK3x expected quantity on mint with LINK', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetLev(
    X_LINK_3X,
    false,
    '1',
    arbitrumProvider
  )
  console.log('Expected xLINK3x qty for 1 LINK: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate xLINK3x expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAssetLev(
    X_LINK_3X,
    true,
    '1',
    arbitrumProvider
  )
  console.log('Expected xLINK3x qty for 1 ETH: ', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L21pbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFpRDtBQUNqRCw4Q0FBc0I7QUFFdEIseURBQXVEO0FBRXZELGlDQUEyRDtBQUUzRCxhQUFJLENBQUMsc0RBQXNELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3ZFLE1BQU0sV0FBVyxHQUFHLE1BQU0seUNBQWtDLENBQzFELGVBQVEsRUFDUixLQUFLLEVBQ0wsR0FBRyxFQUNILGlDQUFnQixDQUNqQixDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM1RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxxREFBcUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdEUsTUFBTSxXQUFXLEdBQUcsTUFBTSx5Q0FBa0MsQ0FDMUQsZUFBUSxFQUNSLElBQUksRUFDSixHQUFHLEVBQ0gsaUNBQWdCLENBQ2pCLENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzNELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLHNEQUFzRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN2RSxNQUFNLFdBQVcsR0FBRyxNQUFNLHlDQUFrQyxDQUMxRCxlQUFRLEVBQ1IsS0FBSyxFQUNMLEdBQUcsRUFDSCxpQ0FBZ0IsQ0FDakIsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDNUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMscURBQXFELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3RFLE1BQU0sV0FBVyxHQUFHLE1BQU0seUNBQWtDLENBQzFELGVBQVEsRUFDUixJQUFJLEVBQ0osR0FBRyxFQUNILGlDQUFnQixDQUNqQixDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMzRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9CSSJ9