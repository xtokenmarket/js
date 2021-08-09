import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

import { getXtkStakingContract } from './helper'

export const stakeXtk = async (provider: BaseProvider, amount: BigNumber) => {
  const stakingContract = await getXtkStakingContract(provider)
  return stakingContract.stake(amount)
}
