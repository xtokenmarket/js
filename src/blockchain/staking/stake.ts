import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

import { getXtkStakingContract } from './helper'

export const stakeXtk = async (provider: BaseProvider, amount: BigNumber) => {
  if (amount.lte(BigNumber.from(0))) return

  const stakingContract = await getXtkStakingContract(provider)
  return stakingContract.stake(amount)
}
