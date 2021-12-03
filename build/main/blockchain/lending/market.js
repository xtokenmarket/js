'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.withdrawCollateral = exports.supplyCollateral = exports.getLendingMarkets = exports.getCollateralCap = exports.getCollateral = exports.getBorrowingLimit = void 0
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
const getCollateralCap = async (marketName, provider) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const collateralCap = await marketContract.getCollateralCap()
  return units_1.formatEther(collateralCap)
}
exports.getCollateralCap = getCollateralCap
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
      wbtcLendingCollateralCap,
      wethLendingCollateralCap,
      linkLendingCollateralCap,
    ] = await Promise.all([
      exports.getCollateralCap(abis_1.LENDING_WBTC_MARKET, provider),
      exports.getCollateralCap(abis_1.LENDING_WETH_MARKET, provider),
      exports.getCollateralCap(abis_1.LENDING_LINK_MARKET, provider),
    ])
    const [
      wbtcLendingCollateralDeposited,
      wethLendingCollateralDeposited,
      linkLendingCollateralDeposited,
    ] = await Promise.all([
      erc20_1.getTokenBalance(
        abis_1.WBTC,
        abis_1.ADDRESSES[abis_1.LENDING_WBTC_MARKET][chainId],
        provider
      ),
      erc20_1.getTokenBalance(
        abis_1.WETH,
        abis_1.ADDRESSES[abis_1.LENDING_WETH_MARKET][chainId],
        provider
      ),
      erc20_1.getTokenBalance(
        abis_1.LINK,
        abis_1.ADDRESSES[abis_1.LENDING_LINK_MARKET][chainId],
        provider
      ),
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
        collateralDeposited: wbtcLendingCollateralDeposited,
        collateralCap: wbtcLendingCollateralCap,
      },
      {
        asset: abis_1.WETH,
        name: abis_1.LENDING_WETH_MARKET,
        collateral: wethLendingCollateral,
        tokenAllowance: wethAllowance,
        tokenBalance: wethBalance,
        value: wethBorrowingLimit,
        collateralDeposited: wethLendingCollateralDeposited,
        collateralCap: wethLendingCollateralCap,
      },
      {
        asset: abis_1.LINK,
        name: abis_1.LENDING_LINK_MARKET,
        collateral: linkLendingCollateral,
        tokenAllowance: linkAllowance,
        tokenBalance: linkBalance,
        value: linkBorrowingLimit,
        collateralDeposited: linkLendingCollateralDeposited,
        collateralCap: linkLendingCollateralCap,
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
    case abis_1.LENDING_LINK_MARKET:
      tokenContract = utils_1.getContract(abis_1.LINK, provider, network)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQWtEO0FBQ2xELHVDQW9CcUI7QUFHckIsK0NBQXdDO0FBRXhDLG9DQUE2RDtBQUM3RCxvQ0FBd0Q7QUFFeEQscUNBQTZDO0FBRTdDOzs7Ozs7R0FNRztBQUNJLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUNwQyxVQUEwQixFQUMxQixPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sY0FBYyxHQUFHLE1BQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuRSxPQUFPLG1CQUFXLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBVFksUUFBQSxpQkFBaUIscUJBUzdCO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxVQUEwQixFQUMxQixPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMzRCxPQUFPLG1CQUFXLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBO0FBVFksUUFBQSxhQUFhLGlCQVN6QjtBQUVNLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUNuQyxVQUEwQixFQUMxQixR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
