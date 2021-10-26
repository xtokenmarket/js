import { formatEther } from '@ethersproject/units'
import {
  ADDRESSES,
  // KNC,
  KYBER_PROXY,
  LENDING_LIQUIDITY_POOL,
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
import { parseEther } from 'ethers/lib/utils'
import { DEC_18, Errors } from '../../constants'
import { getTokenBalance } from '../erc20'
import { getContract, getSignerAddress } from '../utils'
// import { getXAavePrices } from '../xaave'
import { getXInchPrices } from '../xinch'
// import { getXKncPrices } from '../xknc'
import { getMarketContracts } from './helper'
/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
export const getBorrowingLimit = async (marketName, provider, address) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  if (!address) {
    address = await getSignerAddress(provider)
  }
  const borrowingLimit = await marketContract.borrowingLimit(address)
  return formatEther(borrowingLimit)
}
/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
export const getCollateral = async (marketName, provider, address) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const collateral = await marketContract.collateral(address)
  return formatEther(collateral)
}
// TODO: Refactor to leverage `getXAssetPrices()` utils method
export const getLendingMarkets = async (provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  // const kncContract = getContract(KNC, provider, network) as Contract
  const kyberProxyContract = getContract(KYBER_PROXY, provider, network)
  // xAAVE
  // const xaaveaContract = getContract(X_AAVE_A, provider, network) as XAAVE
  // const xaavebContract = getContract(X_AAVE_B, provider, network) as XAAVE
  // xINCH
  const xinchaContract = getContract(X_INCH_A, provider, network)
  // const xinchbContract = getContract(X_INCH_B, provider, network) as XINCH
  // xKNC
  // const xkncaContract = getContract(X_KNC_A, provider, network) as XKNC
  // const xkncbContract = getContract(X_KNC_B, provider, network) as XKNC
  try {
    const [
      // xaaveaPrices,
      // xaavebPrices,
      xinchaPrices,
    ] = await Promise.all([
      // getXAavePrices(xaaveaContract, kyberProxyContract, chainId),
      // getXAavePrices(xaavebContract, kyberProxyContract, chainId),
      getXInchPrices(xinchaContract, kyberProxyContract, chainId),
    ])
    const [
      // xaaveaLendingCollateral,
      // xaavebLendingCollateral,
      xinchaLendingCollateral,
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
      getTokenBalance(
        X_INCH_A,
        ADDRESSES[LENDING_X_INCH_A_MARKET][chainId],
        provider
      ),
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
        value: formatEther(
          parseEther(xinchaLendingCollateral)
            .mul(parseEther(xinchaPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
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
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const address = await getSignerAddress(provider)
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
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQ2xELE9BQU8sRUFDTCxTQUFTO0FBQ1QsT0FBTztBQUNQLFdBQVcsRUFDWCxzQkFBc0I7QUFDdEIsMkJBQTJCO0FBQzNCLDJCQUEyQjtBQUMzQix1QkFBdUI7QUFDdkIsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsWUFBWTtBQUNaLFlBQVk7QUFDWixRQUFRLEdBSVQsTUFBTSxjQUFjLENBQUE7QUFFckIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRTdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ3hELDRDQUE0QztBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ3pDLDBDQUEwQztBQUUxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFN0M7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUNwQyxVQUEwQixFQUMxQixRQUFzQixFQUN0QixPQUFnQixFQUNoQixFQUFFO0lBQ0YsTUFBTSxlQUFlLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sR0FBRyxNQUFNLGdC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
