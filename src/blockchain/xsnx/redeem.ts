import { BaseProvider } from '@ethersproject/providers'
import { ADDRESSES, SNX, X_SNX_ADMIN } from '@xtoken/abis'
import { formatBytes32String, formatEther, parseEther } from 'ethers/lib/utils'

import { DEC_18 } from '../../constants'
import { ERC20 } from '../../types'
import { getTokenBalance } from '../erc20'

import { getXSnxContracts } from './helper'

export const getMaximumRedeemableXSnx = async (provider: BaseProvider) => {
  const {
    network,
    snxContract,
    tradeAccountingContract,
    xsnxContract,
  } = await getXSnxContracts(provider)
  const { chainId } = network

  const xsnxAdminAddress = ADDRESSES[X_SNX_ADMIN][chainId]

  const [
    availableEthBalance,
    totalSupply,
    snxBalanceOwned,
    debtValue,
  ] = await Promise.all([
    tradeAccountingContract.getEthBalance(),
    xsnxContract.totalSupply(),
    getTokenBalance(SNX, xsnxAdminAddress, provider),
    (snxContract as ERC20).debtBalanceOf(
      xsnxAdminAddress,
      formatBytes32String('sUSD')
    ),
  ])

  const redeemTokenPrice = await tradeAccountingContract.calculateRedeemTokenPrice(
    totalSupply,
    parseEther(snxBalanceOwned),
    debtValue
  )

  return formatEther(availableEthBalance.mul(DEC_18).div(redeemTokenPrice))
}
