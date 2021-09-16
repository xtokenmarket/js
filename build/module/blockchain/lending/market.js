import { formatEther } from '@ethersproject/units'
import {
  ADDRESSES,
  KNC,
  KYBER_PROXY,
  LENDING_LIQUIDITY_POOL,
  LENDING_X_AAVE_A_MARKET,
  LENDING_X_AAVE_B_MARKET,
  LENDING_X_INCH_A_MARKET,
  LENDING_X_INCH_B_MARKET,
  LENDING_X_KNC_A_MARKET,
  LENDING_X_KNC_B_MARKET,
  X_AAVE_A,
  X_AAVE_B,
  X_INCH_A,
  X_INCH_B,
  X_KNC_A,
  X_KNC_B,
} from '@xtoken/abis'
import { parseEther } from 'ethers/lib/utils'
import { DEC_18, Errors } from '../../constants'
import { getTokenBalance } from '../erc20'
import { getContract, getSignerAddress } from '../utils'
import { getXAavePrices } from '../xaave'
import { getXInchPrices } from '../xinch'
import { getXKncPrices } from '../xknc'
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
  const kncContract = getContract(KNC, provider, network)
  const kyberProxyContract = getContract(KYBER_PROXY, provider, network)
  // xAAVE
  const xaaveaContract = getContract(X_AAVE_A, provider, network)
  const xaavebContract = getContract(X_AAVE_B, provider, network)
  // xINCH
  const xinchaContract = getContract(X_INCH_A, provider, network)
  const xinchbContract = getContract(X_INCH_B, provider, network)
  // xKNC
  const xkncaContract = getContract(X_KNC_A, provider, network)
  const xkncbContract = getContract(X_KNC_B, provider, network)
  try {
    const [
      xaaveaPrices,
      xaavebPrices,
      xinchaPrices,
      xinchbPrices,
      xkncaPrices,
      xkncbPrices,
    ] = await Promise.all([
      getXAavePrices(xaaveaContract, kyberProxyContract, chainId),
      getXAavePrices(xaavebContract, kyberProxyContract, chainId),
      getXInchPrices(xinchaContract, kyberProxyContract, chainId),
      getXInchPrices(xinchbContract, kyberProxyContract, chainId),
      getXKncPrices(xkncaContract, kncContract, kyberProxyContract),
      getXKncPrices(xkncbContract, kncContract, kyberProxyContract),
    ])
    const [
      xaaveaLendingCollateral,
      xaavebLendingCollateral,
      xinchaLendingCollateral,
      xinchbLendingCollateral,
      xkncaLendingCollateral,
      xkncbLendingCollateral,
    ] = await Promise.all([
      getTokenBalance(
        X_AAVE_A,
        ADDRESSES[LENDING_X_AAVE_A_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_AAVE_B,
        ADDRESSES[LENDING_X_AAVE_B_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_INCH_A,
        ADDRESSES[LENDING_X_INCH_A_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_INCH_B,
        ADDRESSES[LENDING_X_INCH_B_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_KNC_A,
        ADDRESSES[LENDING_X_KNC_A_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_KNC_B,
        ADDRESSES[LENDING_X_KNC_B_MARKET][chainId],
        provider
      ),
    ])
    return [
      {
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
      },
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
      {
        name: LENDING_X_INCH_B_MARKET,
        xAsset: X_INCH_B,
        collateral: xinchbLendingCollateral,
        value: formatEther(
          parseEther(xinchbLendingCollateral)
            .mul(parseEther(xinchbPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
      {
        name: LENDING_X_KNC_A_MARKET,
        xAsset: X_KNC_A,
        collateral: xkncaLendingCollateral,
        value: formatEther(
          parseEther(xkncaLendingCollateral)
            .mul(parseEther(xkncaPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
      {
        name: LENDING_X_KNC_B_MARKET,
        xAsset: X_KNC_B,
        collateral: xkncbLendingCollateral,
        value: formatEther(
          parseEther(xkncbLendingCollateral)
            .mul(parseEther(xkncbPrices.priceUsd.toString()))
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
    case LENDING_X_AAVE_A_MARKET:
      xTokenContract = getContract(X_AAVE_A, provider, network)
      break
    case LENDING_X_AAVE_B_MARKET:
      xTokenContract = getContract(X_AAVE_B, provider, network)
      break
    case LENDING_X_INCH_A_MARKET:
      xTokenContract = getContract(X_INCH_A, provider, network)
      break
    case LENDING_X_INCH_B_MARKET:
      xTokenContract = getContract(X_INCH_B, provider, network)
      break
    case LENDING_X_KNC_A_MARKET:
      xTokenContract = getContract(X_KNC_A, provider, network)
      break
    case LENDING_X_KNC_B_MARKET:
      xTokenContract = getContract(X_KNC_B, provider, network)
  }
  if (!xTokenContract) {
    return Promise.reject(new Error(Errors.CONTRACT_INITIALIZATION_FAILED))
  }
  return xTokenContract.allowance(
    address,
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQ2xELE9BQU8sRUFDTCxTQUFTLEVBQ1QsR0FBRyxFQUNILFdBQVcsRUFDWCxzQkFBc0IsRUFDdEIsdUJBQXVCLEVBQ3ZCLHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDdkIsdUJBQXVCLEVBQ3ZCLHNCQUFzQixFQUN0QixzQkFBc0IsRUFDdEIsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLE9BQU8sRUFDUCxPQUFPLEdBQ1IsTUFBTSxjQUFjLENBQUE7QUFFckIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRTdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUU3Qzs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLFVBQTBCLEVBQzFCLFFBQXNCLEVBQ3RCLE9BQWdCLEVBQ2hCLEVBQUU7SUFDRixNQUFNLGVBQWUsR0FBRyxNQUFNLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELE1B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
