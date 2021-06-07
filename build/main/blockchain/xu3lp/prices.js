'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXU3LPTokenPrices = exports.getXU3LPPrices = void 0
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../../utils')
const uniswap_1 = require('../exchanges/uniswap')
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
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXU3LPPrices = async (xu3lpContract, kyberProxyContract) => {
  try {
    const [
      { token0Price, token1Price },
      stakedTokenBalances,
      bufferTokenBalances,
      xu3lpTotalSupply,
      ethUsdcPrice,
    ] = await Promise.all([
      exports.getXU3LPTokenPrices(xu3lpContract),
      xu3lpContract.getStakedTokenBalance(),
      xu3lpContract.getBufferTokenBalance(),
      xu3lpContract.totalSupply(),
      uniswap_1.getEthUsdcPrice(kyberProxyContract.provider),
    ])
    const token0Balance = stakedTokenBalances.amount0.add(
      bufferTokenBalances.amount0
    )
    const token1Balance = stakedTokenBalances.amount1.add(
      bufferTokenBalances.amount1
    )
    const token0Value = token0Balance.mul(token0Price)
    const token1Value = token1Balance.mul(token1Price)
    const aum = token0Value.add(token1Value).div(constants_1.DEC_18)
    const priceUsd = aum.mul(constants_1.DEC_18).div(xu3lpTotalSupply)
    const priceEth = priceUsd
      .mul(constants_1.DEC_18)
      .div(utils_1.parseEther(ethUsdcPrice))
    return {
      aum: utils_2.formatNumber(utils_1.formatEther(aum)),
      priceEth: utils_2.formatNumber(utils_1.formatEther(priceEth), 6),
      priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return constants_1.DEFAULT_PRICES
  }
}
exports.getXU3LPPrices = getXU3LPPrices
const getXU3LPTokenPrices = async (xu3lpContract) => {
  try {
    const [asset0Price, asset1Price] = await Promise.all([
      xu3lpContract.getAsset0Price(),
      xu3lpContract.getAsset1Price(),
    ])
    const token0Price = utils_2.getTWAP(asset0Price)
    const token1Price = utils_2.getTWAP(asset1Price)
    return {
      token0Price,
      token1Price,
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return constants_1.DEFAULT_TOKEN_PRICES
  }
}
exports.getXU3LPTokenPrices = getXU3LPTokenPrices
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvcHJpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDRDQUEwRDtBQUUxRCwrQ0FBOEU7QUFHOUUsdUNBQW1EO0FBQ25ELGtEQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0ksTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUNqQyxhQUFvQixFQUNwQixrQkFBOEIsRUFDUCxFQUFFO0lBQ3pCLElBQUk7UUFDRixNQUFNLENBQ0osRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEVBQzVCLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDYixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQiwyQkFBbUIsQ0FBQyxhQUFhLENBQUM7WUFDbEMsYUFBYSxDQUFDLHFCQUFxQixFQUFFO1lBQ3JDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTtZQUNyQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQzNCLHlCQUFlLENBQUMsa0JBQWtCLENBQUMsUUFBd0IsQ0FBQztTQUM3RCxDQUFDLENBQUE7UUFFRixNQUFNLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNuRCxtQkFBbUIsQ0FBQyxPQUFPLENBQzVCLENBQUE7UUFDRCxNQUFNLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNuRCxtQkFBbUIsQ0FBQyxPQUFPLENBQzVCLENBQUE7UUFFRCxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2xELE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7UUFFbEQsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO1FBQ3BELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0MsQ0FBQyxDQUFBO1FBQ3RFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFFbkUsT0FBTztZQUNMLEdBQUcsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsUUFBUSxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEQsUUFBUSxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QyxDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDckQsT0FBTywwQkFBYyxDQUFBO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFBO0FBMUNZLFFBQUEsY0FBYyxrQkEwQzFCO0FBRU0sTUFBTSxtQkFBbUIsR0FBRyxLQUFLLEVBQ3RDLGFBQW9CLEVBSW5CLEVBQUU7SUFDSCxJQUFJO1FBQ0YsTUFBTSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDbkQsYUFBYSxDQUFDLGNBQWMsRUFBRTtZQUM5QixhQUFhLENBQUMsY0FBYyxFQUFFO1NBQy9CLENBQUMsQ0FBQTtRQUVGLE1BQU0sV0FBVyxHQUFHLGVBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN4QyxNQUFNLFdBQVcsR0FBRyxlQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7UUFFeEMsT0FBTztZQUNMLFdBQVc7WUFDWCxXQUFXO1NBQ1osQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3JELE9BQU8sZ0NBQW9CLENBQUE7S0FDNUI7QUFDSCxDQUFDLENBQUE7QUF2QlksUUFBQSxtQkFBbUIsdUJBdUIvQiJ9
