import { BaseProvider } from '@ethersproject/providers'
import { Contract } from 'ethers'
import { ExchangeRates, TradeAccounting, XSNX } from '../../types'
import { ITokenPrices } from '../../types/xToken'
/**
 * @example
 * ```typescript
 * import { ethers } from 'ethers'
 * import { Abi, ADDRESSES, EXCHANGE_RATES, TRADE_ACCOUNTING, SNX, X_SNX_A, X_SNX_A_ADMIN } from '@xtoken/abis'
 * import { getXSnxPrices } from '@xtoken/js'
 *
 * const provider = new ethers.providers.InfuraProvider('homestead', <INFURA_API_KEY>)
 * const network = await provider.getNetwork()
 * const { chainId } = network
 *
 * const xsnxContract = new ethers.Contract(ADDRESSES[X_SNX_A][chainId], Abi.xSNX, provider)
 * const snxContract = new ethers.Contract(ADDRESSES[SNX][chainId], Abi.Synthetix, provider)
 * const exchangeRatesContract = new ethers.Contract(ADDRESSES[EXCHANGE_RATES][chainId], Abi.ExchangeRates, provider)
 * const tradeAccountingContract = new ethers.Contract(ADDRESSES[TRADE_ACCOUNTING][chainId], Abi.TradeAccounting, provider)
 *
 * const { priceEth, priceUsd } = await getXSnxPrices(
 *   xsnxContract,
 *   ADDRESSES[X_SNX_A_ADMIN][chainId],
 *   tradeAccountingContract,
 *   exchangeRatesContract,
 *   snxContract,
 *   provider
 * )
 * ```
 *
 * @param {XSNX} xsnxContract xSNXa token contract
 * @param {string} xsnxAdminAddress XSNX contract admin address
 * @param {TradeAccounting} tradeAccountingContract Trade accounting contract
 * @param {ExchangeRates} exchangeRatesContract Exchange rates contract
 * @param {Contract} snxContract SNX contract
 * @param {BaseProvider} provider Ether.js Provider
 * @returns A promise of the token prices in ETH/USD along with AUM
 */
export declare const getXSnxPrices: (
  xsnxContract: XSNX,
  xsnxAdminAddress: string,
  tradeAccountingContract: TradeAccounting,
  exchangeRatesContract: ExchangeRates,
  snxContract: Contract,
  provider: BaseProvider
) => Promise<ITokenPrices>
