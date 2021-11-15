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

interface XTokenManagerInterface extends ethers.utils.Interface {
  functions: {
    'addManager(address,address)': FunctionFragment
    'initialize()': FunctionFragment
    'isManager(address,address)': FunctionFragment
    'isRevenueController(address)': FunctionFragment
    'owner()': FunctionFragment
    'removeManager(address,address)': FunctionFragment
    'renounceOwnership()': FunctionFragment
    'setRevenueController(address)': FunctionFragment
    'transferOwnership(address)': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'addManager',
    values: [string, string]
  ): string
  encodeFunctionData(functionFragment: 'initialize', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'isManager',
    values: [string, string]
  ): string
  encodeFunctionData(
    functionFragment: 'isRevenueController',
    values: [string]
  ): string
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'removeManager',
    values: [string, string]
  ): string
  encodeFunctionData(
    functionFragment: 'renounceOwnership',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'setRevenueController',
    values: [string]
  ): string
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [string]
  ): string

  decodeFunctionResult(functionFragment: 'addManager', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isManager', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'isRevenueController',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'removeManager',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'renounceOwnership',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'setRevenueController',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'transferOwnership',
    data: BytesLike
  ): Result

  events: {
    'OwnershipTransferred(address,address)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment
}

export class XTokenManager extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: XTokenManagerInterface

  functions: {
    addManager(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'addManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    initialize(overrides?: Overrides): Promise<ContractTransaction>

    'initialize()'(overrides?: Overrides): Promise<ContractTransaction>

    isManager(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    'isManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    isRevenueController(
      caller: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    'isRevenueController(address)'(
      caller: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    owner(overrides?: CallOverrides): Promise<[string]>

    'owner()'(overrides?: CallOverrides): Promise<[string]>

    removeManager(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'removeManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>

    'renounceOwnership()'(overrides?: Overrides): Promise<ContractTransaction>

    setRevenueController(
      controller: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'setRevenueController(address)'(
      controller: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'transferOwnership(address)'(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>
  }

  addManager(
    manager: string,
    fund: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'addManager(address,address)'(
    manager: string,
    fund: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  initialize(overrides?: Overrides): Promise<ContractTransaction>

  'initialize()'(overrides?: Overrides): Promise<ContractTransaction>

  isManager(
    manager: string,
    fund: string,
    overrides?: CallOverrides
  ): Promise<boolean>

  'isManager(address,address)'(
    manager: string,
    fund: string,
    overrides?: CallOverrides
  ): Promise<boolean>

  isRevenueController(
    caller: string,
    overrides?: CallOverrides
  ): Promise<boolean>

  'isRevenueController(address)'(
    caller: string,
    overrides?: CallOverrides
  ): Promise<boolean>

  owner(overrides?: CallOverrides): Promise<string>

  'owner()'(overrides?: CallOverrides): Promise<string>

  removeManager(
    manager: string,
    fund: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'removeManager(address,address)'(
    manager: string,
    fund: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>

  'renounceOwnership()'(overrides?: Overrides): Promise<ContractTransaction>

  setRevenueController(
    controller: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'setRevenueController(address)'(
    controller: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'transferOwnership(address)'(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  callStatic: {
    addManager(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<void>

    'addManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<void>

    initialize(overrides?: CallOverrides): Promise<void>

    'initialize()'(overrides?: CallOverrides): Promise<void>

    isManager(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<boolean>

    'isManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<boolean>

    isRevenueController(
      caller: string,
      overrides?: CallOverrides
    ): Promise<boolean>

    'isRevenueController(address)'(
      caller: string,
      overrides?: CallOverrides
    ): Promise<boolean>

    owner(overrides?: CallOverrides): Promise<string>

    'owner()'(overrides?: CallOverrides): Promise<string>

    removeManager(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<void>

    'removeManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<void>

    renounceOwnership(overrides?: CallOverrides): Promise<void>

    'renounceOwnership()'(overrides?: CallOverrides): Promise<void>

    setRevenueController(
      controller: string,
      overrides?: CallOverrides
    ): Promise<void>

    'setRevenueController(address)'(
      controller: string,
      overrides?: CallOverrides
    ): Promise<void>

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>

    'transferOwnership(address)'(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>
  }

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter
  }

  estimateGas: {
    addManager(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<BigNumber>

    'addManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<BigNumber>

    initialize(overrides?: Overrides): Promise<BigNumber>

    'initialize()'(overrides?: Overrides): Promise<BigNumber>

    isManager(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    'isManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    isRevenueController(
      caller: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    'isRevenueController(address)'(
      caller: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    owner(overrides?: CallOverrides): Promise<BigNumber>

    'owner()'(overrides?: CallOverrides): Promise<BigNumber>

    removeManager(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<BigNumber>

    'removeManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<BigNumber>

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>

    'renounceOwnership()'(overrides?: Overrides): Promise<BigNumber>

    setRevenueController(
      controller: string,
      overrides?: Overrides
    ): Promise<BigNumber>

    'setRevenueController(address)'(
      controller: string,
      overrides?: Overrides
    ): Promise<BigNumber>

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>

    'transferOwnership(address)'(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>
  }

  populateTransaction: {
    addManager(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'addManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    initialize(overrides?: Overrides): Promise<PopulatedTransaction>

    'initialize()'(overrides?: Overrides): Promise<PopulatedTransaction>

    isManager(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'isManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    isRevenueController(
      caller: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'isRevenueController(address)'(
      caller: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'owner()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    removeManager(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'removeManager(address,address)'(
      manager: string,
      fund: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>

    'renounceOwnership()'(overrides?: Overrides): Promise<PopulatedTransaction>

    setRevenueController(
      controller: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'setRevenueController(address)'(
      controller: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'transferOwnership(address)'(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>
  }
}
