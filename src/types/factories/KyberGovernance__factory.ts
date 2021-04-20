/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'

import type { KyberGovernance } from '../KyberGovernance'

export class KyberGovernance__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KyberGovernance {
    return new Contract(address, _abi, signerOrProvider) as KyberGovernance
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposalId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'optionBitMask',
        type: 'uint256',
      },
    ],
    name: 'submitVote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
