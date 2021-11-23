import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero, HashZero, One, Two, Zero } from '@ethersproject/constants'
import { BaseProvider } from '@ethersproject/providers'
import {
  Abi,
  ADDRESSES,
  BALANCER_V2_VAULT,
  BUY,
  ETH,
  SNX,
  WETH,
  X_SNX_A,
} from '@xtoken/abis'
import { ethers } from 'ethers'

import {
  DEC_18,
  SNX_BALANCER_V2_POOL_ID,
  X_SNX_A_BALANCER_V2_POOL_ID,
} from '../../constants'
import { BalancerPool, BalancerV2Vault, XSNX } from '../../types'
import {
  ILiquidityPoolItem,
  ITokenSymbols,
  ITradeType,
} from '../../types/xToken'
import { formatNumber } from '../../utils'
import { getBalancerPoolContract, getSigner, getTokenSymbol } from '../utils'
import { getXSnxPrices } from '../xsnx'

import { getBalances } from './helper'

const { formatEther, parseEther } = ethers.utils

export const getBalancerV2EstimatedQuantity = async (
  tokenIn: typeof ETH | typeof X_SNX_A,
  symbol: typeof X_SNX_A,
  amount: string,
  tradeType: ITradeType,
  provider: BaseProvider
) => {
  try {
    const network = await provider.getNetwork()
    const { chainId } = network

    const isEth = tokenIn === ETH
    const isBuy = tradeType === BUY

    // Addresses
    const snxAddress = ADDRESSES[SNX][chainId]
    const wethAddress = ADDRESSES[WETH][chainId]
    const xsnxAddress = ADDRESSES[symbol][chainId]

    const tokenInAddress = isBuy ? wethAddress : xsnxAddress
    const tokenOutAddress = isBuy ? xsnxAddress : wethAddress

    const balancerV2VaultContract = getBalancerV2VaultContract(
      provider,
      chainId
    )

    const funds = {
      sender: AddressZero,
      fromInternalBalance: false,
      recipient: AddressZero,
      toInternalBalance: false,
    }

    const swap = {
      poolId: X_SNX_A_BALANCER_V2_POOL_ID,
      kind: 0, // SwapKind.GIVEN_IN
      amount: parseEther(amount),
      userData: HashZero,
    }

    let assets = [tokenInAddress, tokenOutAddress]
    if (!isEth) {
      assets = [...assets, snxAddress]
    }

    const batchSwapStep = {
      poolId: swap.poolId,
      kind: swap.kind,
      assetInIndex: Zero,
      assetOutIndex: One,
      amount: !isEth && isBuy ? Zero : swap.amount,
      userData: swap.userData,
    }

    let batchSwapStep2
    if (!isEth) {
      batchSwapStep2 = {
        poolId: SNX_BALANCER_V2_POOL_ID,
        kind: 0, // SwapKind.GIVEN_IN
        assetInIndex: isBuy ? Two : One,
        assetOutIndex: isBuy ? Zero : Two,
        amount: isBuy ? swap.amount : Zero,
        userData: swap.userData,
      }
    }

    const batchSwapSteps = !isEth
      ? isBuy
        ? [batchSwapStep2, batchSwapStep]
        : [batchSwapStep, batchSwapStep2]
      : [batchSwapStep]

    const result = await balancerV2VaultContract.callStatic.queryBatchSwap(
      swap.kind,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      batchSwapSteps,
      assets,
      funds
    )

    return formatNumber(
      formatEther(result[!isEth && !isBuy ? 2 : 1]).replace('-', ''),
      4
    ).toString()
  } catch (e) {
    console.error('Error while fetching Balancer V2 estimate:', e)
    return '0'
  }
}

export const getBalancerV2PortfolioItem = async (
  symbol: ITokenSymbols,
  address: string,
  provider: BaseProvider
): Promise<ILiquidityPoolItem> => {
  const network = await provider.getNetwork()
  const { chainId } = network

  const tokenSymbol = getTokenSymbol(symbol)
  const underlying = tokenSymbol.toUpperCase()

  // Addresses
  const asset = `${symbol} - ${ETH.toUpperCase()} - ${underlying}`
  const balancerPoolAddress = '0xBA12222222228d8Ba445958a75a0704d566BF2C8' // Balancer V2 Vault address
  const xTokenAddress = ADDRESSES[symbol][chainId]

  // Contracts
  const balancerPoolContract = getBalancerPoolContract(
    symbol,
    provider,
    chainId
  ) as BalancerPool
  const balancerV2VaultContract = getBalancerV2VaultContract(provider, chainId)
  const xtokenContract = new ethers.Contract(xTokenAddress, Abi.ERC20, provider)

  let userBalance = BigNumber.from('0')
  try {
    userBalance = await balancerPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }

  const {
    balances: [xTokenBalance, ethBalance],
  } = await balancerV2VaultContract.getPoolTokens(X_SNX_A_BALANCER_V2_POOL_ID)

  let tokenPrice = 0

  try {
    switch (symbol) {
      case X_SNX_A: {
        const { priceUsd } = await getXSnxPrices(xtokenContract as XSNX)
        tokenPrice = priceUsd
        break
      }
    }
  } catch (e) {
    console.error(e)
  }

  const balancerContractBalances = await getBalances(
    symbol,
    balancerPoolAddress,
    tokenPrice,
    provider,
    chainId,
    undefined,
    true,
    xTokenBalance,
    ethBalance
  )

  const bptTokenSupply = await balancerPoolContract.totalSupply()
  const poolPrice = parseEther(balancerContractBalances.eth.val)
    .mul(4)
    .mul(DEC_18)
    .div(bptTokenSupply)
  const value = poolPrice.mul(userBalance).div(DEC_18)

  return {
    asset,
    balances: balancerContractBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice,
    value: formatEther(value),
  }
}

const getBalancerV2VaultContract = (
  provider: BaseProvider,
  chainId: number
) => {
  const signer = getSigner(provider)
  const balancerV2VaultAddress = ADDRESSES[BALANCER_V2_VAULT][chainId]
  return new ethers.Contract(
    balancerV2VaultAddress,
    Abi.BalancerV2Vault,
    signer
  ) as BalancerV2Vault
}
