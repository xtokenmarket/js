import { getContract, getXAssetLevTokenSymbol } from '../utils';
export const getXAssetLevContracts = async (symbol, provider) => {
    const network = await provider.getNetwork();
    const xassetlevContract = getContract(symbol, provider, network);
    const tokenContract = getContract(getXAssetLevTokenSymbol(symbol), provider, network);
    if (!xassetlevContract || !tokenContract) {
        return Promise.reject(new Error('Unknown error'));
    }
    return {
        network,
        tokenContract,
        xassetlevContract,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxPQUFPLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRS9ELE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLEtBQUssRUFDeEMsTUFBa0IsRUFDbEIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBRTNDLE1BQU0saUJBQWlCLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFjLENBQUE7SUFFN0UsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUMvQix1QkFBdUIsQ0FBQyxNQUFNLENBQUMsRUFDL0IsUUFBUSxFQUNSLE9BQU8sQ0FDSSxDQUFBO0lBRWIsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ3hDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0tBQ2xEO0lBRUQsT0FBTztRQUNMLE9BQU87UUFDUCxhQUFhO1FBQ2IsaUJBQWlCO0tBQ2xCLENBQUE7QUFDSCxDQUFDLENBQUEifQ==