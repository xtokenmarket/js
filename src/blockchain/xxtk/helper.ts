import { BaseProvider } from '@ethersproject/providers'

import { getContract } from '../utils'

export const getXXtkContracts = async (provider: BaseProvider) => {
  const network = await provider.getNetwork()
  const stakingContract = getContract(
    'xtkManagementStakingModule',
    provider,
    network
  )

  if (!stakingContract) {
    return Promise.reject(new Error('Could not fetch XTK staking contract'))
  }

  return { stakingContract }
}
