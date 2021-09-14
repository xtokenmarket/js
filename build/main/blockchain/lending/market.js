'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.withdrawCollateral = exports.supplyCollateral = exports.getCollateral = exports.getBorrowingLimit = void 0
const units_1 = require('@ethersproject/units')
const abis_1 = require('@xtoken/abis')
const constants_1 = require('../../constants')
const utils_1 = require('../utils')
const helper_1 = require('./helper')
/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
const getBorrowingLimit = async (marketName, provider, address) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  if (!address) {
    address = await utils_1.getSignerAddress(provider)
  }
  const borrowingLimit = await marketContract.borrowingLimit(address)
  return units_1.formatEther(borrowingLimit)
}
exports.getBorrowingLimit = getBorrowingLimit
/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
const getCollateral = async (marketName, provider, address) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  if (!address) {
    address = await utils_1.getSignerAddress(provider)
  }
  const collateral = await marketContract.collateral(address)
  return units_1.formatEther(collateral)
}
exports.getCollateral = getCollateral
/**
 * Add xAsset collateral to a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
const supplyCollateral = async (marketName, amount, provider) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const address = await utils_1.getSignerAddress(provider)
  const approvedAmount = await getApprovedAmountXAsset(
    marketName,
    address,
    provider
  )
  if (approvedAmount.lt(amount)) {
    return Promise.reject(
      new Error('Please approve the tokens before adding collateral')
    )
  }
  return marketContract.collateralize(amount)
}
exports.supplyCollateral = supplyCollateral
/**
 * Withdraw xAsset collateral from a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
const withdrawCollateral = async (marketName, amount, provider) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  return marketContract.withdraw(amount)
}
exports.withdrawCollateral = withdrawCollateral
const getApprovedAmountXAsset = async (marketName, address, provider) => {
  const network = await provider.getNetwork()
  let xTokenContract
  switch (marketName) {
    case abis_1.LENDING_X_AAVE_A_MARKET:
      xTokenContract = utils_1.getContract(abis_1.X_AAVE_A, provider, network)
      break
    case abis_1.LENDING_X_AAVE_B_MARKET:
      xTokenContract = utils_1.getContract(abis_1.X_AAVE_B, provider, network)
      break
    case abis_1.LENDING_X_INCH_A_MARKET:
      xTokenContract = utils_1.getContract(abis_1.X_INCH_A, provider, network)
      break
    case abis_1.LENDING_X_INCH_B_MARKET:
      xTokenContract = utils_1.getContract(abis_1.X_INCH_B, provider, network)
      break
    case abis_1.LENDING_X_KNC_A_MARKET:
      xTokenContract = utils_1.getContract(abis_1.X_KNC_A, provider, network)
      break
    case abis_1.LENDING_X_KNC_B_MARKET:
      xTokenContract = utils_1.getContract(abis_1.X_KNC_B, provider, network)
  }
  if (!xTokenContract) {
    return Promise.reject(
      new Error(constants_1.Errors.CONTRACT_INITIALIZATION_FAILED)
    )
  }
  return xTokenContract.allowance(
    address,
    abis_1.ADDRESSES[abis_1.LENDING_LIQUIDITY_POOL][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQWtEO0FBQ2xELHVDQWVxQjtBQUdyQiwrQ0FBd0M7QUFFeEMsb0NBQXdEO0FBRXhELHFDQUE2QztBQUU3Qzs7Ozs7O0dBTUc7QUFDSSxNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsVUFBMEIsRUFDMUIsUUFBc0IsRUFDdEIsT0FBZ0IsRUFDaEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixPQUFPLEdBQUcsTUFBTSx3QkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUMzQztJQUNELE1BQU0sY0FBYyxHQUFHLE1BQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuRSxPQUFPLG1CQUFXLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBWlksUUFBQSxpQkFBaUIscUJBWTdCO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxVQUEwQixFQUMxQixRQUFzQixFQUN0QixPQUFnQixFQUNoQixFQUFFO0lBQ0YsTUFBTSxlQUFlLEdBQUcsTUFBTSwyQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sR0FBRyxNQUFNLHdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQzNDO0lBQ0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFjLENBQUMs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
