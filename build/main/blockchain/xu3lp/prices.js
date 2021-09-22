'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXU3LPTokenPrices = exports.getXU3LPPrices = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../../utils')
const uniswap_1 = require('../exchanges/uniswap')
const utils_3 = require('../utils')
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
      symbol,
      { token0Price, token1Price },
      stakedTokenBalances,
      bufferTokenBalances,
      xu3lpTotalSupply,
      ethUsdcPrice,
    ] = await Promise.all([
      xu3lpContract.symbol(),
      exports.getXU3LPTokenPrices(xu3lpContract),
      xu3lpContract.getStakedTokenBalance(),
      xu3lpContract.getBufferTokenBalance(),
      xu3lpContract.totalSupply(),
      uniswap_1.getEthUsdcPrice(kyberProxyContract.provider),
    ])
    const assets = utils_3.getLPTokenSymbol(symbol)
    const token0Balance = stakedTokenBalances.amount0.add(
      bufferTokenBalances.amount0
    )
    const token1Balance = stakedTokenBalances.amount1.add(
      bufferTokenBalances.amount1
    )
    const token0Value = token0Balance.mul(
      assets[0] !== abis_1.USDC ? token0Price : constants_1.DEC_18
    )
    const token1Value = token1Balance.mul(
      assets[1] !== abis_1.USDC ? token1Price : constants_1.DEC_18
    )
    let aum = token0Value.add(token1Value)
    let priceBtc = ethers_1.BigNumber.from('0')
    let priceEth = ethers_1.BigNumber.from('0')
    let priceUsd
    if (symbol === abis_1.X_U3LP_D) {
      priceEth = aum.div(xu3lpTotalSupply)
      priceUsd = priceEth
        .mul(utils_1.parseEther(ethUsdcPrice))
        .div(constants_1.DEC_18)
      // Convert AUM to USD from ETH
      aum = aum.mul(utils_1.parseEther(ethUsdcPrice)).div(constants_1.DEC_18)
    } else if (symbol === abis_1.X_U3LP_E) {
      const btcUsdcPrice = await uniswap_1.getBtcUsdcPrice(
        kyberProxyContract.provider
      )
      priceBtc = aum.div(xu3lpTotalSupply)
      priceUsd = priceBtc
        .mul(utils_1.parseEther(btcUsdcPrice))
        .div(constants_1.DEC_18)
      // Convert AUM to USD from BTC
      aum = aum.mul(utils_1.parseEther(btcUsdcPrice)).div(constants_1.DEC_18)
    } else {
      priceUsd = aum.div(xu3lpTotalSupply)
      priceEth = priceUsd
        .mul(constants_1.DEC_18)
        .div(utils_1.parseEther(ethUsdcPrice))
    }
    return {
      aum: utils_2.formatNumber(
        utils_1.formatEther(aum.div(constants_1.DEC_18))
      ),
      priceBtc: priceBtc.isZero()
        ? 0
        : utils_2.formatNumber(utils_1.formatEther(priceBtc), 6),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvcHJpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUF1RDtBQUN2RCxtQ0FBZ0Q7QUFDaEQsNENBQTBEO0FBRTFELCtDQUE4RTtBQUc5RSx1Q0FBbUQ7QUFDbkQsa0RBQXVFO0FBQ3ZFLG9DQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0ksTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUNqQyxhQUFvQixFQUNwQixrQkFBOEIsRUFDUCxFQUFFO0lBQ3pCLElBQUk7UUFDRixNQUFNLENBQ0osTUFBTSxFQUNOLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxFQUM1QixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixZQUFZLEVBQ2IsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEIsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0QiwyQkFBbUIsQ0FBQyxhQUFhLENBQUM7WUFDbEMsYUFBYSxDQUFDLHFCQUFxQixFQUFFO1lBQ3JDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTtZQUNyQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQzNCLHlCQUFlLENBQUMsa0JBQWtCLENBQUMsUUFBd0IsQ0FBQztTQUM3RCxDQUFDLENBQUE7UUFFRixNQUFNLE1BQU0sR0FBRyx3QkFBZ0IsQ0FBQyxNQUF5QixDQUFDLENBQUE7UUFFMUQsTUFBTSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDbkQsbUJBQW1CLENBQUMsT0FBTyxDQUM1QixDQUFBO1FBQ0QsTUFBTSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDbkQsbUJBQW1CLENBQUMsT0FBTyxDQUM1QixDQUFBO1FBRUQsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FD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