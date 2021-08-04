import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

import { getXXtkContracts } from './helper'

export const stake = async (provider: BaseProvider, amount: BigNumber) => {
  const { stakingContract } = await getXXtkContracts(provider)
  if (!stakingContract) return null

  return stakingContract.stake(amount)
}
