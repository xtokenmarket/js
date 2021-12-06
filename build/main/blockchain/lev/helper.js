"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXAssetLevContracts = void 0;
const utils_1 = require("../utils");
const getXAssetLevContracts = async (symbol, provider) => {
    const network = await provider.getNetwork();
    const xassetlevContract = utils_1.getContract(symbol, provider, network);
    const tokenContract = utils_1.getContract(utils_1.getXAssetLevTokenSymbol(symbol), provider, network);
    if (!xassetlevContract || !tokenContract) {
        return Promise.reject(new Error('Unknown error'));
    }
    return {
        network,
        tokenContract,
        xassetlevContract,
    };
};
exports.getXAssetLevContracts = getXAssetLevContracts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxvQ0FBK0Q7QUFFeEQsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLEVBQ3hDLE1BQWtCLEVBQ2xCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxNQUFNLGlCQUFpQixHQUFHLG1CQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQWMsQ0FBQTtJQUU3RSxNQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUMvQiwrQkFBdUIsQ0FBQyxNQUFNLENBQUMsRUFDL0IsUUFBUSxFQUNSLE9BQU8sQ0FDSSxDQUFBO0lBRWIsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ3hDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0tBQ2xEO0lBRUQsT0FBTztRQUNMLE9BQU87UUFDUCxhQUFhO1FBQ2IsaUJBQWlCO0tBQ2xCLENBQUE7QUFDSCxDQUFDLENBQUE7QUF2QlksUUFBQSxxQkFBcUIseUJBdUJqQyJ9