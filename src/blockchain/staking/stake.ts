import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'

import { getXtkStakingContract } from './helper'

export const stakeXtk = async (amount: string, provider: BaseProvider) => {
  const bnAmount = parseEther(amount)
  if (bnAmount.lte(BigNumber.from(0))) {
    return Promise.reject(new Error('Received invalid staking amount'))
  }

  const stakingContract = await getXtkStakingContract(provider)
  return stakingContract.stake(bnAmount)
}
