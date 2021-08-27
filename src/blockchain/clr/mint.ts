import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'

import { GAS_LIMIT_PERCENTAGE_DEFAULT } from '../../constants'
import { XAssetCLR } from '../../types'
import { IAssetId, IXAssetCLR } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { getSignerAddress } from '../utils'

import { getXAssetCLRContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXAssetCLR = async (
  symbol: IXAssetCLR,
  amount: BigNumber,
  inputAsset: IAssetId,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const {
    token0Contract,
    token1Contract,
    xAssetCLRContract,
  } = await getXAssetCLRContracts(symbol, provider)

  const tokenContract = inputAsset === 0 ? token0Contract : token1Contract

  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await tokenContract.estimateGas.approve(xAssetCLRContract.address, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return tokenContract.approve(xAssetCLRContract.address, amount, { gasLimit })
}

export const getExpectedQuantityOnMintXAssetCLR = async (
  symbol: IXAssetCLR,
  inputAsset: IAssetId,
  amount: string,
  provider: BaseProvider
): Promise<string> => {
  const inputAmount = parseEther(amount)
  const { xAssetCLRContract } = await getXAssetCLRContracts(symbol, provider)

  const {
    amount0Minted,
    amount1Minted,
  } = await xAssetCLRContract.calculateAmountsMintedSingleToken(
    inputAsset,
    inputAmount
  )

  const [liquidityAmount, totalSupply, totalLiquidity] = await Promise.all([
    xAssetCLRContract.getLiquidityForAmounts(amount0Minted, amount1Minted),
    xAssetCLRContract.totalSupply(),
    xAssetCLRContract.getTotalLiquidity(),
  ])

  const expectedQty = liquidityAmount.mul(totalSupply).div(totalLiquidity)

  return formatEther(expectedQty)
}

export const getPoolRatioXAssetCLR = async (
  symbol: IXAssetCLR,
  provider: BaseProvider
) => {
  const {
    uniswapLibraryContract,
    xAssetCLRContract,
  } = await getXAssetCLRContracts(symbol, provider)

  const [poolAddress, stakedBalance] = await Promise.all([
    xAssetCLRContract.poolAddress(),
    xAssetCLRContract.getStakedTokenBalance(),
  ])
  const midPrice = _formatPoolPrice(
    await uniswapLibraryContract.getPoolPrice(poolAddress)
  )

  return formatEther(
    stakedBalance.amount0.mul(midPrice).div(stakedBalance.amount1)
  )
}

export const mintXAssetCLR = async (
  symbol: IXAssetCLR,
  inputAsset: IAssetId,
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const {
    token0Contract,
    token1Contract,
    xAssetCLRContract,
  } = await getXAssetCLRContracts(symbol, provider)

  const address = await getSignerAddress(provider)
  const [approved0Amount, approved1Amount] = await Promise.all([
    _getApprovedAmount(token0Contract, xAssetCLRContract, address),
    _getApprovedAmount(token1Contract, xAssetCLRContract, address),
  ])

  if (approved0Amount.lt(amount) || approved1Amount.lt(amount)) {
    return Promise.reject(new Error('Please approve the tokens before minting'))
  }

  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await xAssetCLRContract.estimateGas.mint(inputAsset, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return xAssetCLRContract.mint(inputAsset, amount, {
    gasLimit,
  })
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xAssetCLRContract: XAssetCLR,
  address: string
) => {
  return tokenContract.allowance(address, xAssetCLRContract.address)
}

const _formatPoolPrice = (poolPrice: BigNumber) => {
  return parseEther(
    (
      poolPrice
        .pow(2)
        .mul(1e4)
        .shr(96 * 2)
        .toNumber() / 1e4
    ).toString()
  )
}
