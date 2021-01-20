import { JsonRpcProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { XINCH } from '../../types'
import { IPortfolioItem, ITokenSymbols } from '../../types/xToken'
import { formatNumberWithCommas } from '../../utils'
import { getUserAvailableTokenBalance } from '../utils'

import { getXInchContracts } from './helper'
import { getXInchPrices } from './prices'

export const getPortfolioItemXInch = async (
  symbol: ITokenSymbols,
  address: string,
  provider: JsonRpcProvider
): Promise<IPortfolioItem> => {
  const {
    inchLiquidityProtocolContract,
    network,
    xinchContract,
  } = await getXInchContracts(symbol, provider)
  const { chainId } = network

  const xinchBal = await getUserAvailableTokenBalance(xinchContract, address)

  const { priceUsd } = await getXInchPrices(
    xinchContract,
    inchLiquidityProtocolContract,
    chainId
  )
  const xinchValue = (xinchBal * priceUsd).toFixed(2)

  const tokenEquivalent = await getUnderlyingTokenEquivalent(
    xinchContract,
    address
  )

  return {
    symbol,
    quantity: formatNumberWithCommas(xinchBal.toString()),
    price: `$${priceUsd}`,
    value: `$${formatNumberWithCommas(xinchValue)}`,
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
  const tokenEquivalent = formatEther(userTokenEquivalent)

  if (Number(tokenEquivalent) < 1000) return Number(tokenEquivalent).toFixed(4)
  return formatNumberWithCommas(tokenEquivalent)
}
