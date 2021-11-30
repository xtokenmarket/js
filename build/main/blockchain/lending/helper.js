"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLendingContracts = exports.getPricingContracts = exports.getMarketContracts = exports.getLPTContract = exports.getLiquidityPoolContract = exports.getComptrollerContract = void 0;
const abis_1 = require("@xtoken/abis");
const constants_1 = require("../../constants");
const utils_1 = require("../utils");
const CONTRACT_ERROR = new Error(constants_1.Errors.CONTRACT_INITIALIZATION_FAILED);
const getComptrollerContract = async (provider) => {
    const network = await provider.getNetwork();
    const comptrollerContract = utils_1.getContract(abis_1.LENDING_COMPTROLLER, provider, network);
    if (!comptrollerContract) {
        return Promise.reject(CONTRACT_ERROR);
    }
    return comptrollerContract;
};
exports.getComptrollerContract = getComptrollerContract;
const getLiquidityPoolContract = async (provider) => {
    const network = await provider.getNetwork();
    const liquidityPoolContract = utils_1.getContract(abis_1.LENDING_LIQUIDITY_POOL, provider, network);
    if (!liquidityPoolContract) {
        return Promise.reject(CONTRACT_ERROR);
    }
    return liquidityPoolContract;
};
exports.getLiquidityPoolContract = getLiquidityPoolContract;
const getLPTContract = async (provider) => {
    const network = await provider.getNetwork();
    const lptContract = utils_1.getContract(abis_1.LENDING_LPT, provider, network);
    if (!lptContract) {
        return Promise.reject(CONTRACT_ERROR);
    }
    return lptContract;
};
exports.getLPTContract = getLPTContract;
const getMarketContracts = async (provider) => {
    const network = await provider.getNetwork();
    const wbtcMarketContract = utils_1.getContract(abis_1.LENDING_WBTC_MARKET, provider, network);
    const wethMarketContract = utils_1.getContract(abis_1.LENDING_WETH_MARKET, provider, network);
    const linkMarketContract = utils_1.getContract(abis_1.LENDING_LINK_MARKET, provider, network);
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
    if (!wbtcMarketContract ||
        !wethMarketContract ||
        !linkMarketContract
    // !xAAVEaMarketContract ||
    // !xAAVEbMarketContract ||
    // !xINCHaMarketContract
    // !xINCHbMarketContract ||
    // !xKNCaMarketContract ||
    // !xKNCbMarketContract
    ) {
        return Promise.reject(CONTRACT_ERROR);
    }
    return {
        [abis_1.LENDING_WBTC_MARKET]: wbtcMarketContract,
        [abis_1.LENDING_WETH_MARKET]: wethMarketContract,
        [abis_1.LENDING_LINK_MARKET]: linkMarketContract,
    };
};
exports.getMarketContracts = getMarketContracts;
const getPricingContracts = async (provider) => {
    const network = await provider.getNetwork();
    const wbtcPriceContract = utils_1.getContract(abis_1.LENDING_WBTC_PRICE, provider, network);
    const wethPriceContract = utils_1.getContract(abis_1.LENDING_WETH_PRICE, provider, network);
    const linkPriceContract = utils_1.getContract(abis_1.LENDING_LINK_PRICE, provider, network);
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
    if (!wbtcPriceContract ||
        !wethPriceContract ||
        !linkPriceContract
    // !xAAVEaPriceContract ||
    // !xAAVEbPriceContract ||
    // !xINCHaPriceContract ||
    // !xINCHbPriceContract ||
    // !xKNCaPriceContract ||
    // !xKNCbPriceContract
    ) {
        return Promise.reject(CONTRACT_ERROR);
    }
    return {
        [abis_1.LENDING_WBTC_PRICE]: wbtcPriceContract,
        [abis_1.LENDING_WETH_PRICE]: wethPriceContract,
        [abis_1.LENDING_LINK_PRICE]: linkPriceContract,
    };
};
exports.getPricingContracts = getPricingContracts;
const getLendingContracts = async (provider) => {
    const [comptrollerContract, liquidityPoolContract, lptContract, marketContracts, pricingContracts,] = await Promise.all([
        exports.getComptrollerContract(provider),
        exports.getLiquidityPoolContract(provider),
        exports.getLPTContract(provider),
        exports.getMarketContracts(provider),
        exports.getPricingContracts(provider),
    ]);
    return {
        comptrollerContract,
        liquidityPoolContract,
        lptContract,
        marketContracts,
        pricingContracts,
    };
};
exports.getLendingContracts = getLendingContracts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBc0JxQjtBQUVyQiwrQ0FBd0M7QUFZeEMsb0NBQXNDO0FBRXRDLE1BQU0sY0FBYyxHQUFHLElBQUksS0FBSyxDQUFDLGtCQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQTtBQUVoRSxNQUFNLHNCQUFzQixHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDckUsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDM0MsTUFBTSxtQkFBbUIsR0FBRyxtQkFBVyxDQUNyQywwQkFBbUIsRUFDbkIsUUFBUSxFQUNSLE9BQU8sQ0FDTyxDQUFBO0lBQ2hCLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtRQUN4QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUE7S0FDdEM7SUFDRCxPQUFPLG1CQUFtQixDQUFBO0FBQzVCLENBQUMsQ0FBQTtBQVhZLFFBQUEsc0JBQXNCLDBCQVdsQztBQUVNLE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsRUFBRTtJQUN2RSxNQUFNLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMzQyxNQUFNLHFCQUFxQixHQUFHLG1CQUFXLENBQ3ZDLDZCQUFzQixFQUN0QixRQUFRLEVBQ1IsT0FBTyxDQUNTLENBQUE7SUFDbEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1FBQzFCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtLQUN0QztJQUNELE9BQU8scUJBQXFCLENBQUE7QUFDOUIsQ0FBQyxDQUFBO0FBWFksUUFBQSx3QkFBd0IsNEJBV3BDO0FBRU0sTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLFFBQXNC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