"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenEthPriceUniswapV3 = exports.getEthUsdcPriceUniswapV3 = exports.getUniswapV3EstimatedQty = void 0;
const constants_1 = require("@ethersproject/constants");
const Quoter_json_1 = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const constants_2 = require("../../constants");
const utils_2 = require("../utils");
const FEES = ethers_1.BigNumber.from('3000'); // 0.3% for xAssetCLR swaps
const MIN_PRICE = ethers_1.BigNumber.from('4295128740'); // asset0 -> asset1 swap
const MAX_PRICE = ethers_1.BigNumber.from('1461446703485210103287273052203988822378723970341'); // asset1 -> asset0 swap
const QUOTER_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';
const getUniswapV3EstimatedQty = async (tokenIn, symbol, amount, tradeType, fees, provider) => {
    const { chainId } = await provider.getNetwork();
    const quoterContract = new ethers_1.Contract(QUOTER_ADDRESS, Quoter_json_1.abi, utils_2.getSigner(provider));
    const isTradeBuy = tradeType === abis_1.BUY;
    const wethAddress = abis_1.ADDRESSES[abis_1.WETH][chainId];
    let assetAddress;
    let xAssetAddress = constants_1.AddressZero;
    if (symbol === abis_1.WBTC) {
        assetAddress = abis_1.ADDRESSES[symbol][chainId];
    }
    else {
        const tokenSymbol = utils_2.getTokenSymbol(symbol);
        assetAddress = abis_1.ADDRESSES[tokenSymbol][chainId];
        xAssetAddress = abis_1.ADDRESSES[symbol][chainId];
    }
    // If asset0 is not xAsset in xAssetCLR token
    // const isAsset0Native =
    //   symbol === X_AAVE_A ||
    //   symbol == X_BNT_A ||
    //   symbol === X_INCH_A ||
    //   symbol === X_INCH_B
    let tokenInAddress;
    let tokenOutAddress;
    // let priceLimit
    let tokenInDecimals = 18;
    let tokenOutDecimals = 18;
    if (isTradeBuy) {
        tokenInAddress = tokenIn === abis_1.ETH ? wethAddress : assetAddress;
        tokenOutAddress = tokenIn === abis_1.ETH ? assetAddress : xAssetAddress;
        // priceLimit = isAsset0Native ? MIN_PRICE : MAX_PRICE
        if (symbol === abis_1.WBTC) {
            tokenOutDecimals = 8;
        }
    }
    else {
        tokenInAddress = tokenIn === abis_1.ETH ? assetAddress : xAssetAddress;
        tokenOutAddress = tokenIn === abis_1.ETH ? wethAddress : assetAddress;
        // priceLimit = isAsset0Native ? MAX_PRICE : MIN_PRICE
        if (symbol === abis_1.WBTC) {
            tokenInDecimals = 8;
        }
    }
    const estimateQty = await quoterContract.callStatic.quoteExactInputSingle(tokenInAddress, tokenOutAddress, fees || FEES, utils_1.parseUnits(amount, tokenInDecimals), 
    // priceLimit
    // In case of Token0 to Token1 trade, the price limit is `MIN_PRICE` and the reverse would be `MAX_PRICE`
    ethers_1.BigNumber.from(tokenOutAddress).gt(ethers_1.BigNumber.from(tokenInAddress))
        ? MIN_PRICE
        : MAX_PRICE);
    return utils_1.formatUnits(estimateQty, tokenOutDecimals);
};
exports.getUniswapV3EstimatedQty = getUniswapV3EstimatedQty;
const getEthUsdcPriceUniswapV3 = async (provider) => {
    const { chainId } = await provider.getNetwork();
    const quoterContract = new ethers_1.Contract(QUOTER_ADDRESS, Quoter_json_1.abi, provider);
    const usdcAddress = abis_1.ADDRESSES[abis_1.USDC][chainId];
    const wethAddress = abis_1.ADDRESSES[abis_1.WETH][chainId];
    const quantity = await quoterContract.callStatic.quoteExactInputSingle(wethAddress, usdcAddress, FEES, constants_2.DEC_18, 
    // In case of Token0 to Token1 trade, the price limit is `MIN_PRICE` and the reverse would be `MAX_PRICE`
    ethers_1.BigNumber.from(usdcAddress).gt(ethers_1.BigNumber.from(wethAddress))
        ? MIN_PRICE
        : MAX_PRICE);
    return utils_1.formatUnits(quantity, 6);
};
exports.getEthUsdcPriceUniswapV3 = getEthUsdcPriceUniswapV3;
const getTokenEthPriceUniswapV3 = async (symbol, provider) => {
    const network = await provider.getNetwork();
    const { chainId } = network;
    const quoterContract = new ethers_1.Contract(QUOTER_ADDRESS, Quoter_json_1.abi, provider);
    const tokenContract = utils_2.getContract(symbol, provider, network);
    const wethAddress = abis_1.ADDRESSES[abis_1.WETH][chainId];
    const tokenDecimals = await tokenContract.decimals();
    const quantity = await quoterContract.callStatic.quoteExactInputSingle(tokenContract.address, wethAddress, FEES, utils_1.parseUnits('1', tokenDecimals), 
    // In case of Token0 to Token1 trade, the price limit is `MIN_PRICE` and the reverse would be `MAX_PRICE`
    ethers_1.BigNumber.from(wethAddress).gt(ethers_1.BigNumber.from(tokenContract.address))
        ? MIN_PRICE
        : MAX_PRICE);
    return utils_1.formatEther(quantity);
};
exports.getTokenEthPriceUniswapV3 = getTokenEthPriceUniswapV3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcFYzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL3VuaXN3YXBWMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBc0Q7QUFFdEQsdUdBQXdHO0FBQ3hHLHVDQVlxQjtBQUNyQixtQ0FBNEM7QUFDNUMsNENBQXVFO0FBRXZFLCtDQUF3QztBQUd4QyxvQ0FBaUU7QUFFakUsTUFBTSxJQUFJLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQywyQkFBMkI7QUFDL0QsTUFBTSxTQUFTLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQyx3QkFBd0I7QUFDdkUsTUFBTSxTQUFTLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLENBQzlCLG1EQUFtRCxDQUNwRCxDQUFBLENBQUMsd0JBQXdCO0FBQzFCLE1BQU0sY0FBYyxHQUFHLDRDQUE0QyxDQUFBO0FBRTVELE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxFQUMzQyxPQUFtQyxFQUNuQyxNQUFpQyxFQUNqQyxNQUFjLEVBQ2QsU0FBcUIsRUFDckIsSUFBMkIsRUFDM0IsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMvQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGlCQUFRLENBQ2pDLGNBQWMsRUFDZCxpQkFBUyxFQUNULGlCQUFTLENBQUMsUUFBUSxDQUFDLENBQ3BCLENBQUE7SUFFRCxNQUFNLFVBQVUsR0FBRyxTQUFTLEtBQUssVUFBRyxDQUFBO0lBQ3BDLE1BQU0sV0FBVyxHQUFHLGdCQUFTLENBQUMsV0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFNUMsSUFBSSxZQUFvQixDQUFBO0lBQ3hCLElBQUksYUFBYSxHQUFHLHVCQUFXLENBQUE7SUFDL0IsSUFB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