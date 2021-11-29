import { Contract } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'

import { XU3LP } from '../../types'
import { ILPTokenSymbols } from '../../types/xToken'
import { getContract, getLPTokenSymbol } from '../utils'

export const getXU3LPContracts = async (
  symbol: ILPTokenSymbols,
  provider: BaseProvider
) => {
  const assets = getLPTokenSymbol(symbol, provider)
  const network = await provider.getNetwork()

  const xu3lpContract = getContract(symbol, provider, network) as XU3LP
  const token0Contract = getContract(assets[0], provider, network) as Contract
  const token1Contract = getContract(assets[1], provider, network) as Contract

  if (!xu3lpContract || !token0Contract || !token1Contract) {
    return Promise.reject(new Error('Unknown error'))
  }

  return {
    network,
    token0Contract,
    token1Contract,
    xu3lpContract,
  }
}
