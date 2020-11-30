import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'

import { KYBER_PROXY, TRADE_ACCOUNTING, X_SNX_A } from '../../constants'
import { KyberProxy, TradeAccounting, XSNX } from '../../types'
import { getContract, getTokenSymbol } from '../utils'

export const getXSnxContracts = async (provider: JsonRpcProvider) => {
  const network = await provider.getNetwork()

  const xsnxContract = getContract(X_SNX_A, provider, network) as XSNX
  const kyberProxyContract = getContract(
    KYBER_PROXY,
    provider,
    network
  ) as KyberProxy
  const tokenContract = getContract(
    getTokenSymbol(X_SNX_A),
    provider,
    network
  ) as Contract
  const tradeAccountingContract = getContract(
    TRADE_ACCOUNTING,
    provider,
    network
  ) as TradeAccounting

  if (
    !xsnxContract ||
    !kyberProxyContract ||
    !tokenContract ||
    !tradeAccountingContract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    kyberProxyContract,
    network,
    tokenContract,
    tradeAccountingContract,
    xsnxContract,
  }
}
