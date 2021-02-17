import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract, ethers } from 'ethers'
import { ETH, KNC, X_KNC_A, X_KNC_B } from 'xtoken-abis'

import { DEC_18 } from '../../constants'
import { UniswapV2Pair } from '../../types'
import { ILiquidityPoolItem } from '../../types/xToken'
import {
  getContract,
  getUniswapPoolAddress,
  getUniswapPoolContract,
} from '../utils'
import { getXKncPrices } from '../xknc'
import { getXKncContracts } from '../xknc/helper'

import { getBalances } from './helper'

const { formatEther, parseEther } = ethers.utils

export const getUniswapPortfolioItem = async (
  symbol: typeof X_KNC_A | typeof X_KNC_B,
  address: string,
  provider: JsonRpcProvider
): Promise<null | ILiquidityPoolItem> => {
  const { kyberProxyContract, network, xkncContract } = await getXKncContracts(
    symbol,
    provider
  )
  const { chainId } = network

  // Addresses
  const asset = `${symbol}<>${ETH.toUpperCase()}`
  const uniswapPoolAddress = getUniswapPoolAddress(symbol, chainId) as string

  // Contracts
  const kncContract = getContract(KNC, provider, network)
  const uniswapPoolContract = getUniswapPoolContract(
    symbol,
    provider,
    chainId
  ) as UniswapV2Pair

  const userBalance = await uniswapPoolContract.balanceOf(address)

  const { priceUsd } = await getXKncPrices(
    xkncContract,
    kncContract as Contract,
    kyberProxyContract,
    chainId
  )

  const uniswapPoolBalances = await getBalances(
    symbol,
    uniswapPoolAddress,
    priceUsd,
    kyberProxyContract,
    provider,
    chainId,
    undefined,
    true
  )

  const xkncEthPoolSupply = await uniswapPoolContract.totalSupply()
  const poolPrice = parseEther(uniswapPoolBalances.totalVal)
    .mul(DEC_18)
    .div(xkncEthPoolSupply)
  const value = poolPrice.mul(userBalance).div(DEC_18)

  return {
    asset,
    balances: uniswapPoolBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice: priceUsd,
    value: formatEther(value),
  }
}
