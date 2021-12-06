import { X_BTC_3X, X_ETH_3X } from '@xtoken/abis';
import { BigNumber } from 'ethers';
import { formatEther, parseEther, parseUnits } from 'ethers/lib/utils';
import { DEC_18, DEFAULT_PRICES } from '../../constants';
import { formatNumber } from '../../utils';
// import { getEthTokenPrice } from '../exchanges/uniswap'
import { getEthUsdcPriceUniswapV3, getTokenEthPriceUniswapV3, } from '../exchanges/uniswapV3';
import { getXAssetLevTokenSymbol } from '../utils';
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_ETH_3X } from '@xtoken/abis'
 * import { getXAssetLevPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xassetlevContract = new ethers.Contract(ADDRESSES[X_ETH_3X][chainId], Abi.xAssetLev, provider)
 *
 * const { priceEth, priceUsd } = await getXAssetLevPrices(xassetlevContract)
 * ```
 *
 * @param {XAssetLev} xassetlevContract xAssetLev token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXAssetLevPrices = async (xassetlevContract) => {
    try {
        const { provider } = xassetlevContract;
        const symbol = (await xassetlevContract.symbol());
        const token = getXAssetLevTokenSymbol(symbol);
        const [xassetlevTotalSupply, { bufferBalance, marketBalance }, ethUsdcPrice,] = await Promise.all([
            xassetlevContract.totalSupply(),
            xassetlevContract.getFundBalances(),
            getEthUsdcPriceUniswapV3(provider),
        ]);
        let tokenEthPrice = BigNumber.from('0');
        if (symbol !== X_ETH_3X) {
            tokenEthPrice = parseEther(await getTokenEthPriceUniswapV3(token, provider));
        }
        // Price in terms of base asset
        const priceToken = bufferBalance
            .add(marketBalance)
            .mul(DEC_18)
            .div(xassetlevTotalSupply);
        let priceBtc = BigNumber.from('0');
        let priceEth;
        if (symbol === X_ETH_3X) {
            priceEth = priceToken;
        }
        else {
            if (symbol === X_BTC_3X) {
                priceBtc = parseUnits(priceToken.toString(), 10);
                priceEth = priceBtc.mul(tokenEthPrice).div(DEC_18);
            }
            else {
                priceEth = priceToken.mul(tokenEthPrice).div(DEC_18);
            }
        }
        const priceUsd = priceEth.mul(parseEther(ethUsdcPrice)).div(DEC_18);
        const aum = priceUsd.mul(xassetlevTotalSupply).div(DEC_18);
        return {
            aum: formatNumber(formatEther(aum), 0),
            priceBtc: priceBtc.isZero() ? 0 : formatNumber(formatEther(priceBtc), 6),
            priceEth: formatNumber(formatEther(priceEth), 6),
            priceUsd: formatNumber(formatEther(priceUsd)),
        };
    }
    catch (e) {
        console.error('Error fetching token price: ', e);
        return DEFAULT_PRICES;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L3ByaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQ2xDLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRXRFLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMxQywwREFBMEQ7QUFDMUQsT0FBTyxFQUNMLHdCQUF3QixFQUN4Qix5QkFBeUIsR0FDMUIsTUFBTSx3QkFBd0IsQ0FBQTtBQUMvQixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxFQUNyQyxpQkFBNEIsRUFDTCxFQUFFO0lBQ3pCLElBQUk7UUFDRixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsaUJBQWlCLENBQUE7UUFDdEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFNLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFlLENBQUE7UUFDL0QsTUFBTSxLQUFLLEdBQUcsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFN0MsTUFBTSxDQUNKLG9CQUFvQixFQUNwQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsRUFDaEMsWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtZQUMvQixpQkFBaUIsQ0FBQyxlQUFlLEVBQUU7WUFDbkMsd0JBQXdCLENBQUMsUUFBd0IsQ0FBQztTQUNuRCxDQUFDLENBQUE7UUFFRixJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUN2QixhQUFhLEdBQUcsVUFBVSxDQUN4QixNQUFNLHlCQUF5QixDQUFDLEtBQUssRUFBRSxRQUF3QixDQUFDLENBQ2pFLENBQUE7U0FDRjtRQUVELCtCQUErQjtRQUMvQixNQUFNLFVBQVUsR0FBRyxhQUFhO2FBQzdCLEdBQUcsQ0FBQyxhQUFhLENBQUM7YUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQzthQUNYLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBRTVCLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEMsSUFBSSxRQUFRLENBQUE7UUFFWixJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDdkIsUUFBUSxHQUFHLFVBQVUsQ0FBQTtTQUN0QjthQUFNO1lBQ0wsSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUN2QixRQUFRLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtnQkFDaEQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQ25EO2lCQUFNO2dCQUNMLFFBQVEsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTthQUNyRDtTQUNGO1FBRUQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUUxRCxPQUFPO1lBQ0wsR0FBRyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEUsUUFBUSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELFFBQVEsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNoRCxPQUFPLGNBQWMsQ0FBQTtLQUN0QjtBQUNILENBQUMsQ0FBQSJ9