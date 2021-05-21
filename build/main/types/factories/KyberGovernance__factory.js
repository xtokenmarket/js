'use strict'
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, '__esModule', { value: true })
exports.KyberGovernance__factory = void 0
const ethers_1 = require('ethers')
class KyberGovernance__factory {
  static connect(address, signerOrProvider) {
    return new ethers_1.Contract(address, _abi, signerOrProvider)
  }
}
exports.KyberGovernance__factory = KyberGovernance__factory
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS3liZXJHb3Zlcm5hbmNlX19mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVzL2ZhY3Rvcmllcy9LeWJlckdvdmVybmFuY2VfX2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUErQztBQUMvQyxvQkFBb0I7QUFDcEIsb0JBQW9COzs7QUFFcEIsbUNBQXlDO0FBS3pDLE1BQWEsd0JBQXdCO0lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQ1osT0FBZSxFQUNmLGdCQUFtQztRQUVuQyxPQUFPLElBQUksaUJBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixDQUFvQixDQUFBO0lBQ3pFLENBQUM7Q0FDRjtBQVBELDREQU9DO0FBRUQsTUFBTSxJQUFJLEdBQUc7SUFDWDtRQUNFLE1BQU0sRUFBRTtZQUNOO2dCQUNFLFlBQVksRUFBRSxTQUFTO2dCQUN2QixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsSUFBSSxFQUFFLFNBQVM7YUFDaEI7WUFDRDtnQkFDRSxZQUFZLEVBQUUsU0FBUztnQkFDdkIsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLElBQUksRUFBRSxTQUFTO2FBQ2hCO1NBQ0Y7UUFDRCxJQUFJLEVBQUUsWUFBWTtRQUNsQixPQUFPLEVBQUUsRUFBRTtRQUNYLGVBQWUsRUFBRSxZQUFZO1FBQzdCLElBQUksRUFBRSxVQUFVO0tBQ2pCO0NBQ0YsQ0FBQSJ9
