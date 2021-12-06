import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'

import { XAssetLev } from '../../types'
import { IXAssetLev } from '../../types/xToken'
import { getContract, getXAssetLevTokenSymbol } from '../utils'

export const getXAssetLevContracts = async (
  symbol: IXAssetLev,
  provider: BaseProvider
) => {
  const network = await provider.getNetwork()

  const xassetlevContract = getContract(symbol, provider, network) as XAssetLev

  const tokenContract = getContract(
    getXAssetLevTokenSymbol(symbol),
    provider,
    network
  ) as Contract

  if (!xassetlevContract || !tokenContract) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    network,
    tokenContract,
    xassetlevContract,
  }
}
