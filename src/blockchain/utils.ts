import { ContractInterface } from '@ethersproject/contracts'
import { JsonRpcProvider, Network } from '@ethersproject/providers'
import axios from 'axios'
import { BigNumber, ethers } from 'ethers'

import AaveProtoGovernanceAbi from '../abi/AaveProtoGovernance.json'
import ERC20Abi from '../abi/ERC20.json'
import KyberProxyAbi from '../abi/KyberProxy.json'
import SynthetixAbi from '../abi/Synthetix.json'
import TradeAccountingAbi from '../abi/TradeAccounting.json'
import xAAVEAbi from '../abi/xAAVE.json'
import xKNCAbi from '../abi/xKNC.json'
import xSNXAbi from '../abi/xSNX.json'
import ADDRESSES from '../addresses'
import {
  AAVE,
  AAVE_PROTO_GOVERNANCE,
  KNC,
  KYBER_PROXY,
  SNX,
  TRADE_ACCOUNTING,
  X_AAVE_A,
  X_AAVE_B,
  X_KNC_A,
  X_KNC_B,
  X_SNX_A,
} from '../constants'
import { KyberProxy } from '../types'
import { IContracts, ITokenSymbols } from '../types/xToken'

const { parseEther } = ethers.utils

export const estimateGas = async () => {
  const response = await axios.get(
    'https://ethgasstation.info/json/ethgasAPI.json'
  )
  return ethers.utils
    .parseUnits(String(response.data.fast / 10), 'gwei')
    .toString()
}

const getAbi = (contractName: IContracts) => {
  switch (contractName) {
    case AAVE:
    case KNC:
      return ERC20Abi as ContractInterface
    case AAVE_PROTO_GOVERNANCE:
      return AaveProtoGovernanceAbi as ContractInterface
    case KYBER_PROXY:
      return KyberProxyAbi as ContractInterface
    case SNX:
      return SynthetixAbi as ContractInterface
    case TRADE_ACCOUNTING:
      return TradeAccountingAbi as ContractInterface
    case X_AAVE_A:
    case X_AAVE_B:
      return xAAVEAbi as ContractInterface
    case X_KNC_A:
    case X_KNC_B:
      return (xKNCAbi as unknown) as ContractInterface
    case X_SNX_A:
      return xSNXAbi as ContractInterface
  }
}

export const getContract = (
  contractName: IContracts,
  provider: JsonRpcProvider,
  network: Network
) => {
  if (!provider) return null

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const address = ADDRESSES[contractName][network.chainId]
  if (!address) return null

  return new ethers.Contract(
    address,
    getAbi(contractName),
    process.env.NODE_ENV === 'test' ? provider : provider.getSigner()
  )
}

export const getExpectedRate = async (
  kyberProxyContract: KyberProxy,
  inputAsset: string,
  outputAsset: string,
  amount: string
) => {
  const rates = await kyberProxyContract.getExpectedRate(
    inputAsset,
    outputAsset,
    amount
  )
  return Math.round(Number(rates[0].toString()) * 0.98)
}

export const getTokenSymbol = (symbol: ITokenSymbols) => {
  switch (symbol) {
    case X_AAVE_A:
    case X_AAVE_B:
      return AAVE
    case X_KNC_A:
    case X_KNC_B:
      return KNC
    case X_SNX_A:
      return SNX
  }
}

export const parseFees = (fee: BigNumber) => {
  return parseEther(fee.isZero() ? '1' : String(1 - 1 / fee.toNumber()))
}
