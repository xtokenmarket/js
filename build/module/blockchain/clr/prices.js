import { AAVE_X_AAVE_A_CLR, BNT_X_BNT_A_CLR, INCH_X_INCH_A_CLR, INCH_X_INCH_B_CLR, X_AAVE_B_AAVE_CLR, X_ALPHA_A_ALPHA_CLR, X_KNC_A_KNC_CLR, X_KNC_B_KNC_CLR, X_SNX_A_SNX_CLR, XTK_ETH_CLR, } from '@xtoken/abis';
import { BigNumber } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { DEC_18, DEFAULT_PRICES, DEFAULT_TOKEN_PRICES } from '../../constants';
import { formatNumber, getTWAP } from '../../utils';
import { getEthUsdcPrice } from '../exchanges/uniswap';
import { getXAssetCLRTokenSymbol, getXAssetPrices } from '../utils';
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, AAVE_X_AAVE_A_CLR } from '@xtoken/abis'
 * import { getXAssetCLRPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xAssetCLRContract = new ethers.Contract(ADDRESSES[AAVE_X_AAVE_A_CLR][chainId], Abi.xAssetCLR, provider)
 *
 * const { priceEth, priceUsd } = await getXAssetCLRPrices(xAssetCLRContract)
 * ```
 *
 * @param {XAssetCLR} xAssetCLRContract xAssetCLR token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXAssetCLRPrices = async (xAssetCLRContract) => {
    try {
        const [symbol, { token0Price, token1Price }, stakedTokenBalances, bufferTokenBalances, xAssetCLRTotalSupply, ethUsdcPrice,] = await Promise.all([
            xAssetCLRContract.symbol(),
            getXAssetCLRTokenPrices(xAssetCLRContract),
            xAssetCLRContract.getStakedTokenBalance(),
            xAssetCLRContract.getBufferTokenBalance(),
            xAssetCLRContract.totalSupply(),
            getEthUsdcPrice(xAssetCLRContract.provider),
        ]);
        const assets = getXAssetCLRTokenSymbol(symbol);
        const token0Balance = stakedTokenBalances.amount0.add(bufferTokenBalances.amount0);
        const token1Balance = stakedTokenBalances.amount1.add(bufferTokenBalances.amount1);
        let isToken0 = true;
        let aum = BigNumber.from('0');
        switch (symbol) {
            case X_AAVE_B_AAVE_CLR:
            case X_ALPHA_A_ALPHA_CLR:
            case X_KNC_A_KNC_CLR:
            case X_KNC_B_KNC_CLR:
            case X_SNX_A_SNX_CLR:
                aum = token1Balance.mul(token1Price).div(DEC_18).add(token0Balance);
                break;
            case AAVE_X_AAVE_A_CLR:
            case BNT_X_BNT_A_CLR:
            case INCH_X_INCH_A_CLR:
            case INCH_X_INCH_B_CLR:
            case XTK_ETH_CLR:
                isToken0 = false;
                aum = token0Balance.mul(token0Price).div(DEC_18).add(token1Balance);
                break;
        }
        let priceEth;
        let priceUsd;
        if (symbol === XTK_ETH_CLR) {
            priceEth = aum.mul(DEC_18).div(xAssetCLRTotalSupply);
            priceUsd = priceEth.mul(parseEther(ethUsdcPrice)).div(DEC_18);
            // Convert AUM to USD from ETH
            aum = aum.mul(parseEther(ethUsdcPrice));
        }
        else {
            const { priceUsd: xAssetPriceUsd } = await getXAssetPrices((isToken0 ? assets[0] : assets[1]), xAssetCLRContract.provider);
            aum = aum.mul(parseEther(xAssetPriceUsd.toString()));
            priceUsd = aum.div(xAssetCLRTotalSupply);
            priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice));
        }
        return {
            aum: formatNumber(formatEther(aum.div(DEC_18))),
            priceBtc: 0,
            priceEth: formatNumber(formatEther(priceEth), 6),
            priceUsd: formatNumber(formatEther(priceUsd)),
        };
    }
    catch (e) {
        console.error('Error while fetching token price:', e);
        return DEFAULT_PRICES;
    }
};
export const getXAssetCLRTokenPrices = async (XAssetCLR) => {
    try {
        const [asset0Price, asset1Price] = await Promise.all([
            XAssetCLR.getAsset0Price(),
            XAssetCLR.getAsset1Price(),
        ]);
        const token0Price = getTWAP(asset0Price);
        const token1Price = getTWAP(asset1Price);
        return {
            token0Price,
            token1Price,
        };
    }
    catch (e) {
        console.error('Error while fetching token price:', e);
        return DEFAULT_TOKEN_PRICES;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vY2xyL3ByaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsZUFBZSxFQUNmLGVBQWUsRUFDZixlQUFlLEVBQ2YsV0FBVyxHQUNaLE1BQU0sY0FBYyxDQUFBO0FBQ3JCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDbEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUUxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRW5FOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLEtBQUssRUFDckMsaUJBQTRCLEVBQ0wsRUFBRTtJQUN6QixJQUFJO1FBQ0YsTUFBTSxDQUNKLE1BQU0sRUFDTixFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsRUFDNUIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixvQkFBb0IsRUFDcEIsWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtZQUMxQix1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQyxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRTtZQUN6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