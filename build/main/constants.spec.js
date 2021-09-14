'use strict'
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
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ropstenProvider = exports.provider = exports.testAddress = exports.infuraApiKey = void 0
const dotenv = __importStar(require('dotenv'))
const ethers_1 = require('ethers')
dotenv.config()
exports.infuraApiKey = process.env.INFURA_API_KEY
exports.testAddress = process.env.TEST_ADDRESS
exports.provider = new ethers_1.ethers.providers.InfuraProvider(
  'homestead',
  exports.infuraApiKey
)
exports.ropstenProvider = new ethers_1.ethers.providers.InfuraProvider(
  'ropsten',
  exports.infuraApiKey
)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc3RhbnRzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFnQztBQUNoQyxtQ0FBK0I7QUFFL0IsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRUYsUUFBQSxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUF3QixDQUFBO0FBQ25ELFFBQUEsV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBc0IsQ0FBQTtBQUVoRCxRQUFBLFFBQVEsR0FBRyxJQUFJLGVBQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUN6RCxXQUFXLEVBQ1gsb0JBQVksQ0FDYixDQUFBO0FBRVksUUFBQSxlQUFlLEdBQUcsSUFBSSxlQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FDaEUsU0FBUyxFQUNULG9CQUFZLENBQ2IsQ0FBQSJ9
