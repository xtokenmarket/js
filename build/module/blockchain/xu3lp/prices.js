import { USDC, X_U3LP_D, X_U3LP_E } from '@xtoken/abis';
import { BigNumber } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { DEC_18, DEFAULT_PRICES, DEFAULT_TOKEN_PRICES } from '../../constants';
import { formatNumber, getTWAP } from '../../utils';
import { getBtcUsdcPrice } from '../exchanges/uniswap';
import { getEthUsdcPriceUniswapV3 } from '../exchanges/uniswapV3';
import { getLPTokenSymbol } from '../utils';
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KYBER_PROXY, X_U3LP_A } from '@xtoken/abis'
 * import { getXU3LPPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 *
 * const xu3lpContract = new ethers.Contract(ADDRESSES[X_U3LP_A][chainId], Abi.xU3LP, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXU3LPPrices(
 *   xu3lpContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XU3LP} xu3lpContract xU3LPa token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export const getXU3LPPrices = async (xu3lpContract) => {
    try {
        const { provider } = xu3lpContract;
        const [symbol, { token0Price, token1Price }, stakedTokenBalances, bufferTokenBalances, xu3lpTotalSupply, ethUsdcPrice,] = await Promise.all([
            xu3lpContract.symbol(),
            getXU3LPTokenPrices(xu3lpContract),
            xu3lpContract.getStakedTokenBalance(),
            xu3lpContract.getBufferTokenBalance(),
            xu3lpContract.totalSupply(),
            getEthUsdcPriceUniswapV3(provider),
        ]);
        const { chainId } = await provider.getNetwork();
        const assets = getLPTokenSymbol(symbol, chainId);
        const token0Balance = stakedTokenBalances.amount0.add(bufferTokenBalances.amount0);
        const token1Balance = stakedTokenBalances.amount1.add(bufferTokenBalances.amount1);
        const token0Value = token0Balance.mul(assets[0] !== USDC ? token0Price : DEC_18);
        const token1Value = token1Balance.mul(assets[1] !== USDC ? token1Price : DEC_18);
        let aum = token0Value.add(token1Value);
        let priceBtc = BigNumber.from('0');
        let priceEth = BigNumber.from('0');
        let priceUsd;
        if (symbol === X_U3LP_D) {
            priceEth = aum.div(xu3lpTotalSupply);
            priceUsd = priceEth.mul(parseEther(ethUsdcPrice)).div(DEC_18);
            // Convert AUM to USD from ETH
            aum = aum.mul(parseEther(ethUsdcPrice)).div(DEC_18);
        }
        else if (symbol === X_U3LP_E) {
            // TODO: Migrate to Uniswap V3 to fetch BTC price in USDC
            const btcUsdcPrice = await getBtcUsdcPrice(provider);
            priceBtc = aum.div(xu3lpTotalSupply);
            priceUsd = priceBtc.mul(parseEther(btcUsdcPrice)).div(DEC_18);
            // Convert AUM to USD from BTC
            aum = aum.mul(parseEther(btcUsdcPrice)).div(DEC_18);
        }
        else {
            priceUsd = aum.div(xu3lpTotalSupply);
            priceEth = priceUsd.mul(DEC_18).div(parseEther(ethUsdcPrice));
        }
        return {
            aum: formatNumber(formatEther(aum.div(DEC_18))),
            priceBtc: priceBtc.isZero() ? 0 : formatNumber(formatEther(priceBtc), 6),
            priceEth: formatNumber(formatEther(priceEth), 6),
            priceUsd: formatNumber(formatEther(priceUsd)),
        };
    }
    catch (e) {
        console.error('Error while fetching token price:', e);
        return DEFAULT_PRICES;
    }
};
export const getXU3LPTokenPrices = async (xu3lpContract) => {
    try {
        const [asset0Price, asset1Price] = await Promise.all([
            xu3lpContract.getAsset0Price(),
            xu3lpContract.getAsset1Price(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvcHJpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLFFBQVEsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRTFELE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHOUUsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQ3RELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUNqQyxhQUFvQixFQUNHLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxhQUFhLENBQUE7UUFDbEMsTUFBTSxDQUNKLE1BQU0sRUFDTixFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsRUFDNUIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsbUJBQW1CLENBQUMsYUFBYSxDQUFDO1lBQ2xDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTtZQUNyQyxhQUFhLENB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