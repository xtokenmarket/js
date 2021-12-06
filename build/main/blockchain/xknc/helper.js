"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXKncContracts = void 0;
const abis_1 = require("@xtoken/abis");
const utils_1 = require("../utils");
const getXKncContracts = async (symbol, provider) => {
    const network = await provider.getNetwork();
    const xkncContract = utils_1.getContract(symbol, provider, network);
    const kncContract = utils_1.getContract(abis_1.KNC, provider, network);
    const kyberProxyContract = utils_1.getContract(abis_1.KYBER_PROXY, provider, network);
    const tokenContract = utils_1.getContract(utils_1.getTokenSymbol(symbol), provider, network);
    if (!xkncContract || !kncContract || !kyberProxyContract || !tokenContract) {
        return Promise.reject(new Error('Unknown error'));
    }
    return {
        kncContract,
        kyberProxyContract,
        network,
        tokenContract,
        xkncContract,
    };
};
exports.getXKncContracts = getXKncContracts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsdUNBQStDO0FBSS9DLG9DQUFzRDtBQUUvQyxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFDbkMsTUFBcUIsRUFDckIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBRTNDLE1BQU0sWUFBWSxHQUFHLG1CQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQVMsQ0FBQTtJQUNuRSxNQUFNLFdBQVcsR0FBRyxtQkFBVyxDQUFDLFVBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDdkQsTUFBTSxrQkFBa0IsR0FBRyxtQkFBVyxDQUNwQyxrQkFBVyxFQUNYLFFBQVEsRUFDUixPQUFPLENBQ00sQ0FBQTtJQUNmLE1BQU0sYUFBYSxHQUFHLG1CQUFXLENBQy9CLHNCQUFjLENBQUMsTUFBTSxDQUFDLEVBQ3RCLFFBQVEsRUFDUixPQUFPLENBQ0ksQ0FBQTtJQUViLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUMxRSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtLQUNsRDtJQUVELE9BQU87UUFDTCxXQUFXO1FBQ1gsa0JBQWtCO1FBQ2xCLE9BQU87UUFDUCxhQUFhO1FBQ2IsWUFBWTtLQUNiLENBQUE7QUFDSCxDQUFDLENBQUE7QUE5QlksUUFBQSxnQkFBZ0Isb0JBOEI1QiJ9