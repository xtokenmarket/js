import { BaseProvider } from '@ethersproject/providers'
import { formatEther } from 'ethers/lib/utils'

import { ERC20 } from '../../types'
import {
  ILPTokenSymbols,
  INativeAssets,
  IStableAssets,
  ITokenSymbols,
} from '../../types/xToken'
import { getContract } from '../utils'

export const getTokenAllowance = async (
  symbol: INativeAssets | ITokenSymbols | ILPTokenSymbols | IStableAssets,
  address: string,
  spenderAddress: string,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()
  const tokenContract = (await getContract(symbol, provider, network)) as ERC20
  const tokenAllowance = await tokenContract.allowance(address, spenderAddress)
  return formatEther(tokenAllowance)
}
