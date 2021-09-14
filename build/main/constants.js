'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.UNSTAKE = exports.STAKE = exports.SNX_BALANCER_V2_POOL_ID = exports.X_SNX_A_BALANCER_V2_POOL_ID = exports.BNT_ETH_PATH = exports.DEFAULT_TOKEN_PRICES = exports.DEFAULT_PORTFOLIO_ITEM = exports.DEFAULT_LP_PORTFOLIO_ITEM = exports.DEFAULT_PRICES = exports.Exchange = exports.ZERO_NUMBER = exports.MAX_UINT = exports.GAS_LIMIT_PERCENTAGE_ETH = exports.GAS_LIMIT_PERCENTAGE_DEFAULT = exports.DEC_18 = void 0
const constants_1 = require('@ethersproject/constants')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const utils_1 = require('ethers/lib/utils')
exports.DEC_18 = utils_1.parseEther('1')
exports.GAS_LIMIT_PERCENTAGE_DEFAULT = 110
exports.GAS_LIMIT_PERCENTAGE_ETH = 120
exports.MAX_UINT = constants_1.MaxUint256
exports.ZERO_NUMBER = ethers_1.BigNumber.from('0')
// DEX
var Exchange
;(function (Exchange) {
  Exchange['BALANCER'] = 'Balancer'
  Exchange['BANCOR'] = 'Bancor'
  Exchange['INCH'] = '1Inch'
  Exchange['KYBER'] = 'Kyber'
  Exchange['UNISWAP'] = 'Uniswap'
  Exchange['XTOKEN'] = 'xToken'
})((Exchange = exports.Exchange || (exports.Exchange = {})))
// Default values
exports.DEFAULT_PRICES = Object.freeze({
  aum: 0,
  priceBtc: 0,
  priceEth: 0,
  priceUsd: 0,
  sellPriceEth: 0,
})
exports.DEFAULT_LP_PORTFOLIO_ITEM = Object.freeze({
  price: '0',
  quantity: '0',
  value: '0',
})
exports.DEFAULT_PORTFOLIO_ITEM = Object.freeze(
  Object.assign(Object.assign({}, exports.DEFAULT_LP_PORTFOLIO_ITEM), {
    tokenEquivalent: '0',
  })
)
exports.DEFAULT_TOKEN_PRICES = Object.freeze({
  token0Price: utils_1.parseEther('0'),
  token1Price: utils_1.parseEther('0'),
})
// BNT->ETH path
exports.BNT_ETH_PATH = [
  abis_1.ADDRESSES[abis_1.BNT][1],
  abis_1.ADDRESSES[abis_1.ETH_BNT_ANCHOR][1],
  abis_1.ADDRESSES[abis_1.ETH],
]
exports.X_SNX_A_BALANCER_V2_POOL_ID =
  '0xea39581977325c0833694d51656316ef8a926a62000200000000000000000036'
exports.SNX_BALANCER_V2_POOL_ID =
  '0x072f14b85add63488ddad88f855fda4a99d6ac9b000200000000000000000027'
// Staking
exports.STAKE = 'Stake'
exports.UNSTAKE = 'UnStake'
// TODO: Create error constants for invalid inputs
// For example: `Invalid user address` / `Invalid value for amount`
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBcUQ7QUFDckQsdUNBQWtFO0FBQ2xFLG1DQUFrQztBQUNsQyw0Q0FBNkM7QUFFaEMsUUFBQSxNQUFNLEdBQUcsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN4QixRQUFBLDRCQUE0QixHQUFHLEdBQUcsQ0FBQTtBQUNsQyxRQUFBLHdCQUF3QixHQUFHLEdBQUcsQ0FBQTtBQUM5QixRQUFBLFFBQVEsR0FBRyxzQkFBVSxDQUFBO0FBQ3JCLFFBQUEsV0FBVyxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBRTlDLE1BQU07QUFDTixJQUFZLFFBT1g7QUFQRCxXQUFZLFFBQVE7SUFDbEIsaUNBQXFCLENBQUE7SUFDckIsNkJBQWlCLENBQUE7SUFDakIsMEJBQWMsQ0FBQTtJQUNkLDJCQUFlLENBQUE7SUFDZiwrQkFBbUIsQ0FBQTtJQUNuQiw2QkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBUFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFPbkI7QUFFRCxpQkFBaUI7QUFDSixRQUFBLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzFDLEdBQUcsRUFBRSxDQUFDO0lBQ04sUUFBUSxFQUFFLENBQUM7SUFDWCxRQUFRLEVBQUUsQ0FBQztJQUNYLFFBQVEsRUFBRSxDQUFDO0lBQ1gsWUFBWSxFQUFFLENBQUM7Q0FDaEIsQ0FBQyxDQUFBO0FBRVcsUUFBQSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3JELEtBQUssRUFBRSxHQUFHO0lBQ1YsUUFBUSxFQUFFLEdBQUc7SUFDYixLQUFLLEVBQUUsR0FBRztDQUNYLENBQUMsQ0FBQTtBQUVXLFFBQUEsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLE1BQU0saUNBQzlDLGlDQUF5QixLQUM1QixlQUFlLEVBQUUsR0FBRyxJQUNwQixDQUFBO0FBRVcsUUFBQSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hELFdBQVcsRUFBRSxrQkFBVSxDQUFDLEdBQUcsQ0FBQztJQUM1QixXQUFXLEVBQUUsa0JBQVUsQ0FBQyxHQUFHLENBQUM7Q0FDN0IsQ0FBQyxDQUFBO0FBRUYsZ0JBQWdCO0FBQ0gsUUFBQSxZQUFZLEdBQUc7SUFDMUIsZ0JBQVMsQ0FBQyxVQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakIsZ0JBQVMsQ0FBQyxxQkFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLGdCQUFTLENBQUMsVUFBRyxDQUFXO0NBQ3pCLENBQUE7QUFFWSxRQUFBLDJCQUEyQixHQUN0QyxvRUFBb0UsQ0FBQTtBQUV6RCxRQUFBLHVCQUF1QixHQUNsQyxvRUFBb0UsQ0FBQTtBQUV0RSxVQUFVO0FBQ0csUUFBQSxLQUFLLEdBQUcsT0FBTyxDQUFBO0FBQ2YsUUFBQSxPQUFPLEdBQUcsU0FBUyxDQUFBO0FBRWhDLGtEQUFrRDtBQUNsRCxtRUFBbUUifQ==
