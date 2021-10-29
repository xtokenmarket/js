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
  return formatUnits(borrowingCapacity, 6)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZW5kaW5nL2NvbXB0cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRXhDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVqRDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEtBQUssRUFDdkMsT0FBZSxFQUNmLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLFdBQVcsR0FBRyxNQUFNLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDdEUsT0FBTyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDMUMsQ0FBQyxDQUFBO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUNqQyxPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sV0FBVyxHQUFHLE1BQU0sc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzdELE9BQU8sV0FBVyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDM0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFBO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQUUsUUFBc0IsRUFBRSxFQUFFO0lBQzVELE1BQU0sV0FBVyxHQUFHLE1BQU0sc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsT0FBTyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUE7QUFDcEMsQ0FBQyxDQUFBIn0=
