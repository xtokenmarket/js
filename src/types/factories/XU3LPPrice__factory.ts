/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'

import type { XU3LPPrice } from '../XU3LPPrice'

export class XU3LPPrice__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XU3LPPrice {
    return new Contract(address, _abi, signerOrProvider) as XU3LPPrice
  }
}

const _abi = [
  {
    inputs: [],
    name: 'getAssetHeld',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlyingAssetAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_underlyingPriceFeedAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_usdcPriceFeedAddress',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_isToken1PriceFeed',
        type: 'bool',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'underlyingAssetAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'underlyingPriceFeedAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'usdcPriceFeedAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
