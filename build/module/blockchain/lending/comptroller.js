import { formatEther } from 'ethers/lib/utils'
import { getComptrollerContract } from './helper'
/**
 * Get Borrowing Capacity for an address
 * @param address
 * @param provider
 * @returns
 */
export const getBorrowingCapacity = async (address, provider) => {
  const comptroller = await getComptrollerContract(provider)
  const borrowingCapacity = await comptroller.borrowingCapacity(address)
  return formatEther(borrowingCapacity)
}
/**
 * Get Health Ratio for an address
 * @param address
 * @param provider
 * @returns
 */
export const getHealthRatio = async (address, provider) => {
  const comptroller = await getComptrollerContract(provider)
  const healthRatio = await comptroller.getHealthRatio(address)
  return formatEther(healthRatio)
}
/**
 * Get all markets registered in Comptroller
 * @param provider
 * @returns
 */
export const getAllMarkets = async (provider) => {
  const comptroller = await getComptrollerContract(provider)
  return comptroller.getAllMarkets()
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZW5kaW5nL2NvbXB0cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUU5QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFakQ7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxLQUFLLEVBQ3ZDLE9BQWUsRUFDZixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sV0FBVyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3RFLE9BQU8sV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUE7QUFDdkMsQ0FBQyxDQUFBO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUNqQyxPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sV0FBVyxHQUFHLE1BQU0sc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzdELE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQTtBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUM1RCxNQUFNLFdBQVcsR0FBRyxNQUFNLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELE9BQU8sV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFBO0FBQ3BDLENBQUMsQ0FBQSJ9
