import { JsonRpcProvider } from '@ethersproject/providers'
import { ADDRESSES, SNX, X_SNX_A_ADMIN } from '@xtoken/abis'
import { formatBytes32String, formatEther } from 'ethers/lib/utils'

import { DEC_18 } from '../../constants'
import { ERC20 } from '../../types'
import { getTokenBalance } from '../utils'

import { getXSnxContracts } from './helper'

export const getMaximumRedeemableXSnx = async (provider: JsonRpcProvider) => {
  const {
    network,
    snxContract,
    tradeAccountingContract,
    xsnxContract,
  } = await getXSnxContracts(provider)
  const { chainId } = network

  const xsnxAdminAddress = ADDRESSES[X_SNX_A_ADMIN][chainId]
  const snxAddress = ADDRESSES[SNX][chainId]

  const [
    availableEthBalance,
    totalSupply,
    snxBalanceOwned,
    debtValue,
  ] = await Promise.all([
    tradeAccountingContract.getEthBalance(),
    xsnxContract.totalSupply(),
    getTokenBalance(snxAddress, xsnxAdminAddress, provider),
    (snxContract as ERC20).debtBalanceOf(
      xsnxAdminAddress,
      formatBytes32String('sUSD')
    ),
  ])

  const redeemTokenPrice = await tradeAccountingContract.calculateRedeemTokenPrice(
    totalSupply,
    snxBalanceOwned,
    debtValue
  )

  return formatEther(availableEthBalance.mul(DEC_18).div(redeemTokenPrice))
}
