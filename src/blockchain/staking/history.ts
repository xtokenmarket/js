import { Block, Log } from '@ethersproject/abstract-provider'
import { BaseProvider } from '@ethersproject/providers'
import { Abi } from '@xtoken/abis'
import { Interface } from 'ethers/lib/utils'

import { formatBigNumber } from '../utils'

import { getXtkStakingContract } from './helper'

const STAKING_HISTORY_BLOCK = 12838146

export const getXtkStakeHistory = async (
  provider: BaseProvider,
  account: string,
  // eslint-disable-next-line functional/no-return-void
  onError?: (err: Error) => void
) => {
  const stakingContract = await getXtkStakingContract(provider)
  try {
    const filter = stakingContract.filters.Stake(account, null, null)
    const logs: readonly Log[] = await stakingContract.queryFilter(
      filter,
      STAKING_HISTORY_BLOCK
    )
    const iface = new Interface(Abi.XTKManagementStakingModule)

    const promises = logs.map(async (log) => {
      const block: Block = await provider.getBlock(log.blockNumber)
      const parsed = iface.parseLog(log)
      const { xtkAmount } = parsed.args
      return {
        time: block.timestamp,
        value: `${formatBigNumber(xtkAmount, 18)} XTK`,
        label: 'Stake',
        txHash: log.transactionHash,
      }
    })
    return Promise.all(promises)
  } catch (err) {
    if (onError) {
      onError(err)
    }
    return []
  }
}

export const getXtkUntakeHistory = async (
  provider: BaseProvider,
  account: string,
  // eslint-disable-next-line functional/no-return-void
  onError?: (err: any) => void
) => {
  const stakingContract = await getXtkStakingContract(provider)
  try {
    const filter = stakingContract.filters.UnStake(account, null, null)
    const logs: readonly Log[] = await stakingContract.queryFilter(
      filter,
      STAKING_HISTORY_BLOCK
    )
    const iface = new Interface(Abi.XTKManagementStakingModule)

    const promises = logs.map(async (log) => {
      const block: Block = await provider.getBlock(log.blockNumber)
      const parsed = iface.parseLog(log)
      const { xtkAmount } = parsed.args
      return {
        time: block.timestamp,
        value: `${formatBigNumber(xtkAmount, 18)} XTK`,
        label: 'Unstake',
        txHash: log.transactionHash,
      }
    })
    return Promise.all(promises)
  } catch (err) {
    if (onError) {
      onError(err)
    }
    return []
  }
}
