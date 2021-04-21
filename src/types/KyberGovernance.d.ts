/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from 'ethers'
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface KyberGovernanceInterface extends ethers.utils.Interface {
  functions: {
    'submitVote(uint256,uint256)': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'submitVote',
    values: [BigNumberish, BigNumberish]
  ): string

  decodeFunctionResult(functionFragment: 'submitVote', data: BytesLike): Result

  events: {}
}

export class KyberGovernance extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: KyberGovernanceInterface

  functions: {
    submitVote(
      proposalId: BigNumberish,
      optionBitMask: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'submitVote(uint256,uint256)'(
      proposalId: BigNumberish,
      optionBitMask: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>
  }

  submitVote(
    proposalId: BigNumberish,
    optionBitMask: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'submitVote(uint256,uint256)'(
    proposalId: BigNumberish,
    optionBitMask: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  callStatic: {
    submitVote(
      proposalId: BigNumberish,
      optionBitMask: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    'submitVote(uint256,uint256)'(
      proposalId: BigNumberish,
      optionBitMask: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>
  }

  filters: {}

  estimateGas: {
    submitVote(
      proposalId: BigNumberish,
      optionBitMask: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>

    'submitVote(uint256,uint256)'(
      proposalId: BigNumberish,
      optionBitMask: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>
  }

  populateTransaction: {
    submitVote(
      proposalId: BigNumberish,
      optionBitMask: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'submitVote(uint256,uint256)'(
      proposalId: BigNumberish,
      optionBitMask: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>
  }
}