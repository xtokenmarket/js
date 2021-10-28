'use strict'
/**
 * @packageDocumentation
 * @module XToken JS
 */
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k]
          },
        })
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p)
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXU3LPPrices = exports.getXSnxPrices = exports.getXKncPrices = exports.getXInchPrices = exports.getXBntPrices = exports.getXAlphaPrices = exports.getXAavePrices = exports.getXAssetCLRPrices = exports.XToken = void 0
var xToken_1 = require('./xToken')
Object.defineProperty(exports, 'XToken', {
  enumerable: true,
  get: function () {
    return xToken_1.XToken
  },
})
// Helper methods
var clr_1 = require('./blockchain/clr')
Object.defineProperty(exports, 'getXAssetCLRPrices', {
  enumerable: true,
  get: function () {
    return clr_1.getXAssetCLRPrices
  },
})
var xaave_1 = require('./blockchain/xaave')
Object.defineProperty(exports, 'getXAavePrices', {
  enumerable: true,
  get: function () {
    return xaave_1.getXAavePrices
  },
})
var xalpha_1 = require('./blockchain/xalpha')
Object.defineProperty(exports, 'getXAlphaPrices', {
  enumerable: true,
  get: function () {
    return xalpha_1.getXAlphaPrices
  },
})
var xbnt_1 = require('./blockchain/xbnt')
Object.defineProperty(exports, 'getXBntPrices', {
  enumerable: true,
  get: function () {
    return xbnt_1.getXBntPrices
  },
})
var xinch_1 = require('./blockchain/xinch')
Object.defineProperty(exports, 'getXInchPrices', {
  enumerable: true,
  get: function () {
    return xinch_1.getXInchPrices
  },
})
var xknc_1 = require('./blockchain/xknc')
Object.defineProperty(exports, 'getXKncPrices', {
  enumerable: true,
  get: function () {
    return xknc_1.getXKncPrices
  },
})
var xsnx_1 = require('./blockchain/xsnx')
Object.defineProperty(exports, 'getXSnxPrices', {
  enumerable: true,
  get: function () {
    return xsnx_1.getXSnxPrices
  },
})
var xu3lp_1 = require('./blockchain/xu3lp')
Object.defineProperty(exports, 'getXU3LPPrices', {
  enumerable: true,
  get: function () {
    return xu3lp_1.getXU3LPPrices
  },
})
// Utility methods
__exportStar(require('./blockchain/utils'), exports)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRzs7Ozs7Ozs7Ozs7OztBQUVILG1DQUFpQztBQUF4QixnR0FBQSxNQUFNLE9BQUE7QUFFZixpQkFBaUI7QUFDakIsd0NBQXFEO0FBQTVDLHlHQUFBLGtCQUFrQixPQUFBO0FBQzNCLDRDQUFtRDtBQUExQyx1R0FBQSxjQUFjLE9BQUE7QUFDdkIsOENBQXFEO0FBQTVDLHlHQUFBLGVBQWUsT0FBQTtBQUN4QiwwQ0FBaUQ7QUFBeEMscUdBQUEsYUFBYSxPQUFBO0FBQ3RCLDRDQUFtRDtBQUExQyx1R0FBQSxjQUFjLE9BQUE7QUFDdkIsMENBQWlEO0FBQXhDLHFHQUFBLGFBQWEsT0FBQTtBQUN0QiwwQ0FBaUQ7QUFBeEMscUdBQUEsYUFBYSxPQUFBO0FBQ3RCLDRDQUFtRDtBQUExQyx1R0FBQSxjQUFjLE9BQUE7QUFFdkIsa0JBQWtCO0FBQ2xCLHFEQUFrQyJ9
