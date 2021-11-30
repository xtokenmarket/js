import { AddressZero } from '@ethersproject/constants'
import { BaseProvider } from '@ethersproject/providers'
import { abi as QuoterAbi } from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import {
  ADDRESSES,
  BUY,
  ETH,
  // LINK,
  USDC,
  WBTC,
  WETH,
  // X_AAVE_A,
  // X_BNT_A,
  // X_INCH_A,
  // X_INCH_B,
} from '@xtoken/abis'
import { BigNumber, Contract } from 'ethers'
import { formatEther, formatUnits, parseUnits } from 'ethers/lib/utils'

import { DEC_18 } from '../../constants'
import { ERC20 } from '../../types'
import { ILevToken, ITokenSymbols, ITradeType } from '../../types/xToken'
import { getContract, getSigner, getTokenSymbol } from '../utils'

const FEES = BigNumber.from('3000') // 0.3% for xAssetCLR swaps
const MIN_PRICE = BigNumber.from('4295128740') // asset0 -> asset1 swap
const MAX_PRICE = BigNumber.from(
  '1461446703485210103287273052203988822378723970341'
) // asset1 -> asset0 swap
const QUOTER_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'

export const getUniswapV3EstimatedQty = async (
  tokenIn: typeof ETH | ITokenSymbols,
  symbol: ITokenSymbols | ILevToken,
  amount: string,
  tradeType: ITradeType,
  fees: BigNumber | undefined,
  provider: BaseProvider
) => {
  const { chainId } = await provider.getNetwork()
  const quoterContract = new Contract(
    QUOTER_ADDRESS,
    QuoterAbi,
    getSigner(provider)
  )

  const isTradeBuy = tradeType === BUY
  const wethAddress = ADDRESSES[WETH][chainId]

  let assetAddress: string
  let xAssetAddress = AddressZero
  if (symbol === WBTC) {
    assetAddress = ADDRESSES[symbol][chainId]
  } else {
    const tokenSymbol = getTokenSymbol(symbol as ITokenSymbols)
    assetAddress = ADDRESSES[tokenSymbol][chainId]
    xAssetAddress = ADDRESSES[symbol][chainId]
  }

  // If asset0 is not xAsset in xAssetCLR token
  // const isAsset0Native =
  //   symbol === X_AAVE_A ||
  //   symbol == X_BNT_A ||
  //   symbol === X_INCH_A ||
  //   symbol === X_INCH_B

  let tokenInAddress
  let tokenOutAddress
  // let priceLimit
  let tokenInDecimals = 18
  let tokenOutDecimals = 18

  if (isTradeBuy) {
    tokenInAddress = tokenIn === ETH ? wethAddress : assetAddress
    tokenOutAddress = tokenIn === ETH ? assetAddress : xAssetAddress
    // priceLimit = isAsset0Native ? MIN_PRICE : MAX_PRICE

    if (symbol === WBTC) {
      tokenOutDecimals = 8
    }
  } else {
    tokenInAddress = tokenIn === ETH ? assetAddress : xAssetAddress
    tokenOutAddress = tokenIn === ETH ? wethAddress : assetAddress
    // priceLimit = isAsset0Native ? MAX_PRICE : MIN_PRICE

    if (symbol === WBTC) {
      tokenInDecimals = 8
    }
  }

  const estimateQty = await quoterContract.callStatic.quoteExactInputSingle(
    tokenInAddress,
    tokenOutAddress,
    fees || FEES,
    parseUnits(amount, tokenInDecimals),
    // priceLimit
    // In case of Token0 to Token1 trade, the price limit is `MIN_PRICE` and the reverse would be `MAX_PRICE`
    BigNumber.from(tokenOutAddress).gt(BigNumber.from(tokenInAddress))
      ? MIN_PRICE
      : MAX_PRICE
  )

  return formatUnits(estimateQty, tokenOutDecimals)
}

export const getEthUsdcPriceUniswapV3 = async (provider: BaseProvider) => {
  const { chainId } = await provider.getNetwork()
  const quoterContract = new Contract(QUOTER_ADDRESS, QuoterAbi, provider)

  const usdcAddress = ADDRESSES[USDC][chainId]
  const wethAddress = ADDRESSES[WETH][chainId]

  const quantity = await quoterContract.callStatic.quoteExactInputSingle(
    wethAddress,
    usdcAddress,
    FEES,
    DEC_18,
    // In case of Token0 to Token1 trade, the price limit is `MIN_PRICE` and the reverse would be `MAX_PRICE`
    BigNumber.from(usdcAddress).gt(BigNumber.from(wethAddress))
      ? MIN_PRICE
      : MAX_PRICE
  )

  return formatUnits(quantity, 6)
}

export const getTokenEthPriceUniswapV3 = async (
  symbol: ILevToken,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const quoterContract = new Contract(QUOTER_ADDRESS, QuoterAbi, provider)

  const tokenContract = getContract(symbol, provider, network) as ERC20
  const wethAddress = ADDRESSES[WETH][chainId]

  const tokenDecimals = await tokenContract.decimals()

  const quantity = await quoterContract.callStatic.quoteExactInputSingle(
    tokenContract.address,
    wethAddress,
    FEES,
    parseUnits('1', tokenDecimals),
    // In case of Token0 to Token1 trade, the price limit is `MIN_PRICE` and the reverse would be `MAX_PRICE`
    BigNumber.from(wethAddress).gt(BigNumber.from(tokenContract.address))
      ? MIN_PRICE
      : MAX_PRICE
  )

  return formatEther(quantity)
}
