'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const ava_1 = __importDefault(require('ava'))
const constants_1 = require('../../constants')
const constants_spec_1 = require('../../constants.spec')
const history_1 = require('./history')
ava_1.default('Get Staking history', async (t) => {
  const stakeHistory = await history_1.getXtkHistory(
    constants_1.STAKE,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  const expectedFirstEntry = {
    time: 1627025156,
    label: 'Stake',
    value: '10.00',
    txHash:
      '0x6f15911e46bb86df684efe840691212d3cb6ce078eb94db7710d74bf14a7b681',
  }
  const firstEntry = stakeHistory[0]
  t.deepEqual(firstEntry, expectedFirstEntry)
})
ava_1.default('Get Unstaking history', async (t) => {
  const unstakeHistory = await history_1.getXtkHistory(
    constants_1.UNSTAKE,
    constants_spec_1.testAddress,
    constants_spec_1.provider
  )
  const expectedFirstEntry = {
    time: 1627092463,
    label: 'Unstake',
    value: '0.25',
    txHash:
      '0x9f8dc60c58cd3d37f2e8db3acadb3a0f559633dddb280d2a10e077658f301e90',
  }
  const firstEntry = unstakeHistory[0]
  t.deepEqual(firstEntry, expectedFirstEntry)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vc3Rha2luZy9oaXN0b3J5LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBc0I7QUFFdEIsK0NBQWdEO0FBQ2hELHlEQUE0RDtBQUU1RCx1Q0FBeUM7QUFFekMsYUFBSSxDQUFDLHFCQUFxQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN0QyxNQUFNLFlBQVksR0FBRyxNQUFNLHVCQUFhLENBQUMsaUJBQUssRUFBRSw0QkFBVyxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUN0RSxNQUFNLGtCQUFrQixHQUFHO1FBQ3pCLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxPQUFPO1FBQ2QsS0FBSyxFQUFFLE9BQU87UUFDZCxNQUFNLEVBQ0osb0VBQW9FO0tBQ3ZFLENBQUE7SUFDRCxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtBQUM3QyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEMsTUFBTSxjQUFjLEdBQUcsTUFBTSx1QkFBYSxDQUFDLG1CQUFPLEVBQUUsNEJBQVcsRUFBRSx5QkFBUSxDQUFDLENBQUE7SUFDMUUsTUFBTSxrQkFBa0IsR0FBRztRQUN6QixJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsU0FBUztRQUNoQixLQUFLLEVBQUUsTUFBTTtRQUNiLE1BQU0sRUFDSixvRUFBb0U7S0FDdkUsQ0FBQTtJQUNELE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNwQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO0FBQzdDLENBQUMsQ0FBQyxDQUFBIn0=
