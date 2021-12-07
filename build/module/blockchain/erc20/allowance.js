import { formatUnits } from 'ethers/lib/utils';
import { getContract } from '../utils';
export const getTokenAllowance = async (symbol, address, spenderAddress, provider) => {
    const network = await provider.getNetwork();
    const tokenContract = getContract(symbol, provider, network);
    const [tokenAllowance, decimals] = await Promise.all([
        tokenContract.allowance(address, spenderAddress),
        tokenContract.decimals(),
    ]);
    return formatUnits(tokenAllowance, decimals);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsb3dhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXJjMjAvYWxsb3dhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQVM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXRDLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsTUFLc0IsRUFDdEIsT0FBZSxFQUNmLGNBQXNCLEVBQ3RCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMzQyxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQVUsQ0FBQTtJQUNyRSxNQUFNLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNuRCxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUM7UUFDaEQsYUFBYSxDQUFDLFFBQVEsRUFBRTtLQUN6QixDQUFDLENBQUE7SUFDRixPQUFPLFdBQVcsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDOUMsQ0FBQyxDQUFBIn0=