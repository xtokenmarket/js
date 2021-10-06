'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXtkHistory = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const utils_2 = require('../../utils')
const utils_3 = require('../utils')
const helper_1 = require('./helper')
const fromBlock = 12838146
const getXtkHistory = async (type, account, provider) => {
  const label = utils_3.toTitleCase(type)
  const stakingContract = await helper_1.getXtkStakingContract(provider)
  const filter = stakingContract.filters[type](account, null, null)
  const logs = await stakingContract.queryFilter(filter, fromBlock)
  const iface = new utils_1.Interface(abis_1.Abi.XTKManagementStakingModule)
  const promises = logs.map(async (log) => {
    const block = await provider.getBlock(log.blockNumber)
    const parsedLog = iface.parseLog(log)
    const { xtkAmount } = parsedLog.args
    return {
      time: block.timestamp,
      label,
      value: `${utils_2
        .formatNumber(utils_1.formatEther(xtkAmount), 2)
        .toFixed(2)}`,
      txHash: log.transactionHash,
    }
  })
  return Promise.all(promises)
}
exports.getXtkHistory = getXtkHistory
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3N0YWtpbmcvaGlzdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1Q0FBa0M7QUFDbEMsNENBQXlEO0FBR3pELHVDQUEwQztBQUMxQyxvQ0FBc0M7QUFFdEMscUNBQWdEO0FBRWhELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQTtBQUVuQixNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLElBQWtCLEVBQ2xCLE9BQWUsRUFDZixRQUFzQixFQUNhLEVBQUU7SUFDckMsTUFBTSxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMvQixNQUFNLGVBQWUsR0FBRyxNQUFNLDhCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTdELE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNqRSxNQUFNLElBQUksR0FBbUIsTUFBTSxlQUFlLENBQUMsV0FBVyxDQUM1RCxNQUFNLEVBQ04sU0FBUyxDQUNWLENBQUE7SUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFTLENBQUMsVUFBRyxDQUFDLDBCQUEwQixDQUFDLENBQUE7SUFFM0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDdEMsTUFBTSxLQUFLLEdBQVUsTUFBTSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUM3RCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3JDLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFBO1FBRXBDLE9BQU87WUFDTCxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVM7WUFDckIsS0FBSztZQUNMLEtBQUssRUFBRSxHQUFHLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxlQUFlO1NBQzVCLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM5QixDQUFDLENBQUE7QUE3QlksUUFBQSxhQUFhLGlCQTZCekIifQ==
