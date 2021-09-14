import test from 'ava'
import { STAKE, UNSTAKE } from '../../constants'
import { provider, testAddress } from '../../constants.spec'
import { getXtkHistory } from './history'
test('Get Staking history', async (t) => {
  const stakeHistory = await getXtkHistory(STAKE, testAddress, provider)
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
test('Get Unstaking history', async (t) => {
  const unstakeHistory = await getXtkHistory(UNSTAKE, testAddress, provider)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vc3Rha2luZy9oaXN0b3J5LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFBO0FBRXRCLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFDaEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUU1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFBO0FBRXpDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdEMsTUFBTSxZQUFZLEdBQUcsTUFBTSxhQUFhLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN0RSxNQUFNLGtCQUFrQixHQUFHO1FBQ3pCLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxPQUFPO1FBQ2QsS0FBSyxFQUFFLE9BQU87UUFDZCxNQUFNLEVBQ0osb0VBQW9FO0tBQ3ZFLENBQUE7SUFDRCxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtBQUM3QyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEMsTUFBTSxjQUFjLEdBQUcsTUFBTSxhQUFhLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUMxRSxNQUFNLGtCQUFrQixHQUFHO1FBQ3pCLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxTQUFTO1FBQ2hCLEtBQUssRUFBRSxNQUFNO1FBQ2IsTUFBTSxFQUNKLG9FQUFvRTtLQUN2RSxDQUFBO0lBQ0QsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3BDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLGtCQUFrQixDQUFDLENBQUE7QUFDN0MsQ0FBQyxDQUFDLENBQUEifQ==