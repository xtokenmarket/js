import { formatEther } from '@ethersproject/units'
import {
  ADDRESSES,
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
import { Errors } from '../../constants'
import { getContract, getSignerAddress } from '../utils'
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
  if (!address) {
    address = await getSignerAddress(provider)
  }
  const collateral = await marketContract.collateral(address)
  return formatEther(collateral)
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
const getApprovedAmountXAsset = async (marketName, address, provider) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQ2xELE9BQU8sRUFDTCxTQUFTLEVBQ1Qsc0JBQXNCLEVBQ3RCLHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDdkIsdUJBQXVCLEVBQ3ZCLHVCQUF1QixFQUN2QixzQkFBc0IsRUFDdEIsc0JBQXNCLEVBQ3RCLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixPQUFPLEVBQ1AsT0FBTyxHQUNSLE1BQU0sY0FBYyxDQUFBO0FBR3JCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUV4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXhELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUU3Qzs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLFVBQTBCLEVBQzFCLFFBQXNCLEVBQ3RCLE9BQWdCLEVBQ2hCLEVBQUU7SUFDRixNQUFNLGVBQWUsR0FBRyxNQUFNLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDM0M7SUFDRCxNQUFNLGNBQWMsR0FBRyxNQUFNLGNBQWMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbkUsT0FBTyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBRUQ7Ozs7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
