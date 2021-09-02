'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const ava_1 = __importDefault(require('ava'))
const constants_spec_1 = require('../../constants.spec')
const liquidityPool_1 = require('./liquidityPool')
ava_1.default('Get optimal utilization rate', async (t) => {
  const optimalUtilizationRate = await liquidityPool_1.getOptimalUtilizationRate(
    constants_spec_1.provider
  )
  console.log('[Lending] Utilization rate:', optimalUtilizationRate)
  t.true(Number(optimalUtilizationRate) === 80)
})
ava_1.default('Get LPT value', async (t) => {
  const lptValue = await liquidityPool_1.getLPTValue(constants_spec_1.provider)
  console.log('[Lending] LPT Value:', lptValue)
  t.true(Number(lptValue) === 10)
})
ava_1.default('Get base LPT value', async (t) => {
  const lptBaseValue = await liquidityPool_1.getLPTBaseValue(
    constants_spec_1.provider
  )
  console.log('[Lending] LPT Base Value:', lptBaseValue)
  t.true(Number(lptBaseValue) === 10)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlxdWlkaXR5UG9vbC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9saXF1aWRpdHlQb29sLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLG1EQUl3QjtBQUV4QixhQUFJLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQy9DLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSx5Q0FBeUIsQ0FBQyx5QkFBUSxDQUFDLENBQUE7SUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxzQkFBc0IsQ0FBQyxDQUFBO0lBQ2xFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7QUFDL0MsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNoQyxNQUFNLFFBQVEsR0FBRyxNQUFNLDJCQUFXLENBQUMseUJBQVEsQ0FBQyxDQUFBO0lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sWUFBWSxHQUFHLE1BQU0sK0JBQWUsQ0FBQyx5QkFBUSxDQUFDLENBQUE7SUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUN0RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQUMsQ0FBQSJ9
