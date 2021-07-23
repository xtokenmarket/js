import { BigNumber } from '@ethersproject/bignumber'
import { Contract, ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { USDC, USDT } from '@xtoken/abis'
import { BigNumberish, ethers } from 'ethers'

import { DEC_18, GAS_LIMIT_PERCENTAGE_DEFAULT } from '../../constants'
import { XU3LP } from '../../types'
import { ILPTokenSymbols, IU3LPAssetId } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { getLPTokenSymbol, getSignerAddress, parseFees } from '../utils'

import { getXU3LPContracts } from './helper'

const { formatEther, parseEther } = ethers.utils

export const approveXU3LP = async (
  symbol: ILPTokenSymbols,
  amount: BigNumber,
  inputAsset: IU3LPAssetId,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const {
    token0Contract,
    token1Contract,
    xu3lpContract,
  } = await getXU3LPContracts(symbol, provider)

  const tokenContract = inputAsset === 0 ? token0Contract : token1Contract

  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await tokenContract.estimateGas.approve(xu3lpContract.address, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return tokenContract.approve(xu3lpContract.address, amount, { gasLimit })
}

export const getExpectedQuantityOnMintXU3LP = async (
  symbol: ILPTokenSymbols,
  inputAsset: IU3LPAssetId,
  amount: string,
  provider: BaseProvider
): Promise<string> => {
  const { xu3lpContract } = await getXU3LPContracts(symbol, provider)

  const [nav, totalSupply, { mintFee }] = await Promise.all([
    xu3lpContract.getNav(),
    xu3lpContract.totalSupply(),
    xu3lpContract.feeDivisors(),
  ])

  const MINT_FEE = parseFees(mintFee)
  let expectedQty = parseEther(amount)
    .mul(totalSupply as BigNumberish)
    .div(nav as BigNumberish)

  // Get amount in `asset1` terms for token 0
  if (!inputAsset) {
    expectedQty = await xu3lpContract.getAmountInAsset1Terms(expectedQty)
  }

  return formatEther(expectedQty.mul(MINT_FEE).div(DEC_18))
}

export const mintXU3LP = async (
  symbol: ILPTokenSymbols,
  inputAsset: IU3LPAssetId,
  amount: BigNumber,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const {
    token0Contract,
    token1Contract,
    xu3lpContract,
  } = await getXU3LPContracts(symbol, provider)
  const assets = getLPTokenSymbol(symbol)
  const tokenContract = inputAsset === 0 ? token0Contract : token1Contract

  const address = await getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmount(
    tokenContract,
    xu3lpContract,
    address
  )

  // Parse 18 decimals `amount` to 6 decimals
  if ([USDC, USDT].includes(assets[inputAsset])) {
    amount = amount.div('1000000000000')
  }

  if (approvedAmount.lt(amount)) {
    return Promise.reject(new Error('Please approve the tokens before minting'))
  }

  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await xu3lpContract.estimateGas.mintWithToken(inputAsset, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return xu3lpContract.mintWithToken(inputAsset, amount, {
    gasLimit,
  })
}

const _getApprovedAmount = async (
  tokenContract: Contract,
  xu3lpContract: XU3LP,
  address: string
) => {
  return tokenContract.allowance(address, xu3lpContract.address)
}
