"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const helper_1 = require("./helper");
const prices_1 = require("./prices");
ava_1.default('Get xBTC3x prices', async (t) => {
    const { xassetlevContract } = await helper_1.getXAssetLevContracts(abis_1.X_BTC_3X, constants_spec_1.arbitrumProvider);
    const { aum, priceEth, priceUsd } = await prices_1.getXAssetLevPrices(xassetlevContract);
    console.log('xBTC3x aum: ', aum);
    console.log('xBTC3x priceEth: ', priceEth);
    console.log('xBTC3x priceUsd: ', priceUsd);
    t.true(aum > 0);
    t.true(priceEth > 0);
    t.true(priceUsd > 0);
});
ava_1.default('Get xETH3x prices', async (t) => {
    const { xassetlevContract } = await helper_1.getXAssetLevContracts(abis_1.X_ETH_3X, constants_spec_1.arbitrumProvider);
    const { aum, priceEth, priceUsd } = await prices_1.getXAssetLevPrices(xassetlevContract);
    console.log('xETH3x aum: ', aum);
    console.log('xETH3x priceEth: ', priceEth);
    console.log('xETH3x priceUsd: ', priceUsd);
    t.true(aum > 0);
    t.true(priceEth > 0);
    t.true(priceUsd > 0);
});
/*test('Get xLINK3x prices', async (t) => {
  const { xassetlevContract } = await getXAssetLevContracts(
    X_LINK_3X,
    arbitrumProvider
  )

  const { aum, priceEth, priceUsd } = await getXAssetLevPrices(
    xassetlevContract
  )

  console.log('xLINK3x aum: ', aum)
  console.log('xLINK3x priceEth: ', priceEth)
  console.log('xLINK3x priceUsd: ', priceUsd)

  t.true(aum > 0)
  t.true(priceEth > 0)
  t.true(priceUsd > 0)
})*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZXYvcHJpY2VzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBaUQ7QUFDakQsOENBQXNCO0FBRXRCLHlEQUF1RDtBQUV2RCxxQ0FBZ0Q7QUFDaEQscUNBQTZDO0FBRTdDLGFBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSw4QkFBcUIsQ0FDdkQsZUFBUSxFQUNSLGlDQUFnQixDQUNqQixDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSwyQkFBa0IsQ0FDMUQsaUJBQWlCLENBQ2xCLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFMUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSw4QkFBcUIsQ0FDdkQsZUFBUSxFQUNSLGlDQUFnQixDQUNqQixDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSwyQkFBa0IsQ0FDMUQsaUJBQWlCLENBQ2xCLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFMUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QixDQUFDLENBQUMsQ0FBQTtBQUVGOzs7Ozs7Ozs7Ozs7Ozs7OztJQWlCSSJ9