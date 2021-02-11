import { JsonRpcProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { XINCH } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { getUserAvailableTokenBalance } from '../utils'

import { getXInchContracts } from './helper'
import { getXInchPrices } from './prices'

export const getPortfolioItemXInch = async (
  symbol: ITokenSymbols,
  address: string,
  provider: JsonRpcProvider
): Promise<IPortfolioItem> => {
  const {
    kyberProxyContract,
    network,
    xinchContract,
  } = await getXInchContracts(symbol, provider)
  const { chainId } = network

  const xinchBal = await getUserAvailableTokenBalance(xinchContract, address)

  const { priceUsd } = await getXInchPrices(
    xinchContract,
    kyberProxyContract,
    chainId
  )
  const xinchValue = (xinchBal * priceUsd).toFixed(2)

  const tokenEquivalent = await getUnderlyingTokenEquivalent(
    xinchContract,
    address
  )

  return {
    symbol,
    quantity: xinchBal.toString(),
    price: priceUsd.toString(),
    value: xinchValue.toString(),
    tokenEquivalent,
  }
}

const getUnderlyingTokenEquivalent = async (
  xinchContract: XINCH,
  address: string
) => {
  const [userXinchBal, inchHoldings, xinchSupply] = await Promise.all([
    xinchContract.balanceOf(address),
    xinchContract.getNav(),
    xinchContract.totalSupply(),
  ])

  const userTokenEquivalent = inchHoldings.mul(userXinchBal).div(xinchSupply)
  return formatEther(userTokenEquivalent)
}
