import { getContract, getTokenSymbol } from '../utils';
export const getXAlphaContracts = async (symbol, provider) => {
    const network = await provider.getNetwork();
    const xalphaContract = getContract(symbol, provider, network);
    const tokenContract = getContract(getTokenSymbol(symbol), provider, network);
    if (!xalphaContract || !tokenContract) {
        return Promise.reject(new Error('Unknown error'));
    }
    return {
        network,
        tokenContract,
        xalphaContract,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxPQUFPLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV0RCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLEVBQ3JDLE1BQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQVcsQ0FBQTtJQUV2RSxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQy9CLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFDdEIsUUFBUSxFQUNSLE9BQU8sQ0FDSSxDQUFBO0lBRWIsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtLQUNsRDtJQUVELE9BQU87UUFDTCxPQUFPO1FBQ1AsYUFBYTtRQUNiLGNBQWM7S0FDZixDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=