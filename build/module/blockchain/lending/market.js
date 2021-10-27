import { formatEther } from '@ethersproject/units'
import {
  ADDRESSES,
  // LENDING_X_AAVE_A_MARKET,
  // LENDING_X_AAVE_B_MARKET,
  LENDING_X_INCH_A_MARKET,
  // LENDING_X_INCH_B_MARKET,
  // LENDING_X_KNC_A_MARKET,
  // LENDING_X_KNC_B_MARKET,
  // X_AAVE_A,
  // X_AAVE_B,
  X_INCH_A,
} from '@xtoken/abis'
import { Errors } from '../../constants'
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
    const [
      // xaaveaPrices,
      // xaavebPrices,
      xinchaLendingCollateral,
    ] = await Promise.all([
      // getXAavePrices(xaaveaContract, kyberProxyContract, chainId),
      // getXAavePrices(xaavebContract, kyberProxyContract, chainId),
      getCollateral(LENDING_X_INCH_A_MARKET, address, provider),
    ])
    const [
      // xaaveaLendingCollateral,
      // xaavebLendingCollateral,
      xinchaBorrowingLimit,
    ] = await Promise.all([
      /* getTokenBalance(
              X_AAVE_A,
              ADDRESSES[LENDING_X_AAVE_A_MARKET][chainId],
              provider
            ),
            getTokenBalance(
              X_AAVE_B,
              ADDRESSES[LENDING_X_AAVE_B_MARKET][chainId],
              provider
            ),*/
      getBorrowingLimit(LENDING_X_INCH_A_MARKET, address, provider),
    ])
    return [
      /*{
              name: LENDING_X_AAVE_A_MARKET,
              xAsset: X_AAVE_A,
              collateral: xaaveaLendingCollateral,
              value: formatEther(
                parseEther(xaaveaLendingCollateral)
                  .mul(parseEther(xaaveaPrices.priceUsd.toString()))
                  .div(DEC_18)
              ),
            },
            {
              name: LENDING_X_AAVE_B_MARKET,
              xAsset: X_AAVE_B,
              collateral: xaavebLendingCollateral,
              value: formatEther(
                parseEther(xaavebLendingCollateral)
                  .mul(parseEther(xaavebPrices.priceUsd.toString()))
                  .div(DEC_18)
              ),
            },*/
      {
        name: LENDING_X_INCH_A_MARKET,
        xAsset: X_INCH_A,
        collateral: xinchaLendingCollateral,
        value: xinchaBorrowingLimit,
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
  let xTokenContract
  switch (marketName) {
    /*case LENDING_X_AAVE_A_MARKET:
          xTokenContract = getContract(X_AAVE_A, provider, network)
          break
        case LENDING_X_AAVE_B_MARKET:
          xTokenContract = getContract(X_AAVE_B, provider, network)
          break*/
    case LENDING_X_INCH_A_MARKET:
      xTokenContract = getContract(X_INCH_A, provider, network)
      break
    /*case LENDING_X_INCH_B_MARKET:
          xTokenContract = getContract(X_INCH_B, provider, network)
          break
        case LENDING_X_KNC_A_MARKET:
          xTokenContract = getContract(X_KNC_A, provider, network)
          break
        case LENDING_X_KNC_B_MARKET:
          xTokenContract = getContract(X_KNC_B, provider, network)*/
  }
  if (!xTokenContract) {
    return Promise.reject(new Error(Errors.CONTRACT_INITIALIZATION_FAILED))
  }
  return xTokenContract.allowance(
    address,
    ADDRESSES[marketName][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQ2xELE9BQU8sRUFDTCxTQUFTO0FBQ1QsMkJBQTJCO0FBQzNCLDJCQUEyQjtBQUMzQix1QkFBdUI7QUFDdkIsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsWUFBWTtBQUNaLFlBQVk7QUFDWixRQUFRLEdBSVQsTUFBTSxjQUFjLENBQUE7QUFHckIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRXhDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRTdDOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsVUFBMEIsRUFDMUIsT0FBZSxFQUNmLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLGVBQWUsR0FBRyxNQUFNLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsRCxNQUFNLGNBQWMsR0FBRyxNQUFNLGNBQWMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbkUsT0FBTyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsVUFBMEIsRUFDMUIsT0FBZSxFQUNmLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLGVBQWUsR0FBRyxNQUFNLGtCQUFrQixDQUFD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
