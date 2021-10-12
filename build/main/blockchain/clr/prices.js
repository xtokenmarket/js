'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXAssetCLRTokenPrices = exports.getXAssetCLRPrices = void 0
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
 * import { Abi, ADDRESSES, KYBER_PROXY, AAVE_X_AAVE_A_CLR } from '@xtoken/abis'
 * import { getXAssetCLRPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 *
 * const xAssetCLRContract = new ethers.Contract(ADDRESSES[AAVE_X_AAVE_A_CLR][chainId], Abi.xAssetCLR, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXAssetCLRPrices(
 *   xAssetCLRContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XAssetCLR} xAssetCLRContract xAssetCLR token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXAssetCLRPrices = async (xAssetCLRContract, kyberProxyContract) => {
  try {
    const [
      symbol,
      { token0Price, token1Price },
      stakedTokenBalances,
      bufferTokenBalances,
      xAssetCLRTotalSupply,
      ethUsdcPrice,
    ] = await Promise.all([
      xAssetCLRContract.symbol(),
      exports.getXAssetCLRTokenPrices(xAssetCLRContract),
      xAssetCLRContract.getStakedTokenBalance(),
      xAssetCLRContract.getBufferTokenBalance(),
      xAssetCLRContract.totalSupply(),
      uniswap_1.getEthUsdcPrice(kyberProxyContract.provider),
    ])
    const assets = utils_3.getXAssetCLRTokenSymbol(symbol)
    const token0Balance = stakedTokenBalances.amount0.add(
      bufferTokenBalances.amount0
    )
    const token1Balance = stakedTokenBalances.amount1.add(
      bufferTokenBalances.amount1
    )
    let isToken0 = true
    let aum = ethers_1.BigNumber.from('0')
    switch (symbol) {
      case abis_1.X_AAVE_B_AAVE_CLR:
      case abis_1.X_ALPHA_A_ALPHA_CLR:
      case abis_1.X_KNC_A_KNC_CLR:
      case abis_1.X_KNC_B_KNC_CLR:
      case abis_1.X_SNX_A_SNX_CLR:
        aum = token1Balance
          .mul(token1Price)
          .div(constants_1.DEC_18)
          .add(token0Balance)
        break
      case abis_1.AAVE_X_AAVE_A_CLR:
      case abis_1.BNT_X_BNT_A_CLR:
      case abis_1.INCH_X_INCH_A_CLR:
      case abis_1.INCH_X_INCH_B_CLR:
      case abis_1.XTK_ETH_CLR:
        isToken0 = false
        aum = token0Balance
          .mul(token0Price)
          .div(constants_1.DEC_18)
          .add(token1Balance)
        break
    }
    let priceEth
    let priceUsd
    if (symbol === abis_1.XTK_ETH_CLR) {
      priceEth = aum.mul(constants_1.DEC_18).div(xAssetCLRTotalSupply)
      priceUsd = priceEth
        .mul(utils_1.parseEther(ethUsdcPrice))
        .div(constants_1.DEC_18)
      // Convert AUM to USD from ETH
      aum = aum.mul(utils_1.parseEther(ethUsdcPrice))
    } else {
      const { priceUsd: xAssetPriceUsd } = await utils_3.getXAssetPrices(
        isToken0 ? assets[0] : assets[1],
        kyberProxyContract.provider
      )
      aum = aum.mul(utils_1.parseEther(xAssetPriceUsd.toString()))
      priceUsd = aum.div(xAssetCLRTotalSupply)
      priceEth = priceUsd
        .mul(constants_1.DEC_18)
        .div(utils_1.parseEther(ethUsdcPrice))
    }
    return {
      aum: utils_2.formatNumber(
        utils_1.formatEther(aum.div(constants_1.DEC_18))
      ),
      priceBtc: 0,
      priceEth: utils_2.formatNumber(utils_1.formatEther(priceEth), 6),
      priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return constants_1.DEFAULT_PRICES
  }
}
exports.getXAssetCLRPrices = getXAssetCLRPrices
const getXAssetCLRTokenPrices = async (XAssetCLR) => {
  try {
    const [asset0Price, asset1Price] = await Promise.all([
      XAssetCLR.getAsset0Price(),
      XAssetCLR.getAsset1Price(),
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
exports.getXAssetCLRTokenPrices = getXAssetCLRTokenPrices
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vY2xyL3ByaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FXcUI7QUFDckIsbUNBQWtDO0FBQ2xDLDRDQUEwRDtBQUUxRCwrQ0FBOEU7QUFHOUUsdUNBQW1EO0FBQ25ELGtEQUFzRDtBQUN0RCxvQ0FBbUU7QUFFbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNJLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxFQUNyQyxpQkFBNEIsRUFDNUIsa0JBQThCLEVBQ1AsRUFBRTtJQUN6QixJQUFJO1FBQ0YsTUFBTSxDQUNKLE1BQU0sRUFDTixFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsRUFDNUIsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQixvQkFBb0IsRUFDcEIsWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtZQUMxQiwrQkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQyxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRTtZQUN6QyxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRTtZQUN6QyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7WUFDL0IseUJBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUF3QixDQUFDO1NBQzdELENBQUMsQ0FBQTtRQUVGLE1BQU0sTUFBTSxHQUFHLCtCQUF1QixDQUFDLE1BQW9CLENBQUMsQ0FBQTtRQUU1RCxNQUFNLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNuRCxtQkFBbUIsQ0FBQyxPQUFPLENBQzVCLENBQUE7UUFDRCxNQUFNLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNuRCxtQkFBbUIsQ0FBQyxPQUFPLENBQzVCLENBQUE7UUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENB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
