import { BaseProvider } from '@ethersproject/providers'
import { Block, Log } from '@ethersproject/abstract-provider'
import { Interface } from 'ethers/lib/utils'
import { Abi } from '@xtoken/abis'

import { getContract, formatBigNumber } from '../utils'
import { ITransactionHistory } from './types'

const STAKING_HISTORY_BLOCK = 12838146

export const getXTKStakeHistory = async (
  provider: BaseProvider,
  account: string,
  onError?: (err: any) => void
) => {
  const network = await provider.getNetwork()
  const stakingContract = getContract(
    'xtkManagementStakingModule',
    provider,
    network
  )
  if (!stakingContract) return null

  try {
    const events: ITransactionHistory[] = []
    const filter: any = stakingContract.filters.Stake(account)
    filter.fromBlock = STAKING_HISTORY_BLOCK
    filter.toBlock = 'latest'
    const logs: Log[] = await provider.getLogs(filter)
    const iface = new Interface(Abi.XTKManagementStakingModule)

    const promises = logs.map(async (log) => {
      const block: Block = await provider!.getBlock(log.blockNumber)
      const parsed = iface.parseLog(log)
      const { xtkAmount } = parsed.args
      events.push({
        time: block.timestamp,
        value: `${formatBigNumber(xtkAmount, 18)} XTK`,
        label: 'Stake',
        txHash: log.transactionHash,
      })
    })
    await Promise.all(promises)
    return events
  } catch (err) {
    if (onError) {
      onError(err)
    }
    return []
  }
}
