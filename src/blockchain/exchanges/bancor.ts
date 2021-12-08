import { BigNumber } from '@ethersproject/bignumber'
import { BaseProvider } from '@ethersproject/providers'
import {
  Abi,
  ADDRESSES,
  BANCOR_CONTRACT_REGISTRY,
  BNT,
  BUY,
  ETH,
  X_BNT_A,
} from '@xtoken/abis'
import { Contract } from 'ethers'
import { formatBytes32String, formatEther, parseEther } from 'ethers/lib/utils'

import { BNT_ETH_PATH, DEC_18 } from '../../constants'
import { BancorNetwork, BancorSmartToken } from '../../types'
import { ILiquidityPoolItem, ITradeType } from '../../types/xToken'
import { getBancorPoolContract, getSigner, getTokenSymbol } from '../utils'
import { getXBntPrices } from '../xbnt'
import { getXBntContracts } from '../xbnt/helper'

import { getBalances } from './helper'
import { getEthUsdcPrice } from './uniswap'

export const getBancorNetworkAddress = async (
  provider: BaseProvider
): Promise<string> => {
  const network = await provider.getNetwork()
  const { chainId } = network

  const ContractRegistry = new Contract(
    ADDRESSES[BANCOR_CONTRACT_REGISTRY][chainId],
    Abi.BancorContractRegistry,
    getSigner(provider)
  )
  const bancorNetworkName = formatBytes32String('BancorNetwork')

  return ContractRegistry.addressOf(bancorNetworkName)
}

export const getBntEthPrice = async (
  provider: BaseProvider
): Promise<string> => {
  const bancorNetworkAddress = await getBancorNetworkAddress(provider)
  const BancorNetworkContract = new Contract(
    bancorNetworkAddress,
    Abi.BancorNetwork,
    getSigner(provider)
  ) as BancorNetwork

  const rate = await BancorNetworkContract.rateByPath(
    BNT_ETH_PATH,
    parseEther('1')
  )
  return formatEther(rate)
}

export const getBancorEstimatedQuantity = async (
  tokenIn: typeof ETH | typeof X_BNT_A,
  symbol: typeof X_BNT_A,
  amount: string,
  tradeType: ITradeType,
  provider: BaseProvider
): Promise<string> => {
  const network = await provider.getNetwork()
  const { chainId } = network

  const inputAmount = parseEther(amount)
  const token = getTokenSymbol(symbol)

  // Bancor Network Contract
  const bancorNetworkAddress = await getBancorNetworkAddress(provider)
  const BancorNetworkContract = new Contract(
    bancorNetworkAddress,
    Abi.BancorNetwork,
    getSigner(provider)
  ) as BancorNetwork

  // Addresses
  const bntAddress = ADDRESSES[token][chainId]
  const xbntAddress = ADDRESSES[symbol][chainId]
  let tokenInAddress: string
  let tokenOutAddress: string

  if (tradeType === BUY) {
    tokenInAddress = tokenIn === ETH ? (ADDRESSES[ETH] as string) : bntAddress
    tokenOutAddress = xbntAddress
  } else {
    tokenInAddress = xbntAddress
    tokenOutAddress = tokenIn === ETH ? (ADDRESSES[ETH] as string) : bntAddress
  }

  const path = await BancorNetworkContract.conversionPath(
    tokenInAddress,
    tokenOutAddress
  )

  const rate = await BancorNetworkContract.rateByPath(path, inputAmount)
  return formatEther(rate)
}

export const getBancorPortfolioItem = async (
  symbol: typeof X_BNT_A,
  address: string,
  provider: BaseProvider
): Promise<ILiquidityPoolItem> => {
  const { network, xbntContract } = await getXBntContracts(symbol, provider)
  const { chainId } = network

  const asset = `${symbol} - ${BNT.toUpperCase()}`

  // Pool address which has `xBNTa` and `BNT` balances
  const bancorPoolAddress = '0xA35Cf3bDF58EF1cE6a9657659Ebe4cD8b491F2cE'

  // Contracts
  const bancorPoolContract = getBancorPoolContract(
    symbol,
    provider,
    chainId
  ) as BancorSmartToken

  let userBalance = BigNumber.from('0')
  try {
    userBalance = await bancorPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }

  const [ethUsdcPrice, bntEthPrice] = await Promise.all([
    getEthUsdcPrice(provider),
    getBntEthPrice(provider),
  ])
  const underlyingPrice = parseEther(bntEthPrice)
    .mul(parseEther(ethUsdcPrice))
    .div(DEC_18)

  const { priceUsd } = await getXBntPrices(xbntContract)

  const bancorPoolBalances = await getBalances(
    symbol,
    bancorPoolAddress,
    priceUsd,
    provider,
    chainId,
    underlyingPrice,
    false
  )

  const xbntBntPoolSupply = await bancorPoolContract.totalSupply()
  const poolPrice = parseEther(bancorPoolBalances.totalVal)
    .mul(DEC_18)
    .div(xbntBntPoolSupply)
  const value = poolPrice.mul(userBalance).div(DEC_18)

  return {
    asset,
    balances: bancorPoolBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice: priceUsd,
    value: formatEther(value),
  }
}
