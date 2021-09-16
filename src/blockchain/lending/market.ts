import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import {
  ADDRESSES,
  KNC,
  KYBER_PROXY,
  LENDING_LIQUIDITY_POOL,
  LENDING_X_AAVE_A_MARKET,
  LENDING_X_AAVE_B_MARKET,
  LENDING_X_INCH_A_MARKET,
  LENDING_X_INCH_B_MARKET,
  LENDING_X_KNC_A_MARKET,
  LENDING_X_KNC_B_MARKET,
  X_AAVE_A,
  X_AAVE_B,
  X_INCH_A,
  X_INCH_B,
  X_KNC_A,
  X_KNC_B,
} from '@xtoken/abis'
import { BigNumber, Contract } from 'ethers'
import { parseEther } from 'ethers/lib/utils'

import { DEC_18, Errors } from '../../constants'
import { KyberProxy, XAAVE, XINCH, XKNC } from '../../types'
import { ILendingMarket, ILendingMarketInfo } from '../../types/xToken'
import { getTokenBalance } from '../erc20'
import { getContract, getSignerAddress } from '../utils'
import { getXAavePrices } from '../xaave'
import { getXInchPrices } from '../xinch'
import { getXKncPrices } from '../xknc'

import { getMarketContracts } from './helper'

/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
export const getBorrowingLimit = async (
  marketName: ILendingMarket,
  provider: BaseProvider,
  address?: string
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  if (!address) {
    address = await getSignerAddress(provider)
  }
  const borrowingLimit = await marketContract.borrowingLimit(address)
  return formatEther(borrowingLimit)
}

/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
export const getCollateral = async (
  marketName: ILendingMarket,
  provider: BaseProvider,
  address: string
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const collateral = await marketContract.collateral(address)
  return formatEther(collateral)
}

