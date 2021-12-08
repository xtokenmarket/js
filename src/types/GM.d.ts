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

interface GMInterface extends ethers.utils.Interface {
  functions: {
    'approve(address,uint256)': FunctionFragment
    'mint(address,uint256)': FunctionFragment
    'safeTransferFrom(address,address,uint256)': FunctionFragment
    'setApprovalForAll(address,bool)': FunctionFragment
    'transferFrom(address,address,uint256)': FunctionFragment
    'balanceOf(address)': FunctionFragment
    'getApproved(uint256)': FunctionFragment
    'isApprovedForAll(address,address)': FunctionFragment
    'ownerOf(uint256)': FunctionFragment
    'supportsInterface(bytes4)': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'approve',
    values: [string, BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'mint',
    values: [string, BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'safeTransferFrom',
    values: [string, string, BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'setApprovalForAll',
    values: [string, boolean]
  ): string
  encodeFunctionData(
    functionFragment: 'transferFrom',
    values: [string, string, BigNumberish]
  ): string
  encodeFunctionData(functionFragment: 'balanceOf', values: [string]): string
  encodeFunctionData(
    functionFragment: 'getApproved',
    values: [BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'isApprovedForAll',
    values: [string, string]
  ): string
  encodeFunctionData(
    functionFragment: 'ownerOf',
    values: [BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'supportsInterface',
    values: [BytesLike]
  ): string

  decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'safeTransferFrom',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'setApprovalForAll',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'transferFrom',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getApproved', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'isApprovedForAll',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'ownerOf', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'supportsInterface',
    data: BytesLike
  ): Result

  events: {
    'Transfer(address,address,uint256)': EventFragment
    'Approval(address,address,uint256)': EventFragment
    'ApprovalForAll(address,address,bool)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'Transfer'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Approval'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'ApprovalForAll'): EventFragment
}

export class GM extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: GMInterface

  functions: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'approve(address,uint256)'(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    mint(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'mint(address,uint256)'(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'safeTransferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'safeTransferFrom(address,address,uint256,bytes)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    setApprovalForAll(
      to: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'setApprovalForAll(address,bool)'(
      to: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'transferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>

    'balanceOf(address)'(
      owner: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>

    'getApproved(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    'isApprovedForAll(address,address)'(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>

    'ownerOf(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    'supportsInterface(bytes4)'(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>
  }

  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'approve(address,uint256)'(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  mint(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'mint(address,uint256)'(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'safeTransferFrom(address,address,uint256)'(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'safeTransferFrom(address,address,uint256,bytes)'(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  setApprovalForAll(
    to: string,
    approved: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'setApprovalForAll(address,bool)'(
    to: string,
    approved: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'transferFrom(address,address,uint256)'(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>

  'balanceOf(address)'(
    owner: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>

  getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>

  'getApproved(uint256)'(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>

  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>

  'isApprovedForAll(address,address)'(
    owner: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>

  'ownerOf(uint256)'(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>

  'supportsInterface(bytes4)'(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>

  callStatic: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    'approve(address,uint256)'(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    mint(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    'mint(address,uint256)'(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    'safeTransferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    'safeTransferFrom(address,address,uint256,bytes)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>

    setApprovalForAll(
      to: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>

    'setApprovalForAll(address,bool)'(
      to: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    'transferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>

    'balanceOf(address)'(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>

    'getApproved(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>

    'isApprovedForAll(address,address)'(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>

    'ownerOf(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>

    'supportsInterface(bytes4)'(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>
  }

  filters: {
    Transfer(
      from: string | null,
      to: string | null,
      tokenId: BigNumberish | null
    ): EventFilter

    Approval(
      owner: string | null,
      approved: string | null,
      tokenId: BigNumberish | null
    ): EventFilter

    ApprovalForAll(
      owner: string | null,
      operator: string | null,
      approved: null
    ): EventFilter
  }

  estimateGas: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>

    'approve(address,uint256)'(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>

    mint(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>

    'mint(address,uint256)'(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>

    'safeTransferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>

    'safeTransferFrom(address,address,uint256,bytes)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>

    setApprovalForAll(
      to: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>

    'setApprovalForAll(address,bool)'(
      to: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>

    'transferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>

    'balanceOf(address)'(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    'getApproved(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    'isApprovedForAll(address,address)'(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    'ownerOf(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    'supportsInterface(bytes4)'(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>
  }

  populateTransaction: {
    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'approve(address,uint256)'(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    mint(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'mint(address,uint256)'(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'safeTransferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'safeTransferFrom(address,address,uint256,bytes)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    setApprovalForAll(
      to: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'setApprovalForAll(address,bool)'(
      to: string,
      approved: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'transferFrom(address,address,uint256)'(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'balanceOf(address)'(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'getApproved(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'isApprovedForAll(address,address)'(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'ownerOf(uint256)'(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'supportsInterface(bytes4)'(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>
  }
}
