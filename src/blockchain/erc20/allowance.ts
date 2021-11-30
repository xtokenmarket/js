import { BaseProvider } from '@ethersproject/providers'
import { LENDING_LPT } from '@xtoken/abis'
import { formatUnits } from 'ethers/lib/utils'

import { ERC20 } from '../../types'
import {
  ILPTokenSymbols,
  INativeAssets,
  IStableAssets,
  ITokenSymbols,
} from '../../types/xToken'
import { getContract } from '../utils'

export const getTokenAllowance = async (
  symbol:
    | INativeAssets
    | ITokenSymbols
    | ILPTokenSymbols
    | IStableAssets
    | typeof LENDING_LPT,
  address: string,
  spenderAddress: string,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const tokenContract = getContract(symbol, provider, network) as ERC20
  const [tokenAllowance, decimals] = await Promise.all([
    tokenContract.allowance(address, spenderAddress),
    tokenContract.decimals(),
  ])
  return formatUnits(tokenAllowance, decimals)
}
