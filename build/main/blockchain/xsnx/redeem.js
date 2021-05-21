'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getMaximumRedeemableXSnx = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const getMaximumRedeemableXSnx = async (provider) => {
  const {
    network,
    snxContract,
    tradeAccountingContract,
    xsnxContract,
  } = await helper_1.getXSnxContracts(provider)
  const { chainId } = network
  const xsnxAdminAddress = abis_1.ADDRESSES[abis_1.X_SNX_A_ADMIN][chainId]
  const snxAddress = abis_1.ADDRESSES[abis_1.SNX][chainId]
  const [
    availableEthBalance,
    totalSupply,
    snxBalanceOwned,
    debtValue,
  ] = await Promise.all([
    tradeAccountingContract.getEthBalance(),
    xsnxContract.totalSupply(),
    utils_2.getTokenBalance(snxAddress, xsnxAdminAddress, provider),
    snxContract.debtBalanceOf(
      xsnxAdminAddress,
      utils_1.formatBytes32String('sUSD')
    ),
  ])
  const redeemTokenPrice = await tradeAccountingContract.calculateRedeemTokenPrice(
    totalSupply,
    snxBalanceOwned,
    debtValue
  )
  return utils_1.formatEther(
    availableEthBalance.mul(constants_1.DEC_18).div(redeemTokenPrice)
  )
}
exports.getMaximumRedeemableXSnx = getMaximumRedeemableXSnx
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9yZWRlZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQTREO0FBQzVELDRDQUFtRTtBQUVuRSwrQ0FBd0M7QUFFeEMsb0NBQTBDO0FBRTFDLHFDQUEyQztBQUVwQyxNQUFNLHdCQUF3QixHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDdkUsTUFBTSxFQUNKLE9BQU8sRUFDUCxXQUFXLEVBQ1gsdUJBQXVCLEVBQ3ZCLFlBQVksR0FDYixHQUFHLE1BQU0seUJBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUUzQixNQUFNLGdCQUFnQixHQUFHLGdCQUFTLENBQUMsb0JBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzFELE1BQU0sVUFBVSxHQUFHLGdCQUFTLENBQUMsVUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFMUMsTUFBTSxDQUNKLG1CQUFtQixFQUNuQixXQUFXLEVBQ1gsZUFBZSxFQUNmLFNBQVMsRUFDVixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNwQix1QkFBdUIsQ0FBQyxhQUFhLEVBQUU7UUFDdkMsWUFBWSxDQUFDLFdBQVcsRUFBRTtRQUMxQix1QkFBZSxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLENBQUM7UUFDdEQsV0FBcUIsQ0FBQyxhQUFhLENBQ2xDLGdCQUFnQixFQUNoQiwyQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FDNUI7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLGdCQUFnQixHQUFHLE1BQU0sdUJBQXVCLENBQUMseUJBQXlCLENBQzlFLFdBQVcsRUFDWCxlQUFlLEVBQ2YsU0FBUyxDQUNWLENBQUE7SUFFRCxPQUFPLG1CQUFXLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO0FBQzNFLENBQUMsQ0FBQTtBQWxDWSxRQUFBLHdCQUF3Qiw0QkFrQ3BDIn0=
