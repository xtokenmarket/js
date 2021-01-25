import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import {
  AAVE,
  ADDRESSES,
  BUY,
  ETH,
  SNX,
  WETH,
  X_AAVE_A,
  X_AAVE_A_BALANCER_POOL,
  X_AAVE_B,
  X_AAVE_B_BALANCER_POOL,
  X_SNX_A,
  X_SNX_A_BALANCER_POOL,
} from 'xtoken-abis'
import ERC20Abi from 'xtoken-abis/build/main/abi/ERC20.json'

import { BalancerPool } from '../../types'
import { ITokenSymbols, ITradeType } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getBalancerContract } from '../utils'

const { formatEther, parseEther } = ethers.utils

export const getBalancerEstimatedQuantity = async (
  tokenIn: typeof ETH | ITokenSymbols,
  symbol: ITokenSymbols,
  amount: string,
  tradeType: ITradeType,
  provider: JsonRpcProvider
) => {
  const network = await provider.getNetwork()
  const { chainId } = network

  let tokenInSymbol
  let poolSymbol

  switch (symbol) {
    case X_AAVE_A:
      tokenInSymbol = tokenIn === ETH ? WETH : AAVE
      poolSymbol = X_AAVE_A_BALANCER_POOL
      break
    case X_AAVE_B:
      tokenInSymbol = tokenIn === ETH ? WETH : AAVE
      poolSymbol = X_AAVE_B_BALANCER_POOL
      break
    case X_SNX_A:
      tokenInSymbol = tradeType === BUY && tokenIn === X_SNX_A ? SNX : WETH
      poolSymbol = X_SNX_A_BALANCER_POOL
      break
    default:
      return '0'
  }

  const tokenInAddress = ADDRESSES[tokenInSymbol][chainId]
  const tokenOutAddress = ADDRESSES[symbol][chainId]
  const poolAddress = ADDRESSES[poolSymbol][chainId]

  const balancerContract = getBalancerContract(
    symbol,
    provider,
    network
  ) as BalancerPool
  const tokenInContract = new ethers.Contract(
    tokenInAddress,
    ERC20Abi,
    process.env.NODE_ENV === 'test' ? provider : provider.getSigner()
  )
  const tokenOutContract = new ethers.Contract(
    tokenOutAddress,
    ERC20Abi,
    process.env.NODE_ENV === 'test' ? provider : provider.getSigner()
  )

  const [
    tokenInBalance,
    tokenInWeight,
    tokenOutBalance,
    tokenOutWeight,
    swapFee,
  ] = await Promise.all([
    tokenInContract.balanceOf(poolAddress),
    balancerContract.getDenormalizedWeight(tokenInAddress),
    tokenOutContract.balanceOf(poolAddress),
    balancerContract.getDenormalizedWeight(tokenOutAddress),
    balancerContract.getSwapFee(),
  ])

  const calcOutGivenIn = await balancerContract.calcOutGivenIn(
    tradeType === BUY ? tokenInBalance : tokenOutBalance,
    tradeType === BUY ? tokenInWeight : tokenOutWeight,
    tradeType === BUY ? tokenOutBalance : tokenInBalance,
    tradeType === BUY ? tokenOutWeight : tokenInWeight,
    parseEther(amount),
    swapFee
  )

  return formatNumber(
    formatEther(calcOutGivenIn),
    tradeType === BUY ? 0 : 3
  ).toString()
}