// TODO: Refactor to leverage `getXAssetPrices()` utils method
export const getLendingMarkets = async (
  provider: BaseProvider
): Promise<readonly ILendingMarketInfo[]> => {
  const network = await provider.getNetwork()
  const { chainId } = network

  const kncContract = getContract(KNC, provider, network) as Contract
  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy

  // xAAVE
  const xaaveaContract = getContract(X_AAVE_A, provider, network) as XAAVE
  const xaavebContract = getContract(X_AAVE_B, provider, network) as XAAVE

  // xINCH
  const xinchaContract = getContract(X_INCH_A, provider, network) as XINCH
  const xinchbContract = getContract(X_INCH_B, provider, network) as XINCH

  // xKNC
  const xkncaContract = getContract(X_KNC_A, provider, network) as XKNC
  const xkncbContract = getContract(X_KNC_B, provider, network) as XKNC

  try {
    const [
      xaaveaPrices,
      xaavebPrices,
      xinchaPrices,
      xinchbPrices,
      xkncaPrices,
      xkncbPrices,
    ] = await Promise.all([
      getXAavePrices(xaaveaContract, kyberProxyContract, chainId),
      getXAavePrices(xaavebContract, kyberProxyContract, chainId),
      getXInchPrices(xinchaContract, kyberProxyContract, chainId),
      getXInchPrices(xinchbContract, kyberProxyContract, chainId),
      getXKncPrices(xkncaContract, kncContract, kyberProxyContract),
      getXKncPrices(xkncbContract, kncContract, kyberProxyContract),
    ])

    const [
      xaaveaLendingCollateral,
      xaavebLendingCollateral,
      xinchaLendingCollateral,
      xinchbLendingCollateral,
      xkncaLendingCollateral,
      xkncbLendingCollateral,
    ] = await Promise.all([
      getTokenBalance(
        X_AAVE_A,
        ADDRESSES[LENDING_X_AAVE_A_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_AAVE_B,
        ADDRESSES[LENDING_X_AAVE_B_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_INCH_A,
        ADDRESSES[LENDING_X_INCH_A_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_INCH_B,
        ADDRESSES[LENDING_X_INCH_B_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_KNC_A,
        ADDRESSES[LENDING_X_KNC_A_MARKET][chainId],
        provider
      ),
      getTokenBalance(
        X_KNC_B,
        ADDRESSES[LENDING_X_KNC_B_MARKET][chainId],
        provider
      ),
    ])

    return [
      {
        name: LENDING_X_AAVE_A_MARKET,
        xAsset: X_AAVE_A,
        collateral: xaaveaLendingCollateral,
        value: formatEther(
          parseEther(xaaveaLendingCollateral)
            .mul(parseEther(xaaveaPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
      {
        name: LENDING_X_AAVE_B_MARKET,
        xAsset: X_AAVE_B,
        collateral: xaavebLendingCollateral,
        value: formatEther(
          parseEther(xaavebLendingCollateral)
            .mul(parseEther(xaavebPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
      {
        name: LENDING_X_INCH_A_MARKET,
        xAsset: X_INCH_A,
        collateral: xinchaLendingCollateral,
        value: formatEther(
          parseEther(xinchaLendingCollateral)
            .mul(parseEther(xinchaPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
      {
        name: LENDING_X_INCH_B_MARKET,
        xAsset: X_INCH_B,
        collateral: xinchbLendingCollateral,
        value: formatEther(
          parseEther(xinchbLendingCollateral)
            .mul(parseEther(xinchbPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
      {
        name: LENDING_X_KNC_A_MARKET,
        xAsset: X_KNC_A,
        collateral: xkncaLendingCollateral,
        value: formatEther(
          parseEther(xkncaLendingCollateral)
            .mul(parseEther(xkncaPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
      {
        name: LENDING_X_KNC_B_MARKET,
        xAsset: X_KNC_B,
        collateral: xkncbLendingCollateral,
        value: formatEther(
          parseEther(xkncbLendingCollateral)
            .mul(parseEther(xkncbPrices.priceUsd.toString()))
            .div(DEC_18)
        ),
      },
    ]
  } catch (e) {
    console.warn('Error while fetching lending markets', e)
    return Promise.reject(new Error('Error while fetching lending markets'))
  }
}

/**
 * Add xAsset collateral to a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export const supplyCollateral = async (
  marketName: ILendingMarket,
  amount: BigNumber,
  provider: BaseProvider
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const address = await getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmount(marketName, address, provider)
  if (approvedAmount.lt(amount)) {
    return Promise.reject(
      new Error('Please approve the tokens before adding collateral')
    )
  }
  return marketContract.collateralize(amount)
}

/**
 * Withdraw xAsset collateral from a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
export const withdrawCollateral = async (
  marketName: ILendingMarket,
  amount: BigNumber,
  provider: BaseProvider
) => {
  const marketContracts = await getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  return marketContract.withdraw(amount)
}

const _getApprovedAmount = async (
  marketName: ILendingMarket,
  address: string,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  let xTokenContract

  switch (marketName) {
    case LENDING_X_AAVE_A_MARKET:
      xTokenContract = getContract(X_AAVE_A, provider, network)
      break
    case LENDING_X_AAVE_B_MARKET:
      xTokenContract = getContract(X_AAVE_B, provider, network)
      break
    case LENDING_X_INCH_A_MARKET:
      xTokenContract = getContract(X_INCH_A, provider, network)
      break
    case LENDING_X_INCH_B_MARKET:
      xTokenContract = getContract(X_INCH_B, provider, network)
      break
    case LENDING_X_KNC_A_MARKET:
      xTokenContract = getContract(X_KNC_A, provider, network)
      break
    case LENDING_X_KNC_B_MARKET:
      xTokenContract = getContract(X_KNC_B, provider, network)
  }

  if (!xTokenContract) {
    return Promise.reject(new Error(Errors.CONTRACT_INITIALIZATION_FAILED))
  }

  return xTokenContract.allowance(
    address,
    ADDRESSES[LENDING_LIQUIDITY_POOL][network.chainId]
  )
}
