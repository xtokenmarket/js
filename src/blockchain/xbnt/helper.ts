import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'

import { XBNT } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getContract, getTokenSymbol } from '../utils'

export const getXBntContracts = async (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()

  const xbntContract = getContract(symbol, provider, network) as XBNT
  const tokenContract = getContract(
    getTokenSymbol(symbol),
    provider,
    network
  ) as Contract

  if (!xbntContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    network,
    tokenContract,
    xbntContract,
  }
}
