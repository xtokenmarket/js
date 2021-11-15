import { BaseProvider } from '@ethersproject/providers'
import { Abi, ADDRESSES, LENDING_LPT } from '@xtoken/abis'
import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

import { ERC20 } from '../../types'
import { INativeAssets, IStableAssets, ITokenSymbols } from '../../types/xToken'

export const getTokenSupply = async (
  symbol: INativeAssets | ITokenSymbols | IStableAssets | typeof LENDING_LPT,
  provider: BaseProvider
) => {
  const { chainId } = await provider.getNetwork()
  const tokenAddress = ADDRESSES[symbol][chainId]
  const contract = new ethers.Contract(
    tokenAddress,
    Abi.ERC20,
    provider
  ) as ERC20
  const [totalSupply, decimals] = await Promise.all([
    contract.totalSupply(),
    contract.decimals(),
  ])
  return formatUnits(totalSupply, decimals)
}
