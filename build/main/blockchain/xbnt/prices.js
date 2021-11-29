'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXBntPrices = void 0
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../../utils')
const bancor_1 = require('../exchanges/bancor')
const uniswap_1 = require('../exchanges/uniswap')
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, X_BNT_A } from '@xtoken/abis'
 * import { getXBntPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const xbntContract = new ethers.Contract(ADDRESSES[X_BNT_A][chainId], Abi.xBNT, provider)
 *
 * const { priceEth, priceUsd } = await getXBntPrices(xbntContract)
 * ```
 *
 * @param {XBNT} xbntContract xBNTa token contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXBntPrices = async (xbntContract) => {
  try {
    const { provider } = xbntContract
    const [
      xbntTotalSupply,
      xbntBntBal,
      bntEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xbntContract.totalSupply(),
      xbntContract.getNav(),
      bancor_1.getBntEthPrice(provider),
      uniswap_1.getEthUsdcPrice(provider),
    ])
    const bntUsdPrice = utils_1
      .parseEther(bntEthPrice)
      .mul(utils_1.parseEther(ethUsdcPrice))
      .div(constants_1.DEC_18)
    const xbntPerToken = xbntBntBal.mul(constants_1.DEC_18).div(xbntTotalSupply)
    const priceUsd = xbntPerToken.mul(bntUsdPrice).div(constants_1.DEC_18)
    const priceEth = priceUsd
      .mul(constants_1.DEC_18)
      .div(utils_1.parseEther(ethUsdcPrice))
    const aum = priceUsd.mul(xbntTotalSupply).div(constants_1.DEC_18)
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
exports.getXBntPrices = getXBntPrices
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGJudC9wcmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNENBQTBEO0FBRTFELCtDQUF3RDtBQUd4RCx1Q0FBMEM7QUFDMUMsZ0RBQW9EO0FBQ3BELGtEQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSSxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLFlBQWtCLEVBQ0ssRUFBRTtJQUN6QixJQUFJO1FBQ0YsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLFlBQVksQ0FBQTtRQUVqQyxNQUFNLENBQ0osZUFBZSxFQUNmLFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNiLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3BCLFlBQVksQ0FBQyxXQUFXLEVBQUU7WUFDMUIsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUNyQix1QkFBYyxDQUFDLFFBQXdCLENBQUM7WUFDeEMseUJBQWUsQ0FBQyxRQUF3QixDQUFDO1NBQzFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sV0FBVyxHQUFHLGtCQUFVLENBQUMsV0FBVyxDQUFDO2FBQ3hDLEdBQUcsQ0FBQyxrQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdCLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7UUFDZCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDaEUsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO1FBQzFELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFDbkUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO1FBRXJELE9BQU87WUFDTCxHQUFHLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxRQUFRLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRCxRQUFRLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyRCxPQUFPLDBCQUFjLENBQUE7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUFuQ1ksUUFBQSxhQUFhLGlCQW1DekIifQ==
