"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXSnxContracts = void 0;
const abis_1 = require("@xtoken/abis");
const utils_1 = require("../utils");
const getXSnxContracts = async (provider) => {
    const network = await provider.getNetwork();
    const xsnxContract = utils_1.getContract(abis_1.X_SNX_A, provider, network);
    const snxContract = utils_1.getContract(abis_1.SNX, provider, network);
    const kyberProxyContract = utils_1.getContract(abis_1.KYBER_PROXY, provider, network);
    const tradeAccountingContract = utils_1.getContract(abis_1.TRADE_ACCOUNTING, provider, network);
    if (!xsnxContract ||
        !kyberProxyContract ||
        !tradeAccountingContract ||
        !snxContract) {
        return Promise.reject(new Error('Unknown error'));
    }
    return {
        kyberProxyContract,
        network,
        snxContract,
        tradeAccountingContract,
        xsnxContract,
    };
};
exports.getXSnxContracts = getXSnxContracts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsdUNBQTBFO0FBRzFFLG9DQUFzQztBQUUvQixNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDL0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsTUFBTSxZQUFZLEdBQUcsbUJBQVcsQ0FBQyxjQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBUyxDQUFBO0lBQ3BFLE1BQU0sV0FBVyxHQUFHLG1CQUFXLENBQUMsVUFBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQWEsQ0FBQTtJQUNuRSxNQUFNLGtCQUFrQixHQUFHLG1CQUFXLENBQ3BDLGtCQUFXLEVBQ1gsUUFBUSxFQUNSLE9BQU8sQ0FDTSxDQUFBO0lBQ2YsTUFBTSx1QkFBdUIsR0FBRyxtQkFBVyxDQUN6Qyx1QkFBZ0IsRUFDaEIsUUFBUSxFQUNSLE9BQU8sQ0FDVyxDQUFBO0lBRXBCLElBQ0UsQ0FBQyxZQUFZO1FBQ2IsQ0FBQyxrQkFBa0I7UUFDbkIsQ0FBQyx1QkFBdUI7UUFDeEIsQ0FBQyxXQUFXLEVBQ1o7UUFDQSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtLQUNsRDtJQUVELE9BQU87UUFDTCxrQkFBa0I7UUFDbEIsT0FBTztRQUNQLFdBQVc7UUFDWCx1QkFBdUI7UUFDdkIsWUFBWTtLQUNiLENBQUE7QUFDSCxDQUFDLENBQUE7QUFoQ1ksUUFBQSxnQkFBZ0Isb0JBZ0M1QiJ9