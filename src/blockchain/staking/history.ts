import { Block, Log } from '@ethersproject/abstract-provider'
import { BaseProvider } from '@ethersproject/providers'
import { Abi } from '@xtoken/abis'
import { formatUnits, Interface, LogDescription } from 'ethers/lib/utils'

import { XTKManagementStakingModule } from '../../types'
import { IStakeHistory } from '../../types/xToken'

import { getXtkStakingContract } from './helper'

const STAKING_HISTORY_START_BLOCK = 12838146

const getXtkTranasctionHistory = async (
  provider: BaseProvider,
  account: string,
  transactionName: keyof XTKManagementStakingModule['filters'],
  formatTransactionData: (
    block: Block,
    log: Log,
    parsedLog: LogDescription
  ) => IStakeHistory,
  // eslint-disable-next-line functional/no-return-void
  onError?: (err: Error) => void
) => {
  const stakingContract = await getXtkStakingContract(provider)
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
      return formatTransactionData(block, log, parsedLog)
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
  const transactionHistory = await getXtkTranasctionHistory(
    provider,
    account,
    'Stake',
    (block, log, parsedLog) => {
      const { xtkAmount } = parsedLog.args
      return {
        time: block.timestamp,
        value: Number(formatUnits(xtkAmount, 18)).toFixed(2),
        label: 'Stake',
        txHash: log.transactionHash,
      }
    },
    onError
  )
  return transactionHistory
}

export const getXtkUnstakeHistory = async (
  provider: BaseProvider,
  account: string,
  // eslint-disable-next-line functional/no-return-void
  onError?: (err: Error) => void
) => {
  const transactionHistory = await getXtkTranasctionHistory(
    provider,
    account,
    'UnStake',
    (block, log, parsedLog) => {
      const { xtkAmount } = parsedLog.args
      return {
        time: block.timestamp,
        value: Number(formatUnits(xtkAmount, 18)).toFixed(2),
        label: 'Unstake',
        txHash: log.transactionHash,
      }
    },
    onError
  )
  return transactionHistory
}
