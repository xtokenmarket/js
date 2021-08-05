import { Block, Log } from '@ethersproject/abstract-provider'
import { BaseProvider } from '@ethersproject/providers'
import { Abi } from '@xtoken/abis'
import { Interface } from 'ethers/lib/utils'

import { formatBigNumber, getContract } from '../utils'

import { ITransactionHistory } from './types'

const STAKING_HISTORY_BLOCK = 12838146

export const getXTKUntakeHistory = async (
  provider: BaseProvider,
  account: string,
  // eslint-disable-next-line functional/no-return-void
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
    // eslint-disable-next-line functional/prefer-readonly-type
    const events: ITransactionHistory[] = []
    const filter: any = stakingContract.filters.UnStake(account)
    // eslint-disable-next-line functional/immutable-data
    filter.fromBlock = STAKING_HISTORY_BLOCK
    // eslint-disable-next-line functional/immutable-data
    filter.toBlock = 'latest'
    const logs: readonly Log[] = await provider.getLogs(filter)
    const iface = new Interface(Abi.XTKManagementStakingModule)

    const promises = logs.map(async (log) => {
      const block: Block = await provider!.getBlock(log.blockNumber)
      const parsed = iface.parseLog(log)
      const { xtkAmount } = parsed.args
      // eslint-disable-next-line functional/immutable-data
      events.push({
        time: block.timestamp,
        value: `${formatBigNumber(xtkAmount, 18)} XTK`,
        label: 'Unstake',
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
