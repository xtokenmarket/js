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

interface XU3LPPriceInterface extends ethers.utils.Interface {
  functions: {
    'getAssetHeld()': FunctionFragment
    'getPrice()': FunctionFragment
    'initialize(address,address,address,bool)': FunctionFragment
    'underlyingAssetAddress()': FunctionFragment
    'underlyingPriceFeedAddress()': FunctionFragment
    'usdcPriceFeedAddress()': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'getAssetHeld',
    values?: undefined
  ): string
  encodeFunctionData(functionFragment: 'getPrice', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'initialize',
    values: [string, string, string, boolean]
  ): string
  encodeFunctionData(
    functionFragment: 'underlyingAssetAddress',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'underlyingPriceFeedAddress',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'usdcPriceFeedAddress',
    values?: undefined
  ): string

  decodeFunctionResult(
    functionFragment: 'getAssetHeld',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'getPrice', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'underlyingAssetAddress',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'underlyingPriceFeedAddress',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'usdcPriceFeedAddress',
    data: BytesLike
  ): Result

  events: {}
}

export class XU3LPPrice extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: XU3LPPriceInterface

  functions: {
    getAssetHeld(overrides?: CallOverrides): Promise<[BigNumber]>

    'getAssetHeld()'(overrides?: CallOverrides): Promise<[BigNumber]>

    getPrice(overrides?: CallOverrides): Promise<[BigNumber]>

    'getPrice()'(overrides?: CallOverrides): Promise<[BigNumber]>

    initialize(
      _underlyingAssetAddress: string,
      _underlyingPriceFeedAddress: string,
      _usdcPriceFeedAddress: string,
      _isToken1PriceFeed: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'initialize(address,address,address,bool)'(
      _underlyingAssetAddress: string,
      _underlyingPriceFeedAddress: string,
      _usdcPriceFeedAddress: string,
      _isToken1PriceFeed: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    underlyingAssetAddress(overrides?: CallOverrides): Promise<[string]>

    'underlyingAssetAddress()'(overrides?: CallOverrides): Promise<[string]>

    underlyingPriceFeedAddress(overrides?: CallOverrides): Promise<[string]>

    'underlyingPriceFeedAddress()'(overrides?: CallOverrides): Promise<[string]>

    usdcPriceFeedAddress(overrides?: CallOverrides): Promise<[string]>

    'usdcPriceFeedAddress()'(overrides?: CallOverrides): Promise<[string]>
  }

  getAssetHeld(overrides?: CallOverrides): Promise<BigNumber>

  'getAssetHeld()'(overrides?: CallOverrides): Promise<BigNumber>

  getPrice(overrides?: CallOverrides): Promise<BigNumber>

  'getPrice()'(overrides?: CallOverrides): Promise<BigNumber>

  initialize(
    _underlyingAssetAddress: string,
    _underlyingPriceFeedAddress: string,
    _usdcPriceFeedAddress: string,
    _isToken1PriceFeed: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'initialize(address,address,address,bool)'(
    _underlyingAssetAddress: string,
    _underlyingPriceFeedAddress: string,
    _usdcPriceFeedAddress: string,
    _isToken1PriceFeed: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  underlyingAssetAddress(overrides?: CallOverrides): Promise<string>

  'underlyingAssetAddress()'(overrides?: CallOverrides): Promise<string>

  underlyingPriceFeedAddress(overrides?: CallOverrides): Promise<string>

  'underlyingPriceFeedAddress()'(overrides?: CallOverrides): Promise<string>

  usdcPriceFeedAddress(overrides?: CallOverrides): Promise<string>

  'usdcPriceFeedAddress()'(overrides?: CallOverrides): Promise<string>

  callStatic: {
    getAssetHeld(overrides?: CallOverrides): Promise<BigNumber>

    'getAssetHeld()'(overrides?: CallOverrides): Promise<BigNumber>

    getPrice(overrides?: CallOverrides): Promise<BigNumber>

    'getPrice()'(overrides?: CallOverrides): Promise<BigNumber>

    initialize(
      _underlyingAssetAddress: string,
      _underlyingPriceFeedAddress: string,
      _usdcPriceFeedAddress: string,
      _isToken1PriceFeed: boolean,
      overrides?: CallOverrides
    ): Promise<void>

    'initialize(address,address,address,bool)'(
      _underlyingAssetAddress: string,
      _underlyingPriceFeedAddress: string,
      _usdcPriceFeedAddress: string,
      _isToken1PriceFeed: boolean,
      overrides?: CallOverrides
    ): Promise<void>

    underlyingAssetAddress(overrides?: CallOverrides): Promise<string>

    'underlyingAssetAddress()'(overrides?: CallOverrides): Promise<string>

    underlyingPriceFeedAddress(overrides?: CallOverrides): Promise<string>

    'underlyingPriceFeedAddress()'(overrides?: CallOverrides): Promise<string>

    usdcPriceFeedAddress(overrides?: CallOverrides): Promise<string>

    'usdcPriceFeedAddress()'(overrides?: CallOverrides): Promise<string>
  }

  filters: {}

  estimateGas: {
    getAssetHeld(overrides?: CallOverrides): Promise<BigNumber>

    'getAssetHeld()'(overrides?: CallOverrides): Promise<BigNumber>

    getPrice(overrides?: CallOverrides): Promise<BigNumber>

    'getPrice()'(overrides?: CallOverrides): Promise<BigNumber>

    initialize(
      _underlyingAssetAddress: string,
      _underlyingPriceFeedAddress: string,
      _usdcPriceFeedAddress: string,
      _isToken1PriceFeed: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>

    'initialize(address,address,address,bool)'(
      _underlyingAssetAddress: string,
      _underlyingPriceFeedAddress: string,
      _usdcPriceFeedAddress: string,
      _isToken1PriceFeed: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>

    underlyingAssetAddress(overrides?: CallOverrides): Promise<BigNumber>

    'underlyingAssetAddress()'(overrides?: CallOverrides): Promise<BigNumber>

    underlyingPriceFeedAddress(overrides?: CallOverrides): Promise<BigNumber>

    'underlyingPriceFeedAddress()'(
      overrides?: CallOverrides
    ): Promise<BigNumber>

    usdcPriceFeedAddress(overrides?: CallOverrides): Promise<BigNumber>

    'usdcPriceFeedAddress()'(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    getAssetHeld(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'getAssetHeld()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    getPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'getPrice()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    initialize(
      _underlyingAssetAddress: string,
      _underlyingPriceFeedAddress: string,
      _usdcPriceFeedAddress: string,
      _isToken1PriceFeed: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'initialize(address,address,address,bool)'(
      _underlyingAssetAddress: string,
      _underlyingPriceFeedAddress: string,
      _usdcPriceFeedAddress: string,
      _isToken1PriceFeed: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    underlyingAssetAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'underlyingAssetAddress()'(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    underlyingPriceFeedAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'underlyingPriceFeedAddress()'(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    usdcPriceFeedAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'usdcPriceFeedAddress()'(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>
  }
}