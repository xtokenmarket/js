import { BaseProvider } from '@ethersproject/providers'
import { Abi, ADDRESSES, LENDING_LPT } from '@xtoken/abis'
import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

import { ERC20 } from '../../types'
import { INativeAssets, IStableAssets, ITokenSymbols } from '../../types/xToken'

export const getTokenBalance = async (
  symbol: INativeAssets | ITokenSymbols | IStableAssets | typeof LENDING_LPT,
  address: string,
  provider: BaseProvider
) => {
  const { chainId } = await provider.getNetwork()
  const tokenAddress = ADDRESSES[symbol][chainId]
  const contract = new ethers.Contract(
    tokenAddress,
    Abi.ERC20,
    provider
  ) as ERC20
  const [tokenBalance, decimals] = await Promise.all([
    contract.balanceOf(address),
    contract.decimals(),
  ])
  return formatUnits(tokenBalance, decimals)
}
