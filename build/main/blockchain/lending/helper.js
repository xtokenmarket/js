'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getLendingContracts = exports.getPricingContracts = exports.getMarketContracts = exports.getLPTContract = exports.getLiquidityPoolContract = exports.getComptrollerContract = void 0
const abis_1 = require('@xtoken/abis')
const constants_1 = require('../../constants')
const utils_1 = require('../utils')
const CONTRACT_ERROR = new Error(
  constants_1.Errors.CONTRACT_INITIALIZATION_FAILED
)
const getComptrollerContract = async (provider) => {
  const network = await provider.getNetwork()
  const comptrollerContract = utils_1.getContract(
    abis_1.LENDING_COMPTROLLER,
    provider,
    network
  )
  if (!comptrollerContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return comptrollerContract
}
exports.getComptrollerContract = getComptrollerContract
const getLiquidityPoolContract = async (provider) => {
  const network = await provider.getNetwork()
  const liquidityPoolContract = utils_1.getContract(
    abis_1.LENDING_LIQUIDITY_POOL,
    provider,
    network
  )
  if (!liquidityPoolContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return liquidityPoolContract
}
exports.getLiquidityPoolContract = getLiquidityPoolContract
const getLPTContract = async (provider) => {
  const network = await provider.getNetwork()
  const lptContract = utils_1.getContract(abis_1.LENDING_LPT, provider, network)
  if (!lptContract) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return lptContract
}
exports.getLPTContract = getLPTContract
const getMarketContracts = async (provider) => {
  const network = await provider.getNetwork()
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
    ) as Market*/
  // xINCH Market Contracts
  const xINCHaMarketContract = utils_1.getContract(
    abis_1.LENDING_X_INCH_A_MARKET,
    provider,
    network
  )
  /*const xINCHbMarketContract = getContract(
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
    // !xAAVEaMarketContract ||
    // !xAAVEbMarketContract ||
    !xINCHaMarketContract
    // !xINCHbMarketContract ||
    // !xKNCaMarketContract ||
    // !xKNCbMarketContract
  ) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return {
    // [LENDING_X_AAVE_A_MARKET]: xAAVEaMarketContract,
    // [LENDING_X_AAVE_B_MARKET]: xAAVEbMarketContract,
    [abis_1.LENDING_X_INCH_A_MARKET]: xINCHaMarketContract,
  }
}
exports.getMarketContracts = getMarketContracts
const getPricingContracts = async (provider) => {
  const network = await provider.getNetwork()
  // xAAVE Price Contracts
  const xAAVEaPriceContract = utils_1.getContract(
    abis_1.LENDING_X_AAVE_A_PRICE,
    provider,
    network
  )
  const xAAVEbPriceContract = utils_1.getContract(
    abis_1.LENDING_X_AAVE_B_PRICE,
    provider,
    network
  )
  // xINCH Price Contracts
  const xINCHaPriceContract = utils_1.getContract(
    abis_1.LENDING_X_INCH_A_PRICE,
    provider,
    network
  )
  const xINCHbPriceContract = utils_1.getContract(
    abis_1.LENDING_X_INCH_B_PRICE,
    provider,
    network
  )
  // xKNC Price Contracts
  const xKNCaPriceContract = utils_1.getContract(
    abis_1.LENDING_X_KNC_A_PRICE,
    provider,
    network
  )
  const xKNCbPriceContract = utils_1.getContract(
    abis_1.LENDING_X_KNC_B_PRICE,
    provider,
    network
  )
  if (
    !xAAVEaPriceContract ||
    !xAAVEbPriceContract ||
    !xINCHaPriceContract ||
    !xINCHbPriceContract ||
    !xKNCaPriceContract ||
    !xKNCbPriceContract
  ) {
    return Promise.reject(CONTRACT_ERROR)
  }
  return {
    [abis_1.LENDING_X_AAVE_A_PRICE]: xAAVEaPriceContract,
    [abis_1.LENDING_X_AAVE_B_PRICE]: xAAVEbPriceContract,
    [abis_1.LENDING_X_INCH_A_PRICE]: xINCHaPriceContract,
    [abis_1.LENDING_X_INCH_B_PRICE]: xINCHbPriceContract,
    [abis_1.LENDING_X_KNC_A_PRICE]: xKNCaPriceContract,
    [abis_1.LENDING_X_KNC_B_PRICE]: xKNCbPriceContract,
  }
}
exports.getPricingContracts = getPricingContracts
const getLendingContracts = async (provider) => {
  const [
    comptrollerContract,
    liquidityPoolContract,
    lptContract,
    marketContracts,
    pricingContracts,
  ] = await Promise.all([
    exports.getComptrollerContract(provider),
    exports.getLiquidityPoolContract(provider),
    exports.getLPTContract(provider),
    exports.getMarketContracts(provider),
    exports.getPricingContracts(provider),
  ])
  return {
    comptrollerContract,
    liquidityPoolContract,
    lptContract,
    marketContracts,
    pricingContracts,
  }
}
exports.getLendingContracts = getLendingContracts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBZ0JxQjtBQUVyQiwrQ0FBd0M7QUFXeEMsb0NBQXNDO0FBRXRDLE1BQU0sY0FBYyxHQUFHLElBQUksS0FBSyxDQUFDLGtCQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQTtBQUVoRSxNQUFNLHNCQUFzQixHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDckUsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDM0MsTUFBTSxtQkFBbUIsR0FBRyxtQkFBVyxDQUNyQywwQkFBbUIsRUFDbkIsUUFBUSxFQUNSLE9BQU8sQ0FDTyxDQUFBO0lBQ2hCLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtRQUN4QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUE7S0FDdEM7SUFDRCxPQUFPLG1CQUFtQixDQUFBO0FBQzVCLENBQUMsQ0FBQTtBQVhZLFFBQUEsc0JBQXNCLDBCQVdsQztBQUVNLE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUN2RSxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMzQyxNQUFNLHFCQUFxQixHQUFHLG1CQUFXLENBQ3ZDLDZCQUFzQixFQUN0QixRQUFRLEVBQ1IsT0FBTyxDQUNTLENBQUE7SUFDbEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1FBQzFCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtLQUN0QztJQUNELE9BQU8scUJBQXFCLENBQUE7QUFDOUIsQ0FBQyxDQUFBO0FBWFksUUFBQSx3QkFBd0IsNEJBV3BDO0FBRU0sTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLFFBQXNC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
