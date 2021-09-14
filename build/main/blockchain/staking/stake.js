'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.stakeXtk = exports.approveXtk = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const utils_1 = require('ethers/lib/utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const XTK_ADDRESS = '0x7f3edcdd180dbe4819bd98fee8929b5cedb3adeb'
const approveXtk = async (amount, provider) => {
  const contract = new ethers_1.Contract(
    XTK_ADDRESS,
    abis_1.Abi.ERC20,
    provider
  )
  const network = await provider.getNetwork()
  return contract.approve(
    abis_1.ADDRESSES[abis_1.XTK_MANAGEMENT_STAKING_MODULE][network.chainId],
    amount
  )
}
exports.approveXtk = approveXtk
const stakeXtk = async (amount, provider) => {
  const inputAmount = utils_1.parseEther(amount)
  const stakingContract = await helper_1.getXtkStakingContract(provider)
  const address = await utils_2.getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmount(address, provider)
  if (approvedAmount.lt(inputAmount)) {
    return Promise.reject(new Error('Please approve the tokens before staking'))
  }
  return stakingContract.stake(inputAmount)
}
exports.stakeXtk = stakeXtk
const _getApprovedAmount = async (address, provider) => {
  const xtkContract = new ethers_1.Contract(
    XTK_ADDRESS,
    abis_1.Abi.ERC20,
    provider
  )
  const network = await provider.getNetwork()
  return xtkContract.allowance(
    address,
    abis_1.ADDRESSES[abis_1.XTK_MANAGEMENT_STAKING_MODULE][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rha2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9zdGFraW5nL3N0YWtlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUE0RTtBQUM1RSxtQ0FBNEM7QUFDNUMsNENBQTZDO0FBRTdDLG9DQUEyQztBQUUzQyxxQ0FBZ0Q7QUFFaEQsTUFBTSxXQUFXLEdBQUcsNENBQTRDLENBQUE7QUFFekQsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLE1BQWlCLEVBQUUsUUFBc0IsRUFBRSxFQUFFO0lBQzVFLE1BQU0sUUFBUSxHQUFHLElBQUksaUJBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUMvRCxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUUzQyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQ3JCLGdCQUFTLENBQUMsb0NBQTZCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQ3pELE1BQU0sQ0FDUCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBUlksUUFBQSxVQUFVLGNBUXRCO0FBRU0sTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLE1BQWMsRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDdkUsTUFBTSxXQUFXLEdBQUcsa0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN0QyxNQUFNLGVBQWUsR0FBRyxNQUFNLDhCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzdELE1BQU0sT0FBTyxHQUFHLE1BQU0sd0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEQsTUFBTSxjQUFjLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFbEUsSUFBSSxjQUFjLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLENBQUE7S0FDN0U7SUFFRCxPQUFPLGVBQWUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFBO0FBWFksUUFBQSxRQUFRLFlBV3BCO0FBRUQsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsT0FBZSxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUMzRSxNQUFNLFdBQVcsR0FBRyxJQUFJLGlCQUFRLENBQUMsV0FBVyxFQUFFLFVBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDbEUsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUMxQixPQUFPLEVBQ1AsZ0JBQVMsQ0FBQyxvQ0FBNkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDMUQsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9
