import { BigNumber } from '@ethersproject/bignumber'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { Abi, ADDRESSES, ETH, USDC, WETH } from 'xtoken-abis'

import { DEC_18, Exchange } from '../../constants'
import { KyberProxy } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getExpectedRate, getTokenSymbol } from '../utils'

export const getBalances = async (
  symbol: ITokenSymbols,
  poolAddress: string,
  tokenPrice: number,
  kyberProxyContract: KyberProxy,
  provider: JsonRpcProvider,
  chainId: number,
  underlyingPrice?: BigNumber,
  isWeth?: boolean
) => {
  // Addresses
  const ethAddress = ADDRESSES[ETH] as string
  const usdcAddress = ADDRESSES[USDC][chainId]
  const xTokenAddress = ADDRESSES[symbol][chainId]

  // Contracts
  const xTokenContract = new ethers.Contract(xTokenAddress, Abi.ERC20, provider)

  // Balances
  const xTokenBalance = await xTokenContract.balanceOf(poolAddress)

  const ethPrice = await getExpectedRate(
    Exchange.INCH,
    kyberProxyContract,
    ethAddress,
    usdcAddress,
    parseEther('1')
  )

  const tokenVal = xTokenBalance
    .mul(parseEther(tokenPrice.toString()))
    .div(DEC_18)
  let ethVal = tokenVal
  let ethBalance = ethVal.mul(DEC_18).div(ethPrice)

  if (isWeth) {
    const wethAddress = ADDRESSES[WETH][chainId]
    const wethContract = new ethers.Contract(wethAddress, Abi.ERC20, provider)
    const wethBalance = await wethContract.balanceOf(poolAddress)

    ethBalance = wethBalance
    ethVal = wethBalance.mul(ethPrice).div(DEC_18)
  }

  let underlying
  let underlyingVal = BigNumber.from('0')

  if (underlyingPrice) {
    const tokenSymbol = getTokenSymbol(symbol)
    const underlyingToken = tokenSymbol.toUpperCase()
    const underlyingAddress = ADDRESSES[tokenSymbol][chainId]
    const underlyingContract = new ethers.Contract(
      underlyingAddress,
      Abi.ERC20,
      provider
    )
    const underlyingBalance = await underlyingContract.balanceOf(poolAddress)
    underlyingVal = underlyingBalance.mul(underlyingPrice).div(DEC_18)

    underlying = {
      name: underlyingToken,
      amt: formatEther(underlyingBalance),
      val: formatEther(underlyingVal),
    }
  }

  const totalVal = ethVal.add(tokenVal).add(underlyingVal)

  return {
    totalVal: formatEther(totalVal),
    token: {
      name: symbol,
      amt: formatEther(xTokenBalance),
      val: formatEther(tokenVal),
    },
    underlying,
    eth: {
      name: ETH.toUpperCase(),
      amt: formatEther(ethBalance),
      val: formatEther(ethVal),
    },
  }
}
