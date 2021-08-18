import { BaseProvider } from '@ethersproject/providers'
import { parseEther } from 'ethers/lib/utils'

import { getXtkStakingContract } from './helper'

export const unstakeXXtkA = async (amount: string, provider: BaseProvider) => {
  const stakingContract = await getXtkStakingContract(provider)
  return stakingContract.unstake(parseEther(amount))
}
