import { Block, Log } from '@ethersproject/abstract-provider'
import { BaseProvider } from '@ethersproject/providers'
import { Abi } from '@xtoken/abis'
import { formatEther, Interface } from 'ethers/lib/utils'

import { IHistoryType, IStakeHistory } from '../../types/xToken'
import { formatNumber } from '../../utils'
import { toTitleCase } from '../utils'

import { getXtkStakingContract } from './helper'

const fromBlock = 12838146

export const getXtkHistory = async (
  type: IHistoryType,
  account: string,
  provider: BaseProvider
): Promise<readonly IStakeHistory[]> => {
  const label = toTitleCase(type)
  const stakingContract = await getXtkStakingContract(provider)

  const filter = stakingContract.filters[type](account, null, null)
  const logs: readonly Log[] = await stakingContract.queryFilter(
    filter,
    fromBlock
  )
  const iface = new Interface(Abi.XTKManagementStakingModule)

  const promises = logs.map(async (log) => {
    const block: Block = await provider.getBlock(log.blockNumber)
    const parsedLog = iface.parseLog(log)
    const { xtkAmount } = parsedLog.args

    return {
      time: block.timestamp,
      label,
      value: `${formatNumber(formatEther(xtkAmount), 2).toFixed(2)}`,
      txHash: log.transactionHash,
    }
  })

  return Promise.all(promises)
}
