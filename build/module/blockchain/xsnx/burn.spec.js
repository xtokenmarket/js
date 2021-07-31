import test from 'ava'
import { provider } from '../../constants.spec'
import { getExpectedQuantityOnBurnXSnx } from './burn'
test('Calculate ETH expected quantity on burn of xSNXa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXSnx('1', provider)
  console.log('Expected ETH qty for 1 xSNXa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9idXJuLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFBO0FBRXRCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUUvQyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFdEQsSUFBSSxDQUFDLGtEQUFrRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuRSxNQUFNLFdBQVcsR0FBRyxNQUFNLDZCQUE2QixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBIn0=
