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
    const [
      wbtcLendingCollateral,
      wethLendingCollateral,
      linkLendingCollateral,
    ] = await Promise.all([
      exports.getCollateral(abis_1.LENDING_WBTC_MARKET, address, provider),
      exports.getCollateral(abis_1.LENDING_WETH_MARKET, address, provider),
      exports.getCollateral(abis_1.LENDING_LINK_MARKET, address, provider),
    ])
    const [
      wbtcBorrowingLimit,
      wethBorrowingLimit,
      linkBorrowingLimit,
    ] = await Promise.all([
      exports.getBorrowingLimit(abis_1.LENDING_WBTC_MARKET, address, provider),
      exports.getBorrowingLimit(abis_1.LENDING_WETH_MARKET, address, provider),
      exports.getBorrowingLimit(abis_1.LENDING_LINK_MARKET, address, provider),
    ])
    const [wbtcBalance, wethBalance, linkBalance] = await Promise.all([
      erc20_1.getTokenBalance(abis_1.WBTC, address, provider),
      erc20_1.getTokenBalance(abis_1.WETH, address, provider),
      erc20_1.getTokenBalance(abis_1.LINK, address, provider),
    ])
    const [wbtcAllowance, wethAllowance, linkAllowance] = await Promise.all([
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
      erc20_1.getTokenAllowance(
        abis_1.LINK,
        address,
        abis_1.ADDRESSES[abis_1.LENDING_LINK_MARKET][chainId],
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
      {
        asset: abis_1.LINK,
        name: abis_1.LENDING_LINK_MARKET,
        collateral: linkLendingCollateral,
        tokenAllowance: linkAllowance,
        tokenBalance: linkBalance,
        value: linkBorrowingLimit,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQWtEO0FBQ2xELHVDQW9CcUI7QUFHckIsK0NBQXdDO0FBRXhDLG9DQUE2RDtBQUM3RCxvQ0FBd0Q7QUFFeEQscUNBQTZDO0FBRTdDOzs7Ozs7R0FNRztBQUNJLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUNwQyxVQUEwQixFQUMxQixPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sY0FBYyxHQUFHLE1BQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuRSxPQUFPLG1CQUFXLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBVFksUUFBQSxpQkFBaUIscUJBUzdCO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxVQUEwQixFQUMxQixPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMzRCxPQUFPLG1CQUFXLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBO0FBVFksUUFBQSxhQUFhLGlCQVN6QjtBQUVNLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUNwQyxPQUFlLEVBQ2YsUUFB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
