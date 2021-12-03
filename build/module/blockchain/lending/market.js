import { formatEther } from '@ethersproject/units'
import {
  ADDRESSES,
  LENDING_LINK_MARKET,
  LENDING_WBTC_MARKET,
  LENDING_WETH_MARKET,
  // LENDING_X_AAVE_A_MARKET,
  // LENDING_X_AAVE_B_MARKET,
  // LENDING_X_INCH_A_MARKET,
  LINK,
  WBTC,
  WETH,
} from '@xtoken/abis'
import { Errors } from '../../constants'
import { getTokenAllowance, getTokenBalance } from '../erc20'
import { getContract, getSignerAddress } from '../utils'
import { getMarketContracts } from './helper'
/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName Name of the market
 * @param address
 * @param provider
 * @returns
 */
export const getBorrowingLimit = async (marketName, address, provider) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const borrowingLimit = await marketContract.borrowingLimit(address)
  return formatEther(borrowingLimit)
}
/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName Name of the market
 * @param address
 * @param provider
 * @returns
 */
export const getCollateral = async (marketName, address, provider) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const collateral = await marketContract.collateral(address)
  return formatEther(collateral)
}
export const getCollateralCap = async (marketName, provider) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const collateralCap = await marketContract.getCollateralCap()
  return formatEther(collateralCap)
}
export const getLendingMarkets = async (address, provider) => {
  try {
    const { chainId } = await provider.getNetwork()
    const [
      wbtcLendingCollateral,
      wethLendingCollateral,
      linkLendingCollateral,
    ] = await Promise.all([
      getCollateral(LENDING_WBTC_MARKET, address, provider),
      getCollateral(LENDING_WETH_MARKET, address, provider),
      getCollateral(LENDING_LINK_MARKET, address, provider),
    ])
    const [
      wbtcLendingCollateralCap,
      wethLendingCollateralCap,
      linkLendingCollateralCap,
    ] = await Promise.all([
      getCollateralCap(LENDING_WBTC_MARKET, provider),
      getCollateralCap(LENDING_WETH_MARKET, provider),
      getCollateralCap(LENDING_LINK_MARKET, provider),
    ])
    const [
      wbtcLendingCollateralDeposited,
      wethLendingCollateralDeposited,
      linkLendingCollateralDeposited,
    ] = await Promise.all([
      getTokenBalance(WBTC, ADDRESSES[LENDING_WBTC_MARKET][chainId], provider),
      getTokenBalance(WETH, ADDRESSES[LENDING_WETH_MARKET][chainId], provider),
      getTokenBalance(LINK, ADDRESSES[LENDING_LINK_MARKET][chainId], provider),
    ])
    const [
      wbtcBorrowingLimit,
      wethBorrowingLimit,
      linkBorrowingLimit,
    ] = await Promise.all([
      getBorrowingLimit(LENDING_WBTC_MARKET, address, provider),
      getBorrowingLimit(LENDING_WETH_MARKET, address, provider),
      getBorrowingLimit(LENDING_LINK_MARKET, address, provider),
    ])
    const [wbtcBalance, wethBalance, linkBalance] = await Promise.all([
      getTokenBalance(WBTC, address, provider),
      getTokenBalance(WETH, address, provider),
      getTokenBalance(LINK, address, provider),
    ])
    const [wbtcAllowance, wethAllowance, linkAllowance] = await Promise.all([
      getTokenAllowance(
        WBTC,
        address,
        ADDRESSES[LENDING_WBTC_MARKET][chainId],
        provider
      ),
      getTokenAllowance(
        WETH,
        address,
        ADDRESSES[LENDING_WETH_MARKET][chainId],
        provider
      ),
      getTokenAllowance(
        LINK,
        address,
        ADDRESSES[LENDING_LINK_MARKET][chainId],
        provider
      ),
    ])
    return [
      {
        asset: WBTC,
        name: LENDING_WBTC_MARKET,
        collateral: wbtcLendingCollateral,
        tokenAllowance: wbtcAllowance,
        tokenBalance: wbtcBalance,
        value: wbtcBorrowingLimit,
        collateralDeposited: wbtcLendingCollateralDeposited,
        collateralCap: wbtcLendingCollateralCap,
      },
      {
        asset: WETH,
        name: LENDING_WETH_MARKET,
        collateral: wethLendingCollateral,
        tokenAllowance: wethAllowance,
        tokenBalance: wethBalance,
        value: wethBorrowingLimit,
        collateralDeposited: wethLendingCollateralDeposited,
        collateralCap: wethLendingCollateralCap,
      },
      {
        asset: LINK,
        name: LENDING_LINK_MARKET,
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
/**
 * Add xAsset collateral to a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export const supplyCollateral = async (marketName, amount, provider) => {
  const [address, marketContracts] = await Promise.all([
    getSignerAddress(provider),
    getMarketContracts(provider),
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
/**
 * Withdraw xAsset collateral from a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export const withdrawCollateral = async (marketName, amount, provider) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  return marketContract.withdraw(amount)
}
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
    case LENDING_WBTC_MARKET:
      tokenContract = getContract(WBTC, provider, network)
      break
    case LENDING_WETH_MARKET:
      tokenContract = getContract(WETH, provider, network)
      break
    case LENDING_LINK_MARKET:
      tokenContract = getContract(LINK, provider, network)
      break
  }
  if (!tokenContract) {
    return Promise.reject(new Error(Errors.CONTRACT_INITIALIZATION_FAILED))
  }
  return tokenContract.allowance(
    address,
    ADDRESSES[marketName][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQ2xELE9BQU8sRUFDTCxTQUFTLEVBQ1QsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixtQkFBbUI7QUFDbkIsMkJBQTJCO0FBQzNCLDJCQUEyQjtBQUMzQiwyQkFBMkI7QUFDM0IsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEdBVUwsTUFBTSxjQUFjLENBQUE7QUFHckIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRXhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFN0M7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUNwQyxVQUEwQixFQUMxQixPQUFlLEVBQ2YsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sY0FBYyxHQUFHLE1BQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuRSxPQUFPLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUE7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxVQUEwQixFQUMxQixPQUFlLEVBQ2Ys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
