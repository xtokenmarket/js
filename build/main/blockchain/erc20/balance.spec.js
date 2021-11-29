'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const abis_1 = require('@xtoken/abis')
const ava_1 = __importDefault(require('ava'))
const constants_spec_1 = require('../../constants.spec')
const balance_1 = require('./balance')
ava_1.default('Get token balance of xAAVEa for test address', async (t) => {
  const tokenBalance = await balance_1.getTokenBalance(
    abis_1.X_AAVE_A,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  console.log('Token balance of xAAVEa for test address:', tokenBalance)
  t.true(Number(tokenBalance) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXJjMjAvYmFsYW5jZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBQXVDO0FBQ3ZDLDhDQUFzQjtBQUV0Qix5REFBNEQ7QUFFNUQsdUNBQTJDO0FBRTNDLGFBQUksQ0FBQyw4Q0FBOEMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0QsTUFBTSxZQUFZLEdBQUcsTUFBTSx5QkFBZSxDQUFDLGVBQVEsRUFBRSw0QkFBVyxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUMzRSxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ3RFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2xDLENBQUMsQ0FBQyxDQUFBIn0=
