import { Abi, ADDRESSES, XTK_MANAGEMENT_STAKING_MODULE } from '@xtoken/abis'
import { Contract } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { getSignerAddress } from '../utils'
import { getXtkStakingContract } from './helper'
const XTK_ADDRESS = '0x7f3edcdd180dbe4819bd98fee8929b5cedb3adeb'
export const approveXtk = async (amount, provider) => {
  const contract = new Contract(XTK_ADDRESS, Abi.ERC20, provider)
  const network = await provider.getNetwork()
  return contract.approve(
    ADDRESSES[XTK_MANAGEMENT_STAKING_MODULE][network.chainId],
    amount
  )
}
export const stakeXtk = async (amount, provider) => {
  const inputAmount = parseEther(amount)
  const stakingContract = await getXtkStakingContract(provider)
  const address = await getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmount(address, provider)
  if (approvedAmount.lt(inputAmount)) {
    return Promise.reject(new Error('Please approve the tokens before staking'))
  }
  return stakingContract.stake(inputAmount)
}
const _getApprovedAmount = async (address, provider) => {
  const xtkContract = new Contract(XTK_ADDRESS, Abi.ERC20, provider)
  const network = await provider.getNetwork()
  return xtkContract.allowance(
    address,
    ADDRESSES[XTK_MANAGEMENT_STAKING_MODULE][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rha2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9zdGFraW5nL3N0YWtlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQzVFLE9BQU8sRUFBYSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRTdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUUzQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFaEQsTUFBTSxXQUFXLEdBQUcsNENBQTRDLENBQUE7QUFFaEUsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxNQUFpQixFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUM1RSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUMvRCxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQ3JCLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFDekQsTUFBTSxDQUNQLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLE1BQWMsRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDdkUsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RDLE1BQU0sZUFBZSxHQUFHLE1BQU0scUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDN0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoRCxNQUFNLGNBQWMsR0FBRyxNQUFNLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUVsRSxJQUFJLGNBQWMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDbEMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUMsQ0FBQTtLQUM3RTtJQUVELE9BQU8sZUFBZSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQUE7QUFFRCxNQUFNLGtCQUFrQixHQUFHLEtBQUssRUFBRSxPQUFlLEVBQUUsUUFBc0IsRUFBRSxFQUFFO0lBQzNFLE1BQU0sV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2xFLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBRTNDLE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FDMUIsT0FBTyxFQUNQLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDMUQsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9
