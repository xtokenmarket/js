"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXAlphaContracts = void 0;
const utils_1 = require("../utils");
const getXAlphaContracts = async (symbol, provider) => {
    const network = await provider.getNetwork();
    const xalphaContract = utils_1.getContract(symbol, provider, network);
    const tokenContract = utils_1.getContract(utils_1.getTokenSymbol(symbol), provider, network);
    if (!xalphaContract || !tokenContract) {
        return Promise.reject(new Error('Unknown error'));
    }
    return {
        network,
        tokenContract,
        xalphaContract,
    };
};
exports.getXAlphaContracts = getXAlphaContracts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxvQ0FBc0Q7QUFFL0MsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLEVBQ3JDLE1BQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxNQUFNLGNBQWMsR0FBRyxtQkFBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFXLENBQUE7SUFFdkUsTUFBTSxhQUFhLEdBQUcsbUJBQVcsQ0FDL0Isc0JBQWMsQ0FBQyxNQUFNLENBQUMsRUFDdEIsUUFBUSxFQUNSLE9BQU8sQ0FDSSxDQUFBO0lBRWIsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtLQUNsRDtJQUVELE9BQU87UUFDTCxPQUFPO1FBQ1AsYUFBYTtRQUNiLGNBQWM7S0FDZixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBdkJZLFFBQUEsa0JBQWtCLHNCQXVCOUIifQ==