import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { KYBER_PROXY, SNX, TRADE_ACCOUNTING, X_SNX_A } from '@xtoken/abis'

import { KyberProxy, TradeAccounting, XSNX } from '../../types'
import { getContract } from '../utils'

export const getXSnxContracts = async (provider: BaseProvider) => {
  const network = await provider.getNetwork()

  const xsnxContract = getContract(X_SNX_A, provider, network) as XSNX
  const snxContract = getContract(SNX, provider, network) as Contract
  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy
  const tradeAccountingContract = getContract(
    TRADE_ACCOUNTING,
    provider,
    network
  ) as TradeAccounting

  if (
    !xsnxContract ||
    !kyberProxyContract ||
    !tradeAccountingContract ||
    !snxContract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    kyberProxyContract,
    network,
    snxContract,
    tradeAccountingContract,
    xsnxContract,
  }
}
