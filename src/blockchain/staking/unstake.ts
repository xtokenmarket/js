import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

import { getXtkStakingContract } from './helper'

export const unstakeXXtkA = async (
  provider: BaseProvider,
  amount: BigNumber
) => {
  if (amount.lte(BigNumber.from(0))) return

  const stakingContract = await getXtkStakingContract(provider)
  return stakingContract.unstake(amount)
}
