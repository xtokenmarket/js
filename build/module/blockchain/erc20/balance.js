import { Abi, ADDRESSES } from '@xtoken/abis'
import { ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
export const getTokenBalance = async (symbol, address, provider) => {
  const { chainId } = await provider.getNetwork()
  const tokenAddress = ADDRESSES[symbol][chainId]
  const contract = new ethers.Contract(tokenAddress, Abi.ERC20, provider)
  const tokenBalance = await contract.balanceOf(address)
  return formatEther(tokenBalance)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2VyYzIwL2JhbGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQWUsTUFBTSxjQUFjLENBQUE7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFLOUMsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFDbEMsTUFBMEUsRUFDMUUsT0FBZSxFQUNmLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDL0MsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQy9DLE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FDbEMsWUFBWSxFQUNaLEdBQUcsQ0FBQyxLQUFLLEVBQ1QsUUFBUSxDQUNBLENBQUE7SUFDVixNQUFNLFlBQVksR0FBRyxNQUFNLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDdEQsT0FBTyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUFBIn0=
