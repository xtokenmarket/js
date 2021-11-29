import {
  LENDING_COMPTROLLER,
  LENDING_LINK_MARKET,
  LENDING_LINK_PRICE,
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
  const linkMarketContract = getContract(LENDING_LINK_MARKET, provider, network)
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
    !wethMarketContract ||
    !linkMarketContract
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
    [LENDING_LINK_MARKET]: linkMarketContract,
  }
}
export const getPricingContracts = async (provider) => {
  const network = await provider.getNetwork()
  const wbtcPriceContract = getContract(LENDING_WBTC_PRICE, provider, network)
  const wethPriceContract = getContract(LENDING_WETH_PRICE, provider, network)
  const linkPriceContract = getContract(LENDING_LINK_PRICE, provider, network)
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
    !wethPriceContract ||
    !linkPriceContract
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
    [LENDING_LINK_PRICE]: linkPriceContract,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLHNCQUFzQixFQUN0QixXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDbkIsa0JBQWtCLEdBYW5CLE1BQU0sY0FBYyxDQUFBO0FBRXJCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQVl4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXRDLE1BQU0sY0FBYyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0FBRXZFLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDckUsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDM0MsTUFBTSxtQkFBbUIsR0FBRyxXQUFXLENBQ3JDLG1CQUFtQixFQUNuQixRQUFRLEVBQ1IsT0FBTyxDQUNPLENBQUE7SUFDaEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1FBQ3hCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtLQUN0QztJQUNELE9BQU8sbUJBQW1CLENBQUE7QUFDNUIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUN2RSxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMzQyxNQUFNLHFCQUFxQixHQUFHLFdBQVcsQ0FDdkMsc0JBQXNCLEVBQ3RCLFFBQVEsRUFDUixPQUFPLENBQ1MsQ0FB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
