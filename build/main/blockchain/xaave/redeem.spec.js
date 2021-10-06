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
const redeem_1 = require('./redeem')
ava_1.default('Get maximum redeemable xAAVEa', async (t) => {
  const maxRedeemable = await redeem_1.getMaximumRedeemableXAave(
    abis_1.X_AAVE_A,
    constants_spec_1.provider
  )
  console.log('Maximum redeemable xAAVEa:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
ava_1.default('Get maximum redeemable xAAVEb', async (t) => {
  const maxRedeemable = await redeem_1.getMaximumRedeemableXAave(
    abis_1.X_AAVE_B,
    constants_spec_1.provider
  )
  console.log('Maximum redeemable xAAVEb:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWF2ZS9yZWRlZW0uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFpRDtBQUNqRCw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLHFDQUFvRDtBQUVwRCxhQUFJLENBQUMsK0JBQStCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2hELE1BQU0sYUFBYSxHQUFHLE1BQU0sa0NBQXlCLENBQUMsZUFBUSxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUN6RSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQ3hELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFBO0FBRUYsYUFBSSxDQUFDLCtCQUErQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNoRCxNQUFNLGFBQWEsR0FBRyxNQUFNLGtDQUF5QixDQUFDLGVBQVEsRUFBRSx5QkFBUSxDQUFDLENBQUE7SUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUN4RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNuQyxDQUFDLENBQUMsQ0FBQSJ9
