import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

import { getXtkStakingContract } from './helper'

export const stakeXtk = async (provider: BaseProvider, amount: string) => {
  const bnAmount = BigNumber.from(amount)
  if (bnAmount.lte(BigNumber.from(0))) return

  const stakingContract = await getXtkStakingContract(provider)
  return stakingContract.stake(bnAmount)
}
