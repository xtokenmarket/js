import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'

import { XALPHA } from '../../types'
import { ITokenSymbols } from '../../types/xToken'
import { getContract, getTokenSymbol } from '../utils'

export const getXAlphaContracts = async (
  symbol: ITokenSymbols,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()

  const xalphaContract = getContract(symbol, provider, network) as XALPHA

  const tokenContract = getContract(
    getTokenSymbol(symbol),
    provider,
    network
  ) as Contract

  if (!xalphaContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    network,
    tokenContract,
    xalphaContract,
  }
}
