'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.BNT_ETH_PATH = exports.DEFAULT_TOKEN_PRICES = exports.DEFAULT_PORTFOLIO_ITEM = exports.DEFAULT_LP_PORTFOLIO_ITEM = exports.DEFAULT_PRICES = exports.Exchange = exports.ZERO_NUMBER = exports.MAX_UINT = exports.GAS_LIMIT_PERCENTAGE_ETH = exports.GAS_LIMIT_PERCENTAGE_DEFAULT = exports.DEC_18 = void 0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBcUQ7QUFDckQsdUNBQWtFO0FBQ2xFLG1DQUFrQztBQUNsQyw0Q0FBNkM7QUFFaEMsUUFBQSxNQUFNLEdBQUcsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN4QixRQUFBLDRCQUE0QixHQUFHLEdBQUcsQ0FBQTtBQUNsQyxRQUFBLHdCQUF3QixHQUFHLEdBQUcsQ0FBQTtBQUM5QixRQUFBLFFBQVEsR0FBRyxzQkFBVSxDQUFBO0FBQ3JCLFFBQUEsV0FBVyxHQUFHLGtCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBRTlDLE1BQU07QUFDTixJQUFZLFFBT1g7QUFQRCxXQUFZLFFBQVE7SUFDbEIsaUNBQXFCLENBQUE7SUFDckIsNkJBQWlCLENBQUE7SUFDakIsMEJBQWMsQ0FBQTtJQUNkLDJCQUFlLENBQUE7SUFDZiwrQkFBbUIsQ0FBQTtJQUNuQiw2QkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBUFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFPbkI7QUFFRCxpQkFBaUI7QUFDSixRQUFBLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzFDLEdBQUcsRUFBRSxDQUFDO0lBQ04sUUFBUSxFQUFFLENBQUM7SUFDWCxRQUFRLEVBQUUsQ0FBQztJQUNYLFlBQVksRUFBRSxDQUFDO0NBQ2hCLENBQUMsQ0FBQTtBQUVXLFFBQUEseUJBQXlCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNyRCxLQUFLLEVBQUUsR0FBRztJQUNWLFFBQVEsRUFBRSxHQUFHO0lBQ2IsS0FBSyxFQUFFLEdBQUc7Q0FDWCxDQUFDLENBQUE7QUFFVyxRQUFBLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxNQUFNLGlDQUM5QyxpQ0FBeUIsS0FDNUIsZUFBZSxFQUFFLEdBQUcsSUFDcEIsQ0FBQTtBQUVXLFFBQUEsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoRCxXQUFXLEVBQUUsa0JBQVUsQ0FBQyxHQUFHLENBQUM7SUFDNUIsV0FBVyxFQUFFLGtCQUFVLENBQUMsR0FBRyxDQUFDO0NBQzdCLENBQUMsQ0FBQTtBQUVGLGdCQUFnQjtBQUNILFFBQUEsWUFBWSxHQUFHO0lBQzFCLGdCQUFTLENBQUMsVUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLGdCQUFTLENBQUMscUJBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixnQkFBUyxDQUFDLFVBQUcsQ0FBVztDQUN6QixDQUFBIn0=
