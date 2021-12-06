import { KYBER_PROXY, SNX, TRADE_ACCOUNTING, X_SNX_A } from '@xtoken/abis';
import { getContract } from '../utils';
export const getXSnxContracts = async (provider) => {
    const network = await provider.getNetwork();
    const xsnxContract = getContract(X_SNX_A, provider, network);
    const snxContract = getContract(SNX, provider, network);
    const kyberProxyContract = getContract(KYBER_PROXY, provider, network);
    const tradeAccountingContract = getContract(TRADE_ACCOUNTING, provider, network);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdEMsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUMvRCxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQVMsQ0FBQTtJQUNwRSxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQWEsQ0FBQTtJQUNuRSxNQUFNLGtCQUFrQixHQUFHLFdBQVcsQ0FDcEMsV0FBVyxFQUNYLFFBQVEsRUFDUixPQUFPLENBQ00sQ0FBQTtJQUNmLE1BQU0sdUJBQXVCLEdBQUcsV0FBVyxDQUN6QyxnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLE9BQU8sQ0FDVyxDQUFBO0lBRXBCLElBQ0UsQ0FBQyxZQUFZO1FBQ2IsQ0FBQyxrQkFBa0I7UUFDbkIsQ0FBQyx1QkFBdUI7UUFDeEIsQ0FBQyxXQUFXLEVBQ1o7UUFDQSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtLQUNsRDtJQUVELE9BQU87UUFDTCxrQkFBa0I7UUFDbEIsT0FBTztRQUNQLFdBQVc7UUFDWCx1QkFBdUI7UUFDdkIsWUFBWTtLQUNiLENBQUE7QUFDSCxDQUFDLENBQUEifQ==