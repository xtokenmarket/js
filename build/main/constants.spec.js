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
exports.ropstenProvider = exports.kovanProvider = exports.provider = exports.testAddress = void 0
const dotenv = __importStar(require('dotenv'))
const ethers_1 = require('ethers')
dotenv.config()
exports.testAddress = process.env.TEST_ADDRESS
exports.provider = new ethers_1.ethers.providers.InfuraProvider(
  'homestead',
  '01a0666704244d44812fc70d214a913b'
)
exports.kovanProvider = new ethers_1.ethers.providers.InfuraProvider(
  'kovan',
  '01a0666704244d44812fc70d214a913b'
)
exports.ropstenProvider = new ethers_1.ethers.providers.InfuraProvider(
  'ropsten',
  '01a0666704244d44812fc70d214a913b'
)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc3RhbnRzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFnQztBQUNoQyxtQ0FBK0I7QUFFL0IsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRUYsUUFBQSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFzQixDQUFBO0FBRWhELFFBQUEsUUFBUSxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQ3pELFdBQVcsRUFDWCxrQ0FBa0MsQ0FDbkMsQ0FBQTtBQUVZLFFBQUEsYUFBYSxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQzlELE9BQU8sRUFDUCxrQ0FBa0MsQ0FDbkMsQ0FBQTtBQUVZLFFBQUEsZUFBZSxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQ2hFLFNBQVMsRUFDVCxrQ0FBa0MsQ0FDbkMsQ0FBQSJ9
