'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXKncPrices = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../../utils')
const uniswap_1 = require('../exchanges/uniswap')
const utils_3 = require('../utils')
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KNC, KYBER_PROXY, X_KNC_A } from '@xtoken/abis'
 * import { getXKncPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 *
 * const xkncContract = new ethers.Contract(ADDRESSES[X_KNC_A][chainId], Abi.xKNC, provider)
 * const kncContract = new ethers.Contract(ADDRESSES[KNC][chainId], Abi.ERC20, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXKncPrices(
 *   xkncContract,
 *   kncContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XKNC} xkncContract xKNCa/xKNCb token contract
 * @param {Contract} kncContract KNC token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXKncPrices = async (xkncContract, kncContract, kyberProxyContract) => {
  try {
    const proxyValue = utils_1.parseEther('1')
    const ethAddress = abis_1.ADDRESSES[abis_1.ETH]
    const [
      xkncTotalSupply,
      xkncKncBal,
      kncEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xkncContract.totalSupply(),
      xkncContract.getFundKncBalanceTwei(),
      utils_3.getExpectedRate(
        kyberProxyContract,
        kncContract.address,
        ethAddress,
        proxyValue
      ),
      uniswap_1.getEthUsdcPrice(kyberProxyContract.provider),
    ])
    const kncUsdcPrice = kncEthPrice
      .mul(utils_1.parseEther(ethUsdcPrice))
      .div(constants_1.DEC_18)
    const priceUsd = xkncKncBal.mul(kncUsdcPrice).div(xkncTotalSupply)
    const priceEth = priceUsd
      .mul(constants_1.DEC_18)
      .div(utils_1.parseEther(ethUsdcPrice))
    const aum = priceUsd.mul(xkncTotalSupply).div(constants_1.DEC_18)
    return {
      priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
      priceEth: utils_2.formatNumber(utils_1.formatEther(priceEth), 6),
      aum: utils_2.formatNumber(utils_1.formatEther(aum), 0),
    }
  } catch (e) {
    console.error('Error while fetching token price:', e)
    return constants_1.DEFAULT_PRICES
  }
}
exports.getXKncPrices = getXKncPrices
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9wcmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQTZDO0FBRTdDLDRDQUEwRDtBQUUxRCwrQ0FBd0Q7QUFHeEQsdUNBQTBDO0FBQzFDLGtEQUFzRDtBQUN0RCxvQ0FBMEM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNJLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsWUFBa0IsRUFDbEIsV0FBcUIsRUFDckIsa0JBQThCLEVBQ1AsRUFBRTtJQUN6QixJQUFJO1FBQ0YsTUFBTSxVQUFVLEdBQUcsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQyxNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLFVBQUcsQ0FBVyxDQUFBO1FBRTNDLE1BQU0sQ0FDSixlQUFlLEVBQ2YsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ2IsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEIsWUFBWSxDQUFDLFdBQVcsRUFBRTtZQUMxQixZQUFZLENBQUMscUJBQXFCLEVBQUU7WUFDcEMsdUJBQWUsQ0FDYixrQkFBa0IsRUFDbEIsV0FBVyxDQUFDLE9BQU8sRUFDbkIsVUFBVSxFQUNWLFVBQVUsQ0FDWDtZQUNELHlCQUFlLENBQUMsa0JBQWtCLENBQUMsUUFBd0IsQ0FBQztTQUM3RCxDQUFDLENBQUE7UUFFRixNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLGtCQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO1FBQzFFLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ2xFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFDbkUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO1FBRXJELE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLFFBQVEsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELEdBQUcsRUFBRSxvQkFBWSxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZDLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyRCxPQUFPLDBCQUFjLENBQUE7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUF4Q1ksUUFBQSxhQUFhLGlCQXdDekIifQ==
