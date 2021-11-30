"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTitleCase = exports.isXAssetCLRSymbol = exports.getSignerAddress = exports.getSigner = exports.getUniswapPoolContract = exports.getUniswapPoolAddress = exports.getExchangeRateContract = exports.getUserAvailableTokenBalance = exports.parseFees = exports.getXAssetPrices = exports.getXAssetLevTokenSymbol = exports.getXAssetCLRTokenSymbol = exports.getXAssetCLRSymbol = exports.getLPTokenSymbol = exports.getTokenSymbol = exports.getKyberPoolContract = exports.getKyberPoolAddress = exports.getInchPoolContract = exports.getInchPoolAddress = exports.getExpectedRate = exports.getContract = exports.getBancorPoolContract = exports.getBancorPoolAddress = exports.getBalancerPoolContract = exports.getBalancerPoolAddress = exports.getAbi = exports.capitalizeToken = void 0;
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const constants_1 = require("../constants");
const xaave_1 = require("./xaave");
const helper_1 = require("./xaave/helper");
const xalpha_1 = require("./xalpha");
const helper_2 = require("./xalpha/helper");
const xbnt_1 = require("./xbnt");
const helper_3 = require("./xbnt/helper");
const xinch_1 = require("./xinch");
const helper_4 = require("./xinch/helper");
const xknc_1 = require("./xknc");
const helper_5 = require("./xknc/helper");
const xsnx_1 = require("./xsnx");
const helper_6 = require("./xsnx/helper");
const { formatEther, parseEther } = ethers_1.ethers.utils;
const capitalizeToken = (symbol) => {
    if (![abis_1.REN_BTC, abis_1.S_ETH, abis_1.S_USD].includes(symbol)) {
        return symbol.toUpperCase();
    }
    return symbol;
};
exports.capitalizeToken = capitalizeToken;
const getAbi = (contractName) => {
    switch (contractName) {
        case abis_1.AAVE:
        case abis_1.ALPHA:
        case abis_1.BNT:
        case abis_1.BUSD:
        case abis_1.DAI:
        case abis_1.ETH:
        case abis_1.FRAX:
        case abis_1.INCH:
        case abis_1.KNC:
        case abis_1.REN_BTC:
        case abis_1.S_ETH:
        case abis_1.S_USD:
        case abis_1.USDC:
        case abis_1.USDT:
        case abis_1.UST:
        case abis_1.WBTC:
        case abis_1.WETH:
        case abis_1.XTK:
        case abis_1.LINK:
            return abis_1.Abi.ERC20;
        case abis_1.EXCHANGE_RATES:
            return abis_1.Abi.ExchangeRates;
        case abis_1.INCH_LIQUIDITY_PROTOCOL:
            return abis_1.Abi.InchLiquidityProtocol;
        case abis_1.KYBER_PROXY:
            return abis_1.Abi.KyberProxy;
        case abis_1.SNX:
            return abis_1.Abi.Synthetix;
        case abis_1.TRADE_ACCOUNTING:
            return abis_1.Abi.TradeAccounting;
        case abis_1.UNISWAP_LIBRARY:
            return abis_1.Abi.UniswapLibrary;
        case abis_1.UNISWAP_V2_PAIR:
            return abis_1.Abi.UniswapV2Pair;
        case abis_1.X_AAVE_A:
        case abis_1.X_AAVE_B:
            return abis_1.Abi.xAAVE;
        case abis_1.X_ALPHA_A:
            return abis_1.Abi.xALPHA;
        case abis_1.X_BNT_A:
            return abis_1.Abi.xBNT;
        case abis_1.X_INCH_A:
        case abis_1.X_INCH_B:
            return abis_1.Abi.xINCH;
        case abis_1.X_KNC_A:
        case abis_1.X_KNC_B:
            return abis_1.Abi.xKNC;
        case abis_1.X_SNX_A:
            return abis_1.Abi.xSNX;
        case abis_1.X_U3LP_A:
        case abis_1.X_U3LP_B:
        case abis_1.X_U3LP_C:
        case abis_1.X_U3LP_D:
        case abis_1.X_U3LP_E:
        case abis_1.X_U3LP_F:
        case abis_1.X_U3LP_G:
        case abis_1.X_U3LP_H:
            return abis_1.Abi.xU3LP;
        case abis_1.XTK_MANAGEMENT_STAKING_MODULE:
            return abis_1.Abi.XTKManagementStakingModule;
        case abis_1.AAVE_X_AAVE_A_CLR:
        case abis_1.BNT_X_BNT_A_CLR:
        case abis_1.INCH_X_INCH_A_CLR:
        case abis_1.INCH_X_INCH_B_CLR:
        case abis_1.X_AAVE_B_AAVE_CLR:
        case abis_1.X_ALPHA_A_ALPHA_CLR:
        case abis_1.X_KNC_A_KNC_CLR:
        case abis_1.X_KNC_B_KNC_CLR:
        case abis_1.X_SNX_A_SNX_CLR:
        case abis_1.XTK_ETH_CLR:
            return abis_1.Abi.xAssetCLR;
        case abis_1.LENDING_COMPTROLLER:
            return abis_1.Abi.Comptroller;
        case abis_1.LENDING_LIQUIDITY_POOL:
            return abis_1.Abi.LiquidityPool;
        case abis_1.LENDING_LPT:
            return abis_1.Abi.LPT;
        // case LENDING_X_AAVE_A_MARKET:
        // case LENDING_X_AAVE_B_MARKET:
        // case LENDING_X_INCH_A_MARKET:
        // case LENDING_X_INCH_B_MARKET:
        // case LENDING_X_KNC_A_MARKET:
        // case LENDING_X_KNC_B_MARKET:
        case abis_1.LENDING_WBTC_MARKET:
        case abis_1.LENDING_WETH_MARKET:
        case abis_1.LENDING_LINK_MARKET:
            return abis_1.Abi.Market;
        /*case LENDING_X_AAVE_A_PRICE:
        case LENDING_X_AAVE_B_PRICE:
          return Abi.xAAVEPrice as ContractInterface
        case LENDING_X_INCH_A_PRICE:
        case LENDING_X_INCH_B_PRICE:
          return Abi.xINCHPrice as ContractInterface
        case LENDING_X_KNC_A_PRICE:
        case LENDING_X_KNC_B_PRICE:
          return Abi.xKNCPrice as ContractInterface
         */
        case abis_1.LENDING_WBTC_PRICE:
        case abis_1.LENDING_WETH_PRICE:
        case abis_1.LENDING_LINK_PRICE:
            return abis_1.Abi.NativePrice;
        case abis_1.ARBITRUM_NFT_CORE:
            return abis_1.Abi.ArbitrumNFTCore;
        case abis_1.L2_NFT:
            return abis_1.Abi.L2_NFT;
        case abis_1.GM:
        case abis_1.GA:
        case abis_1.GN:
        case abis_1.WAGMI:
            return abis_1.Abi.GM;
        case abis_1.LIQUIDITY_POOL:
            return abis_1.Abi.liquidityPool;
        case abis_1.X_ASSET_LEV:
            return abis_1.Abi.xAssetLev;
        case abis_1.X_ASSET_LEV_2X:
            return abis_1.Abi.xAssetLev2x;
        case abis_1.X_ASSET_LEV_3X:
            return abis_1.Abi.xAssetLev3x;
        case abis_1.X_BTC_3X:
        case abis_1.X_ETH_3X:
            // case X_LINK_3X:
            return abis_1.Abi.xAssetLev;
    }
};
exports.getAbi = getAbi;
const getBalancerPoolAddress = (symbol, chainId) => {
    let address;
    switch (symbol) {
        case abis_1.X_AAVE_A:
            address = abis_1.ADDRESSES[abis_1.X_AAVE_A_BALANCER_POOL][chainId];
            break;
        case abis_1.X_AAVE_B:
            address = abis_1.ADDRESSES[abis_1.X_AAVE_B_BALANCER_POOL][chainId];
            break;
        case abis_1.X_SNX_A:
            address = abis_1.ADDRESSES[abis_1.X_SNX_A_BALANCER_POOL_V2][chainId];
            break;
        default:
            address = null;
    }
    return address;
};
exports.getBalancerPoolAddress = getBalancerPoolAddress;
const getBalancerPoolContract = (symbol, provider, chainId) => {
    if (!provider || !symbol)
        return null;
    const address = exports.getBalancerPoolAddress(symbol, chainId);
    if (!address)
        return null;
    return new ethers_1.ethers.Contract(address, abis_1.Abi.BalancerPool, exports.getSigner(provider));
};
exports.getBalancerPoolContract = getBalancerPoolContract;
const getBancorPoolAddress = (symbol, chainId) => {
    let address;
    switch (symbol) {
        case abis_1.X_BNT_A:
            address = abis_1.ADDRESSES[abis_1.X_BNT_A_BANCOR_POOL][chainId];
            break;
        default:
            address = null;
    }
    return address;
};
exports.getBancorPoolAddress = getBancorPoolAddress;
const getBancorPoolContract = (symbol, provider, chainId) => {
    if (!provider || !symbol)
        return null;
    const address = exports.getBancorPoolAddress(symbol, chainId);
    if (!address)
        return null;
    return new ethers_1.ethers.Contract(address, abis_1.Abi.BancorSmartToken, exports.getSigner(provider));
};
exports.getBancorPoolContract = getBancorPoolContract;
const getContract = (contractName, provider, network) => {
    if (!provider)
        return null;
    const address = abis_1.ADDRESSES[contractName][network.chainId];
    if (!address)
        return null;
    return new ethers_1.ethers.Contract(address, exports.getAbi(contractName), exports.getSigner(provider));
};
exports.getContract = getContract;
const getExpectedRate = async (kyberProxyContract, inputAsset, outputAsset, amount, isMinRate = false) => {
    if (isMinRate) {
        return constants_1.ZERO_NUMBER;
    }
    const { expectedRate } = await kyberProxyContract.getExpectedRate(inputAsset, outputAsset, amount);
    return expectedRate;
};
exports.getExpectedRate = getExpectedRate;
const getInchPoolAddress = (symbol, chainId) => {
    let address;
    switch (symbol) {
        case abis_1.X_INCH_A:
            address = abis_1.ADDRESSES[abis_1.X_INCH_A_INCH_POOL][chainId];
            break;
        case abis_1.X_INCH_B:
            address = abis_1.ADDRESSES[abis_1.X_INCH_B_INCH_POOL][chainId];
            break;
        default:
            address = null;
    }
    return address;
};
exports.getInchPoolAddress = getInchPoolAddress;
const getInchPoolContract = (symbol, provider, chainId) => {
    if (!provider || !symbol)
        return null;
    const address = exports.getInchPoolAddress(symbol, chainId);
    return new ethers_1.ethers.Contract(address, abis_1.Abi.InchLiquidityProtocol, exports.getSigner(provider));
};
exports.getInchPoolContract = getInchPoolContract;
const getKyberPoolAddress = (symbol, chainId) => {
    let address;
    switch (symbol) {
        case abis_1.X_KNC_A:
            address = abis_1.ADDRESSES[abis_1.X_KNC_A_KYBER_POOL][chainId];
            break;
        default:
            address = null;
    }
    return address;
};
exports.getKyberPoolAddress = getKyberPoolAddress;
const getKyberPoolContract = (symbol, provider, chainId) => {
    if (!provider || !symbol)
        return null;
    const address = exports.getKyberPoolAddress(symbol, chainId);
    return new ethers_1.ethers.Contract(address, abis_1.Abi.DMMPool, exports.getSigner(provider));
};
exports.getKyberPoolContract = getKyberPoolContract;
const getTokenSymbol = (symbol) => {
    switch (symbol) {
        case abis_1.X_AAVE_A:
        case abis_1.X_AAVE_B:
            return abis_1.AAVE;
        case abis_1.X_ALPHA_A:
            return abis_1.ALPHA;
        case abis_1.X_BNT_A:
            return abis_1.BNT;
        case abis_1.X_INCH_A:
        case abis_1.X_INCH_B:
            return abis_1.INCH;
        case abis_1.X_KNC_A:
        case abis_1.X_KNC_B:
            return abis_1.KNC;
        case abis_1.X_SNX_A:
            return abis_1.SNX;
    }
};
exports.getTokenSymbol = getTokenSymbol;
const getLPTokenSymbol = (symbol, chainId = 1) => {
    switch (symbol) {
        case abis_1.X_U3LP_A:
            return { 0: abis_1.DAI, 1: abis_1.USDC };
        case abis_1.X_U3LP_B:
            if (chainId === constants_1.ChainId.Arbitrum) {
                return { 0: abis_1.USDT, 1: abis_1.USDC };
            }
            else {
                return { 0: abis_1.USDC, 1: abis_1.USDT };
            }
        case abis_1.X_U3LP_C:
            return { 0: abis_1.S_USD, 1: abis_1.USDC };
        case abis_1.X_U3LP_D:
            return { 0: abis_1.S_ETH, 1: abis_1.WETH };
        case abis_1.X_U3LP_E:
            return { 0: abis_1.WBTC, 1: abis_1.REN_BTC };
        case abis_1.X_U3LP_F:
            return { 0: abis_1.USDC, 1: abis_1.UST };
        case abis_1.X_U3LP_G:
            return { 0: abis_1.FRAX, 1: abis_1.USDC };
        case abis_1.X_U3LP_H:
            return { 0: abis_1.BUSD, 1: abis_1.USDT };
    }
};
exports.getLPTokenSymbol = getLPTokenSymbol;
const getXAssetCLRSymbol = (symbol) => {
    switch (symbol) {
        case abis_1.X_AAVE_A:
            return abis_1.AAVE_X_AAVE_A_CLR;
        case abis_1.X_AAVE_B:
            return abis_1.X_AAVE_B_AAVE_CLR;
        case abis_1.X_ALPHA_A:
            return abis_1.X_ALPHA_A_ALPHA_CLR;
        case abis_1.X_BNT_A:
            return abis_1.BNT_X_BNT_A_CLR;
        case abis_1.X_INCH_A:
            return abis_1.INCH_X_INCH_A_CLR;
        case abis_1.X_INCH_B:
            return abis_1.INCH_X_INCH_B_CLR;
        case abis_1.X_KNC_A:
            return abis_1.X_KNC_A_KNC_CLR;
        case abis_1.X_KNC_B:
            return abis_1.X_KNC_B_KNC_CLR;
        case abis_1.X_SNX_A:
            return abis_1.X_SNX_A_SNX_CLR;
    }
};
exports.getXAssetCLRSymbol = getXAssetCLRSymbol;
const getXAssetCLRTokenSymbol = (symbol) => {
    switch (symbol) {
        case abis_1.AAVE_X_AAVE_A_CLR:
            return { 0: abis_1.AAVE, 1: abis_1.X_AAVE_A };
        case abis_1.BNT_X_BNT_A_CLR:
            return { 0: abis_1.BNT, 1: abis_1.X_BNT_A };
        case abis_1.INCH_X_INCH_A_CLR:
            return { 0: abis_1.INCH, 1: abis_1.X_INCH_A };
        case abis_1.INCH_X_INCH_B_CLR:
            return { 0: abis_1.INCH, 1: abis_1.X_INCH_B };
        case abis_1.X_AAVE_B_AAVE_CLR:
            return { 0: abis_1.X_AAVE_B, 1: abis_1.AAVE };
        case abis_1.X_ALPHA_A_ALPHA_CLR:
            return { 0: abis_1.X_ALPHA_A, 1: abis_1.ALPHA };
        case abis_1.X_KNC_A_KNC_CLR:
            return { 0: abis_1.X_KNC_A, 1: abis_1.KNC };
        case abis_1.X_KNC_B_KNC_CLR:
            return { 0: abis_1.X_KNC_B, 1: abis_1.KNC };
        case abis_1.X_SNX_A_SNX_CLR:
            return { 0: abis_1.X_SNX_A, 1: abis_1.SNX };
        case abis_1.XTK_ETH_CLR:
            return { 0: abis_1.XTK, 1: abis_1.WETH };
    }
};
exports.getXAssetCLRTokenSymbol = getXAssetCLRTokenSymbol;
const getXAssetLevTokenSymbol = (symbol) => {
    switch (symbol) {
        case abis_1.X_BTC_3X:
            return abis_1.WBTC;
        case abis_1.X_ETH_3X:
            return abis_1.WETH;
        // case X_LINK_3X:
        //   return LINK
    }
};
exports.getXAssetLevTokenSymbol = getXAssetLevTokenSymbol;
const getXAssetPrices = async (symbol, provider) => {
    switch (symbol) {
        case abis_1.X_AAVE_A:
        case abis_1.X_AAVE_B: {
            const { xaaveContract } = await helper_1.getXAaveContracts(symbol, provider);
            return xaave_1.getXAavePrices(xaaveContract);
        }
        case abis_1.X_ALPHA_A: {
            const { xalphaContract } = await helper_2.getXAlphaContracts(symbol, provider);
            return xalpha_1.getXAlphaPrices(xalphaContract);
        }
        case abis_1.X_BNT_A: {
            const { xbntContract } = await helper_3.getXBntContracts(symbol, provider);
            return xbnt_1.getXBntPrices(xbntContract);
        }
        case abis_1.X_INCH_A:
        case abis_1.X_INCH_B: {
            const { xinchContract } = await helper_4.getXInchContracts(symbol, provider);
            return xinch_1.getXInchPrices(xinchContract);
        }
        case abis_1.X_KNC_A:
        case abis_1.X_KNC_B: {
            const { xkncContract } = await helper_5.getXKncContracts(symbol, provider);
            return xknc_1.getXKncPrices(xkncContract);
        }
        case abis_1.X_SNX_A: {
            const { xsnxContract } = await helper_6.getXSnxContracts(provider);
            return xsnx_1.getXSnxPrices(xsnxContract);
        }
    }
};
exports.getXAssetPrices = getXAssetPrices;
const parseFees = (fee) => {
    return parseEther(fee.isZero() ? '1' : String(1 - 1 / fee.toNumber()));
};
exports.parseFees = parseFees;
const getUserAvailableTokenBalance = async (contract, address) => {
    let balance;
    if (contract.address === abis_1.ADDRESSES[abis_1.SNX][1]) {
        balance = await contract.transferableSynthetix(address);
    }
    else {
        balance = await contract.balanceOf(address);
    }
    return Math.floor(Number(formatEther(balance.toString())) * 10000) / 10000;
};
exports.getUserAvailableTokenBalance = getUserAvailableTokenBalance;
const getExchangeRateContract = async (provider) => {
    if (!provider)
        return null;
    const resolver = new ethers_1.ethers.Contract(abis_1.ADDRESSES[abis_1.SYNTHETIX_ADDRESS_RESOLVER][1], abis_1.Abi.AddressResolver, provider);
    const address = resolver.getAddress(ethers_1.ethers.utils.formatBytes32String('ExchangeRates'));
    if (!address)
        return null;
    return new ethers_1.ethers.Contract(address, abis_1.Abi.ExchangeRates, exports.getSigner(provider));
};
exports.getExchangeRateContract = getExchangeRateContract;
const getUniswapPoolAddress = (symbol, chainId) => {
    let address;
    switch (symbol) {
        case abis_1.X_KNC_A:
            address = abis_1.ADDRESSES[abis_1.X_KNC_A_UNISWAP_POOL][chainId];
            break;
        case abis_1.X_KNC_B:
            address = abis_1.ADDRESSES[abis_1.X_KNC_B_UNISWAP_POOL][chainId];
            break;
        default:
            address = null;
    }
    return address;
};
exports.getUniswapPoolAddress = getUniswapPoolAddress;
const getUniswapPoolContract = (symbol, provider, chainId) => {
    if (!provider || !symbol)
        return null;
    const address = exports.getUniswapPoolAddress(symbol, chainId);
    return new ethers_1.ethers.Contract(address, abis_1.Abi.UniswapV2Pair, exports.getSigner(provider));
};
exports.getUniswapPoolContract = getUniswapPoolContract;
const getSigner = (provider) => {
    try {
        // Arbitrum provider for test cases
        if ([constants_1.ARBITRUM_URL, constants_1.ARBITRUM_RINKEBY_URL].includes(provider.connection.url)) {
            return provider;
        }
        return provider.getSigner();
    }
    catch (e) {
        return provider;
    }
};
exports.getSigner = getSigner;
const getSignerAddress = async (provider) => {
    const signer = provider.getSigner();
    return signer.getAddress();
};
exports.getSignerAddress = getSignerAddress;
const isXAssetCLRSymbol = async (symbol) => {
    return [
        abis_1.AAVE_X_AAVE_A_CLR,
        abis_1.BNT_X_BNT_A_CLR,
        abis_1.INCH_X_INCH_A_CLR,
        abis_1.INCH_X_INCH_B_CLR,
        abis_1.X_AAVE_B_AAVE_CLR,
        abis_1.X_KNC_A_KNC_CLR,
        abis_1.X_KNC_B_KNC_CLR,
        abis_1.X_SNX_A_SNX_CLR,
    ].includes(symbol);
};
exports.isXAssetCLRSymbol = isXAssetCLRSymbol;
const toTitleCase = (text) => {
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
};
exports.toTitleCase = toTitleCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSx1Q0F5RnFCO0FBQ3JCLG1DQUEwQztBQUcxQyw0Q0FLcUI7QUFjckIsbUNBQXdDO0FBQ3hDLDJDQUFrRDtBQUNsRCxxQ0FBMEM7QUFDMUMsNENBQW9EO0FBQ3BELGlDQUFzQztBQUN0QywwQ0FBZ0Q7QUFDaEQsbUNBQXdDO0FBQ3hDLDJDQUFrRDtBQUNsRCxpQ0FBc0M7QUFDdEMsMENBQWdEO0FBQ2hELGlDQUFzQztBQUN0QywwQ0FBZ0Q7QUFFaEQsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBcUIsRUFBRSxFQUFFO0lBQ3ZELElBQUksQ0FBQyxDQUFDLGNBQU8sRUFBRSxZQUFLLEVBQUUsWUFBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzdDLE9BQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFBO0tBQzVCO0lBQ0QsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUE7QUFMWSxRQUFBLGVBQWUsbUJBSzNCO0FBRU0sTUFBTSxNQUFNLEdBQUcsQ0FBQyxZQUF3QixFQUFFLEVBQUU7SUFDakQsUUFBUSxZQUFZLEVBQUU7UUFDcEIsS0FBSyxXQUFJLENBQUM7UUFDVixLQUFLLFlBQUssQ0FBQztRQUNYLEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxXQUFJLENBQUM7UUFDVixLQUFLLFVBQUcsQ0FBQztRQUNULEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxXQUFJLENBQUM7UUFDVixLQUFLLFdBQUksQ0FBQztRQUNWLEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxjQUFPLENBQUM7UUFDYixLQUFLLFlBQUssQ0FBQztRQUNYLEtBQUssWUFBSyxDQUFD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