'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const ava_1 = __importDefault(require('ava'))
const constants_spec_1 = require('../../constants.spec')
const redeem_1 = require('./redeem')
ava_1.default('Get maximum redeemable xSNX', async (t) => {
  const maxRedeemable = await redeem_1.getMaximumRedeemableXSnx(
    constants_spec_1.provider
  )
  console.log('Maximum redeemable xSNX:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94c254L3JlZGVlbS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXNCO0FBRXRCLHlEQUErQztBQUUvQyxxQ0FBbUQ7QUFFbkQsYUFBSSxDQUFDLDZCQUE2QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM5QyxNQUFNLGFBQWEsR0FBRyxNQUFNLGlDQUF3QixDQUFDLHlCQUFRLENBQUMsQ0FBQTtJQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQ3RELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFBIn0=
