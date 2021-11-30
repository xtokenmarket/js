"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaximumRedeemableXAlpha = void 0;
const utils_1 = require("ethers/lib/utils");
const helper_1 = require("./helper");
const getMaximumRedeemableXAlpha = async (symbol, provider) => {
    const { xalphaContract } = await helper_1.getXAlphaContracts(symbol, provider);
    const [bufferHoldings, alphaHoldings, totalSupply] = await Promise.all([
        xalphaContract.getBufferBalance(),
        xalphaContract.getNav(),
        xalphaContract.totalSupply(),
    ]);
    const redeemable = bufferHoldings.mul(totalSupply).div(alphaHoldings);
    return utils_1.formatEther(redeemable);
};
exports.getMaximumRedeemableXAlpha = getMaximumRedeemableXAlpha;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL3JlZGVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw0Q0FBOEM7QUFJOUMscUNBQTZDO0FBRXRDLE1BQU0sMEJBQTBCLEdBQUcsS0FBSyxFQUM3QyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRXJFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNyRSxjQUFjLENBQUMsZ0JBQWdCLEVBQUU7UUFDakMsY0FBYyxDQUFDLE1BQU0sRUFBRTtRQUN2QixjQUFjLENBQUMsV0FBVyxFQUFFO0tBQzdCLENBQUMsQ0FBQTtJQUVGLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3JFLE9BQU8sbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNoQyxDQUFDLENBQUE7QUFkWSxRQUFBLDBCQUEwQiw4QkFjdEMifQ==