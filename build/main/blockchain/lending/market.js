'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.approveXKNCb = exports.approveXKNCa = exports.approveXINCHb = exports.approveXINCHa = exports.approveXAAVEb = exports.approveXAAVEa = exports.getBorrowingLimit = exports.getCollateral = exports.withdrawCollateral = exports.collateralize = void 0
const units_1 = require('@ethersproject/units')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../utils')
const helper_1 = require('./helper')
/**
 * Add xAsset collateral to a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
const collateralize = async (marketName, amount, provider) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const inputAmount = units_1.parseEther(amount)
  const address = await utils_1.getSignerAddress(provider)
  const approvedAmount = await getApprovedAmountXAsset(
    marketName,
    address,
    provider
  )
  if (approvedAmount.lt(inputAmount)) {
    return Promise.reject(
      new Error('Please approve the tokens before adding collateral')
    )
  }
  return marketContract.collateralize(inputAmount)
}
exports.collateralize = collateralize
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
  const inputAmount = units_1.parseEther(amount)
  return marketContract.withdraw(inputAmount)
}
exports.withdrawCollateral = withdrawCollateral
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
// cSpell:disable
const approveXAAVEa = async (amount, provider) => {
  const network = await provider.getNetwork()
  const contract = new ethers_1.Contract(
    abis_1.ADDRESSES['X_AAVE_A'][network.chainId],
    abis_1.Abi.ERC20,
    provider
  )
  return contract.approve(
    abis_1.ADDRESSES[abis_1.LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}
exports.approveXAAVEa = approveXAAVEa
const approveXAAVEb = async (amount, provider) => {
  const network = await provider.getNetwork()
  const contract = new ethers_1.Contract(
    abis_1.ADDRESSES['X_AAVE_B'][network.chainId],
    abis_1.Abi.ERC20,
    provider
  )
  return contract.approve(
    abis_1.ADDRESSES[abis_1.LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}
exports.approveXAAVEb = approveXAAVEb
const approveXINCHa = async (amount, provider) => {
  const network = await provider.getNetwork()
  const contract = new ethers_1.Contract(
    abis_1.ADDRESSES['X_INCH_A'][network.chainId],
    abis_1.Abi.ERC20,
    provider
  )
  return contract.approve(
    abis_1.ADDRESSES[abis_1.LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}
exports.approveXINCHa = approveXINCHa
const approveXINCHb = async (amount, provider) => {
  const network = await provider.getNetwork()
  const contract = new ethers_1.Contract(
    abis_1.ADDRESSES['X_INCH_B'][network.chainId],
    abis_1.Abi.ERC20,
    provider
  )
  return contract.approve(
    abis_1.ADDRESSES[abis_1.LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}
exports.approveXINCHb = approveXINCHb
const approveXKNCa = async (amount, provider) => {
  const network = await provider.getNetwork()
  const contract = new ethers_1.Contract(
    abis_1.ADDRESSES['X_KNC_A'][network.chainId],
    abis_1.Abi.ERC20,
    provider
  )
  return contract.approve(
    abis_1.ADDRESSES[abis_1.LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}
exports.approveXKNCa = approveXKNCa
const approveXKNCb = async (amount, provider) => {
  const network = await provider.getNetwork()
  const contract = new ethers_1.Contract(
    abis_1.ADDRESSES['X_KNC_B'][network.chainId],
    abis_1.Abi.ERC20,
    provider
  )
  return contract.approve(
    abis_1.ADDRESSES[abis_1.LENDING_LIQUIDITY_POOL][network.chainId],
    amount
  )
}
exports.approveXKNCb = approveXKNCb
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQThEO0FBQzlELHVDQWdCcUI7QUFDckIsbUNBQTRDO0FBRTVDLCtDQUF3QztBQUV4QyxvQ0FBd0Q7QUFFeEQscUNBQTZDO0FBRTdDOzs7Ozs7R0FNRztBQUNJLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsVUFBMEIsRUFDMUIsTUFBYyxFQUNkLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLGVBQWUsR0FBRyxNQUFNLDJCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsRCxNQUFNLFdBQVcsR0FBRyxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RDLE1BQU0sT0FBTyxHQUFHLE1BQU0sd0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEQsTUFBTSxjQUFjLEdBQUcsTUFBTSx1QkFBdUIsQ0FDbEQsVUFBVSxFQUNWLE9BQU8sRUFDUCxRQUFRLENBQ1QsQ0FBQTtJQUNELElBQUksY0FBYyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNsQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ25CLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQ2hFLENBQUE7S0FDRjtJQUNELE9BQU8sY0FBYyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUNsRCxDQUFDLENBQUE7QUFwQlksUUFBQSxhQUFhLGlCQW9CekI7QUFFRDs7Ozs7O0dBTUc7QUFDSSxNQUFNLGtCQUFrQixHQUFHLEtBQUssRUFDckMsVUFBMEIsRUFDMUIsTUFBYyxFQUNkLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLGVBQWUsR0FBRyxNQUFNLDJCQUFrQixDQUFDLFFB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
