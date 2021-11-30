"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaximumRedeemableXAssetLev = void 0;
const utils_1 = require("ethers/lib/utils");
const helper_1 = require("./helper");
const getMaximumRedeemableXAssetLev = async (symbol, provider) => {
    const { xassetlevContract } = await helper_1.getXAssetLevContracts(symbol, provider);
    const [bufferHoldings, { bufferBalance, marketBalance }, totalSupply,] = await Promise.all([
        xassetlevContract.getBufferBalance(),
        xassetlevContract.getFundBalances(),
        xassetlevContract.totalSupply(),
    ]);
    const redeemable = bufferHoldings
        .mul(totalSupply)
        .div(bufferBalance.add(marketBalance));
    return utils_1.formatEther(redeemable);
};
exports.getMaximumRedeemableXAssetLev = getMaximumRedeemableXAssetLev;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L3JlZGVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw0Q0FBOEM7QUFJOUMscUNBQWdEO0FBRXpDLE1BQU0sNkJBQTZCLEdBQUcsS0FBSyxFQUNoRCxNQUFrQixFQUNsQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSw4QkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFM0UsTUFBTSxDQUNKLGNBQWMsRUFDZCxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsRUFDaEMsV0FBVyxFQUNaLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3BCLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFO1FBQ3BDLGlCQUFpQixDQUFDLGVBQWUsRUFBRTtRQUNuQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7S0FDaEMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxVQUFVLEdBQUcsY0FBYztTQUM5QixHQUFHLENBQUMsV0FBVyxDQUFDO1NBQ2hCLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7SUFDeEMsT0FBTyxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLENBQUMsQ0FBQTtBQXBCWSxRQUFBLDZCQUE2QixpQ0FvQnpDIn0=