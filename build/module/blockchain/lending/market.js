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
      },
      {
        asset: WETH,
        name: LENDING_WETH_MARKET,
        collateral: wethLendingCollateral,
        tokenAllowance: wethAllowance,
        tokenBalance: wethBalance,
        value: wethBorrowingLimit,
      },
      {
        asset: LINK,
        name: LENDING_LINK_MARKET,
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
