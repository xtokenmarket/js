"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaximumRedeemableXU3LP = void 0;
const utils_1 = require("ethers/lib/utils");
const helper_1 = require("./helper");
const getMaximumRedeemableXU3LP = async (symbol, outputAsset, provider) => {
    const { xu3lpContract } = await helper_1.getXU3LPContracts(symbol, provider);
    const getBufferBalance = outputAsset
        ? xu3lpContract.getBufferToken1Balance
        : xu3lpContract.getBufferToken0Balance;
    const bufferHoldings = await getBufferBalance();
    return utils_1.formatEther(bufferHoldings);
};
exports.getMaximumRedeemableXU3LP = getMaximumRedeemableXU3LP;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvcmVkZWVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUE4QztBQUk5QyxxQ0FBNEM7QUFFckMsTUFBTSx5QkFBeUIsR0FBRyxLQUFLLEVBQzVDLE1BQXVCLEVBQ3ZCLFdBQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSwwQkFBaUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFbkUsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXO1FBQ2xDLENBQUMsQ0FBQyxhQUFhLENBQUMsc0JBQXNCO1FBQ3RDLENBQUMsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUE7SUFFeEMsTUFBTSxjQUFjLEdBQUcsTUFBTSxnQkFBZ0IsRUFBRSxDQUFBO0lBRS9DLE9BQU8sbUJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUE7QUFkWSxRQUFBLHlCQUF5Qiw2QkFjckMifQ==