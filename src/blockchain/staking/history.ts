import { Block, Log } from '@ethersproject/abstract-provider'
import { BaseProvider } from '@ethersproject/providers'
import { Abi } from '@xtoken/abis'
import { formatUnits, Interface } from 'ethers/lib/utils'

import { IStakeHistory } from '../../types/xToken'

import { getXtkStakingContract } from './helper'

const STAKING_HISTORY_START_BLOCK = 12838146

const getHistory = async (
  provider: BaseProvider,
  account: string,
  type: 'stake' | 'unstake',
  // eslint-disable-next-line functional/no-return-void
  onError?: (err: Error) => void
): Promise<readonly IStakeHistory[]> => {
  const stakingContract = await getXtkStakingContract(provider)
  const transactionName = type === 'stake' ? 'Stake' : 'UnStake'
  const label = type === 'stake' ? 'Stake' : 'Unstake'
  try {
    const filter = stakingContract.filters[transactionName](account, null, null)
    const logs: readonly Log[] = await stakingContract.queryFilter(
      filter,
      STAKING_HISTORY_START_BLOCK
    )
    const iface = new Interface(Abi.XTKManagementStakingModule)

    const promises = logs.map(async (log) => {
      const block: Block = await provider.getBlock(log.blockNumber)
      const parsedLog = iface.parseLog(log)
      const { xtkAmount } = parsedLog.args
      return {
        time: block.timestamp,
        label,
        value: Number(formatUnits(xtkAmount, 18)).toFixed(2),
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

export const getXtkStakeHistory = async (
  provider: BaseProvider,
  account: string,
  // eslint-disable-next-line functional/no-return-void
  onError?: (err: Error) => void
) => {
  const stakeHistory = await getHistory(provider, account, 'stake', onError)
  return stakeHistory
}

export const getXtkUnstakeHistory = async (
  provider: BaseProvider,
  account: string,
  // eslint-disable-next-line functional/no-return-void
  onError?: (err: Error) => void
) => {
  const unstakeHistory = await getHistory(provider, account, 'unstake', onError)
  return unstakeHistory
}
