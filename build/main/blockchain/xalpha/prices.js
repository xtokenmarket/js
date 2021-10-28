'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXAlphaPrices = void 0
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../../utils')
const uniswap_1 = require('../exchanges/uniswap')
const uniswap_2 = require('../exchanges/uniswap')
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, KYBER_PROXY, X_ALPHA_A } from '@xtoken/abis'
 * import { getXAlphaPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xalphaContract = new ethers.Contract(ADDRESSES[X_ALPHA_A][chainId], Abi.xALPHA, provider)
 * const kyberProxyContract = new ethers.Contract(ADDRESSES[KYBER_PROXY][chainId], Abi.KyberProxy, provider)
 *
 * const { priceEth, priceUsd } = await getXAlphaPrices(
 *   xalphaContract,
 *   kyberProxyContract,
 * )
 * ```
 *
 * @param {XALPHA} xalphaContract xALPHAa token contract
 * @param {KyberProxy} kyberProxyContract Kyber Proxy contract
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
const getXAlphaPrices = async (xalphaContract, kyberProxyContract) => {
  try {
    const { chainId } = await kyberProxyContract.provider.getNetwork()
    const alphaAddress = abis_1.ADDRESSES[abis_1.ALPHA][chainId]
    const [
      xalphaTotalSupply,
      xalphaAlphaBal,
      alphaEthPrice,
      ethUsdcPrice,
    ] = await Promise.all([
      xalphaContract.totalSupply(),
      xalphaContract.getNav(),
      uniswap_1.getEthTokenPrice(
        alphaAddress,
        true,
        kyberProxyContract.provider
      ),
      uniswap_2.getEthUsdcPrice(kyberProxyContract.provider),
    ])
    const alphaUsdPrice = utils_1
      .parseEther(alphaEthPrice)
      .mul(utils_1.parseEther(ethUsdcPrice))
      .div(constants_1.DEC_18)
    const xalphaPerToken = xalphaAlphaBal
      .mul(constants_1.DEC_18)
      .div(xalphaTotalSupply)
    const priceUsd = xalphaPerToken.mul(alphaUsdPrice).div(constants_1.DEC_18)
    const priceEth = priceUsd
      .mul(constants_1.DEC_18)
      .div(utils_1.parseEther(ethUsdcPrice))
    const aum = priceUsd.mul(xalphaTotalSupply).div(constants_1.DEC_18)
    return {
      aum: utils_2.formatNumber(utils_1.formatEther(aum), 0),
      priceEth: utils_2.formatNumber(utils_1.formatEther(priceEth), 6),
      priceUsd: utils_2.formatNumber(utils_1.formatEther(priceUsd)),
    }
  } catch (e) {
    console.error('Error fetching token price: ', e)
    return constants_1.DEFAULT_PRICES
  }
}
exports.getXAlphaPrices = getXAlphaPrices
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL3ByaWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBK0M7QUFDL0MsNENBQTBEO0FBRTFELCtDQUF3RDtBQUd4RCx1Q0FBMEM7QUFDMUMsa0RBQXVEO0FBQ3ZELGtEQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSSxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQ2xDLGNBQXNCLEVBQ3RCLGtCQUE4QixFQUNQLEVBQUU7SUFDekIsSUFBSTtRQUNGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNsRSxNQUFNLFlBQVksR0FBRyxnQkFBUyxDQUFDLFlBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRTlDLE1BQU0sQ0FDSixpQkFBaUIsRUFDakIsY0FBYyxFQUNkLGFBQWEsRUFDYixZQUFZLEVBQ2IsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEIsY0FBYyxDQUFDLFdBQVcsRUFBRTtZQUM1QixjQUFjLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLDBCQUFnQixDQUNkLFlBQVksRUFDWixJQUFJLEVBQ0osa0JBQWtCLENBQUMsUUFBd0IsQ0FDNUM7WUFDRCx5QkFBZSxDQUFDLGtCQUFrQixDQUFDLFFBQXdCLENBQUM7U0FDN0QsQ0FBQyxDQUFBO1FBRUYsTUFBTSxhQUFhLEdBQUcsa0JBQVUsQ0FBQyxhQUFhLENBQUM7YUFDNUMsR0FBRyxDQUFDLGtCQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDN0IsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtRQUNkLE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQ3hFLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtRQUM5RCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQ25FLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO1FBRXZELE9BQU87WUFDTCxHQUFHLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxRQUFRLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRCxRQUFRLEVBQUUsb0JBQVksQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlDLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNoRCxPQUFPLDBCQUFjLENBQUE7S0FDdEI7QUFDSCxDQUFDLENBQUE7QUF6Q1ksUUFBQSxlQUFlLG1CQXlDM0IifQ==
