import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

import { getContract } from '../utils'

export const unstakeXXtkA = async (
  provider: BaseProvider,
  amount: BigNumber
) => {
  const network = await provider.getNetwork()
  const stakingContract = getContract(
    'xtkManagementStakingModule',
    provider,
    network
  )
  if (!stakingContract) return null

  return stakingContract.unstake(amount)
}
