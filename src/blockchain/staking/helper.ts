import { BaseProvider } from '@ethersproject/providers'
import { XTK_MANAGEMENT_STAKING_MODULE } from '@xtoken/abis'

import { XTKManagementStakingModule } from '../../types'
import { getContract } from '../utils'

export const getXtkStakingContract = async (provider: BaseProvider) => {
  const network = await provider.getNetwork()
  const stakingContract = getContract(
    XTK_MANAGEMENT_STAKING_MODULE,
    provider,
    network
  ) as XTKManagementStakingModule
  if (!stakingContract) {
    return Promise.reject(new Error('Could not create XTK Staking Contract'))
  }
  return stakingContract
}
