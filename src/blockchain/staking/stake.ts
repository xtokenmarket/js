import { BaseProvider } from '@ethersproject/providers'
import { parseEther } from 'ethers/lib/utils'

import { getXtkStakingContract } from './helper'

// TODO: Add `approve` tokens method

export const stakeXtk = async (amount: string, provider: BaseProvider) => {
  const stakingContract = await getXtkStakingContract(provider)
  // TODO: Add check if tokens have been pre-approved or not
  return stakingContract.stake(parseEther(amount))
}
