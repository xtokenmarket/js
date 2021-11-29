import { formatEther, formatUnits } from 'ethers/lib/utils'
import { DEC_18 } from '../../constants'
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
  return healthRatio.eq(DEC_18)
    ? formatEther(healthRatio)
    : formatUnits(healthRatio, 2)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZW5kaW5nL2NvbXB0cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRXhDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVqRDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEtBQUssRUFDdkMsT0FBZSxFQUNmLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLFdBQVcsR0FBRyxNQUFNLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDdEUsT0FBTyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUN2QyxDQUFDLENBQUE7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQ2pDLE9BQWUsRUFDZixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxNQUFNLFdBQVcsR0FBRyxNQUFNLFdBQVcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDN0QsT0FBTyxXQUFXLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUMzQixDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUE7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDNUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxPQUFPLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtBQUNwQyxDQUFDLENBQUEifQ==
