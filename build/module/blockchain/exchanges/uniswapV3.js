import { AddressZero } from '@ethersproject/constants';
import { abi as QuoterAbi } from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import { ADDRESSES, BUY, ETH, 
// LINK,
USDC, WBTC, WETH, } from '@xtoken/abis';
import { BigNumber, Contract } from 'ethers';
import { formatEther, formatUnits, parseUnits } from 'ethers/lib/utils';
import { DEC_18 } from '../../constants';
import { getContract, getSigner, getTokenSymbol } from '../utils';
const FEES = BigNumber.from('3000'); // 0.3% for xAssetCLR swaps
const MIN_PRICE = BigNumber.from('4295128740'); // asset0 -> asset1 swap
const MAX_PRICE = BigNumber.from('1461446703485210103287273052203988822378723970341'); // asset1 -> asset0 swap
const QUOTER_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';
export const getUniswapV3EstimatedQty = async (tokenIn, symbol, amount, tradeType, fees, provider) => {
    const { chainId } = await provider.getNetwork();
    const quoterContract = new Contract(QUOTER_ADDRESS, QuoterAbi, getSigner(provider));
    const isTradeBuy = tradeType === BUY;
    const wethAddress = ADDRESSES[WETH][chainId];
    let assetAddress;
    let xAssetAddress = AddressZero;
    if (symbol === WBTC) {
        assetAddress = ADDRESSES[symbol][chainId];
    }
    else {
        const tokenSymbol = getTokenSymbol(symbol);
        assetAddress = ADDRESSES[tokenSymbol][chainId];
        xAssetAddress = ADDRESSES[symbol][chainId];
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
        tokenInAddress = tokenIn === ETH ? wethAddress : assetAddress;
        tokenOutAddress = tokenIn === ETH ? assetAddress : xAssetAddress;
        // priceLimit = isAsset0Native ? MIN_PRICE : MAX_PRICE
        if (symbol === WBTC) {
            tokenOutDecimals = 8;
        }
    }
    else {
        tokenInAddress = tokenIn === ETH ? assetAddress : xAssetAddress;
        tokenOutAddress = tokenIn === ETH ? wethAddress : assetAddress;
        // priceLimit = isAsset0Native ? MAX_PRICE : MIN_PRICE
        if (symbol === WBTC) {
            tokenInDecimals = 8;
        }
    }
    const estimateQty = await quoterContract.callStatic.quoteExactInputSingle(tokenInAddress, tokenOutAddress, fees || FEES, parseUnits(amount, tokenInDecimals), 
    // priceLimit
    // In case of Token0 to Token1 trade, the price limit is `MIN_PRICE` and the reverse would be `MAX_PRICE`
    BigNumber.from(tokenOutAddress).gt(BigNumber.from(tokenInAddress))
        ? MIN_PRICE
        : MAX_PRICE);
    return formatUnits(estimateQty, tokenOutDecimals);
};
export const getEthUsdcPriceUniswapV3 = async (provider) => {
    const { chainId } = await provider.getNetwork();
    const quoterContract = new Contract(QUOTER_ADDRESS, QuoterAbi, provider);
    const usdcAddress = ADDRESSES[USDC][chainId];
    const wethAddress = ADDRESSES[WETH][chainId];
    const quantity = await quoterContract.callStatic.quoteExactInputSingle(wethAddress, usdcAddress, FEES, DEC_18, 
    // In case of Token0 to Token1 trade, the price limit is `MIN_PRICE` and the reverse would be `MAX_PRICE`
    BigNumber.from(usdcAddress).gt(BigNumber.from(wethAddress))
        ? MIN_PRICE
        : MAX_PRICE);
    return formatUnits(quantity, 6);
};
export const getTokenEthPriceUniswapV3 = async (symbol, provider) => {
    const network = await provider.getNetwork();
    const { chainId } = network;
    const quoterContract = new Contract(QUOTER_ADDRESS, QuoterAbi, provider);
    const tokenContract = getContract(symbol, provider, network);
    const wethAddress = ADDRESSES[WETH][chainId];
    const tokenDecimals = await tokenContract.decimals();
    const quantity = await quoterContract.callStatic.quoteExactInputSingle(tokenContract.address, wethAddress, FEES, parseUnits('1', tokenDecimals), 
    // In case of Token0 to Token1 trade, the price limit is `MIN_PRICE` and the reverse would be `MAX_PRICE`
    BigNumber.from(wethAddress).gt(BigNumber.from(tokenContract.address))
        ? MIN_PRICE
        : MAX_PRICE);
    return formatEther(quantity);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcFYzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL3VuaXN3YXBWMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFFdEQsT0FBTyxFQUFFLEdBQUcsSUFBSSxTQUFTLEVBQUUsTUFBTSx1RUFBdUUsQ0FBQTtBQUN4RyxPQUFPLEVBQ0wsU0FBUyxFQUNULEdBQUcsRUFDSCxHQUFHO0FBQ0gsUUFBUTtBQUNSLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxHQUtMLE1BQU0sY0FBYyxDQUFBO0FBQ3JCLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRXZFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFakUsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLDJCQUEyQjtBQUMvRCxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUMsd0JBQXdCO0FBQ3ZFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQzlCLG1EQUFtRCxDQUNwRCxDQUFBLENBQUMsd0JBQXdCO0FBQzFCLE1BQU0sY0FBYyxHQUFHLDRDQUE0QyxDQUFBO0FBRW5FLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLEtBQUssRUFDM0MsT0FBbUMsRUFDbkMsTUFBaUMsRUFDakMsTUFBYyxFQUNkLFNBQXFCLEVBQ3JCLElBQTJCLEVBQzNCLFFBQXNC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