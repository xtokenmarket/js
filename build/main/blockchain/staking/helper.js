"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXtkStakingContract = void 0;
const abis_1 = require("@xtoken/abis");
const utils_1 = require("../utils");
const getXtkStakingContract = async (provider) => {
    const network = await provider.getNetwork();
    const stakingContract = utils_1.getContract(abis_1.XTK_MANAGEMENT_STAKING_MODULE, provider, network);
    if (!stakingContract) {
        return Promise.reject(new Error('Could not create XTK Staking Contract'));
    }
    return stakingContract;
};
exports.getXtkStakingContract = getXtkStakingContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vc3Rha2luZy9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQTREO0FBRzVELG9DQUFzQztBQUUvQixNQUFNLHFCQUFxQixHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDcEUsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDM0MsTUFBTSxlQUFlLEdBQUcsbUJBQVcsQ0FDakMsb0NBQTZCLEVBQzdCLFFBQVEsRUFDUixPQUFPLENBQ3NCLENBQUE7SUFDL0IsSUFBSSxDQUFDLGVBQWUsRUFBRTtRQUNwQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxDQUFBO0tBQzFFO0lBQ0QsT0FBTyxlQUFlLENBQUE7QUFDeEIsQ0FBQyxDQUFBO0FBWFksUUFBQSxxQkFBcUIseUJBV2pDIn0=