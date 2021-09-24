import { BaseProvider } from '@ethersproject/providers'
import { abi as QuoterAbi } from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import {
  ADDRESSES,
  BUY,
  X_AAVE_A,
  X_BNT_A,
  X_INCH_A,
  X_INCH_B,
} from '@xtoken/abis'
import { BigNumber, Contract } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { ITokenSymbols, ITradeType } from '../../types/xToken'
import { getSigner, getTokenSymbol } from '../utils'

const FEES = BigNumber.from('3000') // 0.3% for xAssetCLR swaps
const MIN_PRICE = BigNumber.from('4295128740') // asset0 -> asset1 swap
const MAX_PRICE = BigNumber.from(
  '1461446703485210103287273052203988822378723970341'
) // asset1 -> asset0 swap
const QUOTER_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'

export const getUniswapV3EstimatedQty = async (
  symbol: ITokenSymbols,
  amount: string,
  tradeType: ITradeType,
  provider: BaseProvider
) => {
  const { chainId } = await provider.getNetwork()
  const quoterContract = new Contract(
    QUOTER_ADDRESS,
    QuoterAbi,
    getSigner(provider)
  )

  const isTradeBuy = tradeType === BUY
  const tokenSymbol = getTokenSymbol(symbol)

  const assetAddress = ADDRESSES[tokenSymbol][chainId]
  const xAssetAddress = ADDRESSES[symbol][chainId]

  // If asset0 is not xAsset in xAssetCLR token
  const isAsset0Native =
    symbol === X_AAVE_A ||
    symbol == X_BNT_A ||
    symbol === X_INCH_A ||
    symbol === X_INCH_B

  let tokenInAddress
  let tokenOutAddress
  let priceLimit

  if (isTradeBuy) {
    tokenInAddress = assetAddress
    tokenOutAddress = xAssetAddress
    priceLimit = isAsset0Native ? MIN_PRICE : MAX_PRICE
  } else {
    tokenInAddress = xAssetAddress
    tokenOutAddress = assetAddress
    priceLimit = isAsset0Native ? MAX_PRICE : MIN_PRICE
  }

  const estimateQty = await quoterContract.callStatic.quoteExactInputSingle(
    tokenInAddress,
    tokenOutAddress,
    FEES,
    parseEther(amount),
    priceLimit
  )

  return formatEther(estimateQty)
}
