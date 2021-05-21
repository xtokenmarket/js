'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXInchPrices = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../../utils')
const uniswap_1 = require('../exchanges/uniswap')
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, INCH_LIQUIDITY_PROTOCOL, X_INCH_A } from '@xtoken/abis'
 * import { getXInchPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xinchContract = new ethers.Contract(ADDRESSES[X_INCH_A][chainId], Abi.xINCH, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXInchPrices(
 *   xinchContract,
 *   kyberProxyContract,
 *   chainId
 * )
 * ```
 *
 * @param {XINCH} xinchContract xINCHa/xINCHb token contract
 * @param {KyberProxy} kyberProxyContract Kyber proxy contract
 * @param {number} chainId Connected network's ID, 1 for Mainnet
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXInchPrices = async (xinchContract, kyberProxyContract, chainId) => {
  try {
    const inchAddress = abis_1.ADDRESSES[abis_1.INCH][chainId]
    const [
      xinchTotalSupply,
      inchHoldings,
      inchEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xinchContract.totalSupply(),
      xinchContract.getNav(),
      uniswap_1.getEthTokenPrice(
        inchAddress,
        true,
        kyberProxyContract.provider
      ),
      uniswap_1.getEthUsdcPrice(kyberProxyContract.provider),
    ])
    const inchUsdPrice = utils_1
      .parseEther(inchEthPrice)
      .mul(utils_1.parseEther(ethUsdcPrice))
      .div(constants_1.DEC_18)
    const inchPerToken = inchHoldings
      .mul(constants_1.DEC_18)
      .div(xinchTotalSupply)
    const priceUsd = inchPerToken.mul(inchUsdPrice).div(constants_1.DEC_18)
    const priceEth = priceUsd
      .mul(constants_1.DEC_18)
      .div(utils_1.parseEther(ethUsdcPrice))
    const aum = priceUsd.mul(xinchTotalSupply).div(constants_1.DEC_18)
    return {
      aum: utils_2.formatNumber(utils_1.formatEther(aum), 0),
      priceEth: utils_2.formatNumber(utils_1.formatEther(priceEth), 6),
      priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return constants_1.DEFAULT_PRICES
  }
}
exports.getXInchPrices = getXInchPrices
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvcHJpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUE4QztBQUM5Qyw0Q0FBMEQ7QUFFMUQsK0NBQXdEO0FBR3hELHVDQUEwQztBQUMxQyxrREFBd0U7QUFFeEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSSxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQ2pDLGFBQW9CLEVBQ3BCLGtCQUE4QixFQUM5QixPQUFlLEVBQ1EsRUFBRTtJQUN6QixJQUFJO1FBQ0YsTUFBTSxXQUFXLEdBQUcsZ0JBQVMsQ0FBQyxXQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUU1QyxNQUFNLENBQ0osZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixZQUFZLEVBQ1osWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0QiwwQkFBZ0IsQ0FDZCxXQUFXLEVBQ1gsSUFBSSxFQUNKLGtCQUFrQixDQUFDLFFBQXdCLENBQzVDO1lBQ0QseUJBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUF3QixDQUFDO1NBQzdELENBQUMsQ0FBQTtRQUVGLE1BQU0sWUFBWSxHQUFHLGtCQUFVLENBQUMsWUFBWSxDQUFDO2FBQzFDLEdBQUcsQ0FBQyxrQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdCLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFDZCxNQUFNLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUNuRSxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFDM0QsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtRQUNuRSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtRQUV0RCxPQUFPO1lBQ0wsR0FBRyxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsUUFBUSxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEQsUUFBUSxFQUFFLG9CQUFZLENBQUMsbUJBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QyxDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDckQsT0FBTywwQkFBYyxDQUFBO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFBO0FBekNZLFFBQUEsY0FBYyxrQkF5QzFCIn0=
