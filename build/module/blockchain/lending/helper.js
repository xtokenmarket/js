import {
  LENDING_COMPTROLLER,
  LENDING_LIQUIDITY_POOL,
  LENDING_LPT,
  LENDING_WBTC_MARKET,
  LENDING_WBTC_PRICE,
  LENDING_WETH_MARKET,
  LENDING_WETH_PRICE,
} from '@xtoken/abis'
import { Errors } from '../../constants'
import { getContract } from '../utils'
const CONTRACT_ERROR = new Error(Errors.CONTRACT_INITIALIZATION_FAILED)
export const getComptrollerContract = async (provider) => {
  const network = await provider.getNetwork()
  const comptrollerContract = getContract(
    LENDING_COMPTROLLER,
    provider,
    network
  )
  if (!comptrollerContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return comptrollerContract
}
export const getLiquidityPoolContract = async (provider) => {
  const network = await provider.getNetwork()
  const liquidityPoolContract = getContract(
    LENDING_LIQUIDITY_POOL,
    provider,
    network
  )
  if (!liquidityPoolContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return liquidityPoolContract
}
export const getLPTContract = async (provider) => {
  const network = await provider.getNetwork()
  const lptContract = getContract(LENDING_LPT, provider, network)
  if (!lptContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return lptContract
}
export const getMarketContracts = async (provider) => {
  const network = await provider.getNetwork()
  const wbtcMarketContract = getContract(LENDING_WBTC_MARKET, provider, network)
  const wethMarketContract = getContract(LENDING_WETH_MARKET, provider, network)
  // xAAVE Market Contracts
  /*const xAAVEaMarketContract = getContract(
      LENDING_X_AAVE_A_MARKET,
      provider,
      network
    ) as Market
    const xAAVEbMarketContract = getContract(
      LENDING_X_AAVE_B_MARKET,
      provider,
      network
    ) as Market
  
    // xINCH Market Contracts
    const xINCHaMarketContract = getContract(
      LENDING_X_INCH_A_MARKET,
      provider,
      network
    ) as Market
    const xINCHbMarketContract = getContract(
      LENDING_X_INCH_B_MARKET,
      provider,
      network
    ) as Market
  
    // xKNC Market Contracts
    const xKNCaMarketContract = getContract(
      LENDING_X_KNC_A_MARKET,
      provider,
      network
    ) as Market
    const xKNCbMarketContract = getContract(
      LENDING_X_KNC_B_MARKET,
      provider,
      network
    ) as Market*/
  if (
    !wbtcMarketContract ||
    !wethMarketContract
    // !xAAVEaMarketContract ||
    // !xAAVEbMarketContract ||
    // !xINCHaMarketContract
    // !xINCHbMarketContract ||
    // !xKNCaMarketContract ||
    // !xKNCbMarketContract
  ) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return {
    [LENDING_WBTC_MARKET]: wbtcMarketContract,
    [LENDING_WETH_MARKET]: wethMarketContract,
  }
}
export const getPricingContracts = async (provider) => {
  const network = await provider.getNetwork()
  const wbtcPriceContract = getContract(LENDING_WBTC_PRICE, provider, network)
  const wethPriceContract = getContract(LENDING_WETH_PRICE, provider, network)
  /*// xAAVE Price Contracts
    const xAAVEaPriceContract = getContract(
      LENDING_X_AAVE_A_PRICE,
      provider,
      network
    ) as XAAVEPrice
    const xAAVEbPriceContract = getContract(
      LENDING_X_AAVE_B_PRICE,
      provider,
      network
    ) as XAAVEPrice
  
    // xINCH Price Contracts
    const xINCHaPriceContract = getContract(
      LENDING_X_INCH_A_PRICE,
      provider,
      network
    ) as XINCHPrice
    const xINCHbPriceContract = getContract(
      LENDING_X_INCH_B_PRICE,
      provider,
      network
    ) as XINCHPrice
  
    // xKNC Price Contracts
    const xKNCaPriceContract = getContract(
      LENDING_X_KNC_A_PRICE,
      provider,
      network
    ) as XKNCPrice
    const xKNCbPriceContract = getContract(
      LENDING_X_KNC_B_PRICE,
      provider,
      network
    ) as XKNCPrice*/
  if (
    !wbtcPriceContract ||
    !wethPriceContract
    // !xAAVEaPriceContract ||
    // !xAAVEbPriceContract ||
    // !xINCHaPriceContract ||
    // !xINCHbPriceContract ||
    // !xKNCaPriceContract ||
    // !xKNCbPriceContract
  ) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return {
    [LENDING_WBTC_PRICE]: wbtcPriceContract,
    [LENDING_WETH_PRICE]: wethPriceContract,
  }
}
export const getLendingContracts = async (provider) => {
  const [
    comptrollerContract,
    liquidityPoolContract,
    lptContract,
    marketContracts,
    pricingContracts,
  ] = await Promise.all([
    getComptrollerContract(provider),
    getLiquidityPoolContract(provider),
    getLPTContract(provider),
    getMarketContracts(provider),
    getPricingContracts(provider),
  ])
  return {
    comptrollerContract,
    liquidityPoolContract,
    lptContract,
    marketContracts,
    pricingContracts,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixzQkFBc0IsRUFDdEIsV0FBVyxFQUNYLG1CQUFtQixFQUNuQixrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLGtCQUFrQixHQWFuQixNQUFNLGNBQWMsQ0FBQTtBQUVyQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFZeEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV0QyxNQUFNLGNBQWMsR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQTtBQUV2RSxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLEVBQUUsUUFBc0IsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQzNDLE1BQU0sbUJBQW1CLEdBQUcsV0FBVyxDQUNyQyxtQkFBbUIsRUFDbkIsUUFBUSxFQUNSLE9BQU8sQ0FDTyxDQUFBO0lBQ2hCLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtRQUN4QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUE7S0FDdEM7SUFDRCxPQUFPLG1CQUFtQixDQUFBO0FBQzVCLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDdkUsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDM0MsTUFBTSxxQkFBcUIsR0FBRyxXQUFXLENBQ3ZDLHNCQUFzQixFQUN0QixRQUFRLEVBQ1IsT0FBTyxDQUNTLENBQUE7SUFDbEIsSUFBSSxDQUFDLHFCQUFxQixF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
