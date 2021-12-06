import { KYBER_PROXY } from '@xtoken/abis';
import { getContract, getTokenSymbol } from '../utils';
export const getXAaveContracts = async (symbol, provider) => {
    const network = await provider.getNetwork();
    const xaaveContract = getContract(symbol, provider, network);
    const kyberProxyContract = getContract(KYBER_PROXY, provider, network);
    const tokenContract = getContract(getTokenSymbol(symbol), provider, network);
    if (!xaaveContract || !kyberProxyContract || !tokenContract) {
        return Promise.reject(new Error('Unknown error'));
    }
    return {
        kyberProxyContract,
        network,
        tokenContract,
        xaaveContract,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFhdmUvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFJMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdEQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUNwQyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFVLENBQUE7SUFDckUsTUFBTSxrQkFBa0IsR0FBRyxXQUFXLENBQ3BDLFdBQVcsRUFDWCxRQUFRLEVBQ1IsT0FBTyxDQUNNLENBQUE7SUFDZixNQUFNLGFBQWEsR0FBRyxXQUFXLENBQy9CLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFDdEIsUUFBUSxFQUNSLE9BQU8sQ0FDSSxDQUFBO0lBRWIsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsYUFBYSxFQUFFO1FBQzNELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0tBQ2xEO0lBRUQsT0FBTztRQUNMLGtCQUFrQjtRQUNsQixPQUFPO1FBQ1AsYUFBYTtRQUNiLGFBQWE7S0FDZCxDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=