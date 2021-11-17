'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.withdrawCollateral = exports.supplyCollateral = exports.getLendingMarkets = exports.getCollateral = exports.getBorrowingLimit = void 0
const units_1 = require('@ethersproject/units')
const abis_1 = require('@xtoken/abis')
const constants_1 = require('../../constants')
const erc20_1 = require('../erc20')
const utils_1 = require('../utils')
const helper_1 = require('./helper')
/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName Name of the market
 * @param address
 * @param provider
 * @returns
 */
const getBorrowingLimit = async (marketName, address, provider) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const borrowingLimit = await marketContract.borrowingLimit(address)
  return units_1.formatEther(borrowingLimit)
}
exports.getBorrowingLimit = getBorrowingLimit
/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName Name of the market
 * @param address
 * @param provider
 * @returns
 */
const getCollateral = async (marketName, address, provider) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const collateral = await marketContract.collateral(address)
  return units_1.formatEther(collateral)
}
exports.getCollateral = getCollateral
const getLendingMarkets = async (address, provider) => {
  try {
    const { chainId } = await provider.getNetwork()
    const [wbtcLendingCollateral, wethLendingCollateral] = await Promise.all([
      exports.getCollateral(abis_1.LENDING_WBTC_MARKET, address, provider),
      exports.getCollateral(abis_1.LENDING_WETH_MARKET, address, provider),
    ])
    const [wbtcBorrowingLimit, wethBorrowingLimit] = await Promise.all([
      exports.getBorrowingLimit(abis_1.LENDING_WBTC_MARKET, address, provider),
      exports.getBorrowingLimit(abis_1.LENDING_WETH_MARKET, address, provider),
    ])
    const [wbtcBalance, wethBalance] = await Promise.all([
      erc20_1.getTokenBalance(abis_1.WBTC, address, provider),
      erc20_1.getTokenBalance(abis_1.WETH, address, provider),
    ])
    const [wbtcAllowance, wethAllowance] = await Promise.all([
      erc20_1.getTokenAllowance(
        abis_1.WBTC,
        address,
        abis_1.ADDRESSES[abis_1.LENDING_WBTC_MARKET][chainId],
        provider
      ),
      erc20_1.getTokenAllowance(
        abis_1.WETH,
        address,
        abis_1.ADDRESSES[abis_1.LENDING_WETH_MARKET][chainId],
        provider
      ),
    ])
    return [
      {
        asset: abis_1.WBTC,
        name: abis_1.LENDING_WBTC_MARKET,
        collateral: wbtcLendingCollateral,
        tokenAllowance: wbtcAllowance,
        tokenBalance: wbtcBalance,
        value: wbtcBorrowingLimit,
      },
      {
        asset: abis_1.WETH,
        name: abis_1.LENDING_WETH_MARKET,
        collateral: wethLendingCollateral,
        tokenAllowance: wethAllowance,
        tokenBalance: wethBalance,
        value: wethBorrowingLimit,
      },
    ]
  } catch (e) {
    console.warn('Error while fetching lending markets', e)
    return Promise.reject(new Error('Error while fetching lending markets'))
  }
}
exports.getLendingMarkets = getLendingMarkets
/**
 * Add xAsset collateral to a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
const supplyCollateral = async (marketName, amount, provider) => {
  const [address, marketContracts] = await Promise.all([
    utils_1.getSignerAddress(provider),
    helper_1.getMarketContracts(provider),
  ])
  const marketContract = marketContracts[marketName]
  const approvedAmount = await _getApprovedAmount(marketName, address, provider)
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
const _getApprovedAmount = async (marketName, address, provider) => {
  const network = await provider.getNetwork()
  let tokenContract
  switch (marketName) {
    /*case LENDING_X_AAVE_A_MARKET:
          tokenContract = getContract(X_AAVE_A, provider, network)
          break
        case LENDING_X_AAVE_B_MARKET:
          tokenContract = getContract(X_AAVE_B, provider, network)
          break
        case LENDING_X_INCH_A_MARKET:
          tokenContract = getContract(X_INCH_A, provider, network)
          break
        case LENDING_X_INCH_B_MARKET:
          tokenContract = getContract(X_INCH_B, provider, network)
          break
        case LENDING_X_KNC_A_MARKET:
          tokenContract = getContract(X_KNC_A, provider, network)
          break
        case LENDING_X_KNC_B_MARKET:
          tokenContract = getContract(X_KNC_B, provider, network)*/
    case abis_1.LENDING_WBTC_MARKET:
      tokenContract = utils_1.getContract(abis_1.WBTC, provider, network)
      break
    case abis_1.LENDING_WETH_MARKET:
      tokenContract = utils_1.getContract(abis_1.WETH, provider, network)
      break
  }
  if (!tokenContract) {
    return Promise.reject(
      new Error(constants_1.Errors.CONTRACT_INITIALIZATION_FAILED)
    )
  }
  return tokenContract.allowance(
    address,
    abis_1.ADDRESSES[marketName][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQWtEO0FBQ2xELHVDQWtCcUI7QUFHckIsK0NBQXdDO0FBRXhDLG9DQUE2RDtBQUM3RCxvQ0FBd0Q7QUFFeEQscUNBQTZDO0FBRTdDOzs7Ozs7R0FNRztBQUNJLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUNwQyxVQUEwQixFQUMxQixPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sY0FBYyxHQUFHLE1BQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuRSxPQUFPLG1CQUFXLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBVFksUUFBQSxpQkFBaUIscUJBUzdCO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxVQUEwQixFQUMxQixPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMzRCxPQUFPLG1CQUFXLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBO0FBVFksUUFBQSxhQUFhLGlCQVN6QjtBQUVNLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUNwQyxPQUFlLEVBQ2YsUUFB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
