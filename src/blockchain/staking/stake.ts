import { BaseProvider } from '@ethersproject/providers'
import { Abi, ADDRESSES, XTK_MANAGEMENT_STAKING_MODULE } from '@xtoken/abis'
import { BigNumber, Contract } from 'ethers'
import { parseEther } from 'ethers/lib/utils'

import { getSignerAddress } from '../utils'

import { getXtkStakingContract } from './helper'

const XTK_ADDRESS = '0x7f3edcdd180dbe4819bd98fee8929b5cedb3adeb'

export const approveXtk = async (amount: BigNumber, provider: BaseProvider) => {
  const contract = new Contract(XTK_ADDRESS, Abi.ERC20, provider)
  const network = await provider.getNetwork()

  return contract.approve(
    ADDRESSES[XTK_MANAGEMENT_STAKING_MODULE][network.chainId],
    amount
  )
}

export const stakeXtk = async (amount: string, provider: BaseProvider) => {
  const inputAmount = parseEther(amount)
  const stakingContract = await getXtkStakingContract(provider)
  const address = await getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmount(address, provider)

  if (approvedAmount.lt(inputAmount)) {
    return Promise.reject(new Error('Please approve the tokens before staking'))
  }

  return stakingContract.stake(inputAmount)
}

const _getApprovedAmount = async (address: string, provider: BaseProvider) => {
  const xtkContract = new Contract(XTK_ADDRESS, Abi.ERC20, provider)
  const network = await provider.getNetwork()

  return xtkContract.allowance(
    address,
    ADDRESSES[XTK_MANAGEMENT_STAKING_MODULE][network.chainId]
  )
}
