import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

import { getXtkStakingContract } from './helper'

export const unstakeXXtkA = async (
  provider: BaseProvider,
  amount: BigNumber
) => {
  const stakingContract = await getXtkStakingContract(provider)
  return stakingContract.unstake(amount)
}
