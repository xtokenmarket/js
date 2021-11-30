"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaximumRedeemableXInch = void 0;
const utils_1 = require("ethers/lib/utils");
const helper_1 = require("./helper");
const getMaximumRedeemableXInch = async (symbol, provider) => {
    const { xinchContract } = await helper_1.getXInchContracts(symbol, provider);
    const [bufferHoldings, inchHoldings, totalSupply] = await Promise.all([
        xinchContract.getBufferBalance(),
        xinchContract.getNav(),
        xinchContract.totalSupply(),
    ]);
    const redeemable = bufferHoldings.mul(totalSupply).div(inchHoldings);
    return utils_1.formatEther(redeemable);
};
exports.getMaximumRedeemableXInch = getMaximumRedeemableXInch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvcmVkZWVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUE4QztBQUk5QyxxQ0FBNEM7QUFFckMsTUFBTSx5QkFBeUIsR0FBRyxLQUFLLEVBQzVDLE1BQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSwwQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFbkUsTUFBTSxDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3BFLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUNoQyxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQ3RCLGFBQWEsQ0FBQyxXQUFXLEVBQUU7S0FDNUIsQ0FBQyxDQUFBO0lBRUYsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDcEUsT0FBTyxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLENBQUMsQ0FBQTtBQWRZLFFBQUEseUJBQXlCLDZCQWNyQyJ9