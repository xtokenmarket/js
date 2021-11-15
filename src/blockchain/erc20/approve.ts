import { ContractTransaction } from '@ethersproject/contracts'
import { BaseProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

import { GAS_LIMIT_PERCENTAGE_DEFAULT } from '../../constants'
import { ERC20 } from '../../types'
import { IStableAssets } from '../../types/xToken'
import { getPercentage } from '../../utils'
import { getContract } from '../utils'

export const approveErc20 = async (
  symbol: IStableAssets,
  amount: BigNumber,
  spenderAddress: string,
  provider: BaseProvider
): Promise<ContractTransaction> => {
  const network = await provider.getNetwork()
  const tokenContract = (await getContract(symbol, provider, network)) as ERC20

  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await tokenContract.estimateGas.approve(spenderAddress, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )

  return tokenContract.approve(spenderAddress, amount, { gasLimit })
}
