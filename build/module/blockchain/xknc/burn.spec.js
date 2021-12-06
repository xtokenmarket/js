import { X_KNC_A, X_KNC_B } from '@xtoken/abis';
import test from 'ava';
import { provider } from '../../constants.spec';
import { getExpectedQuantityOnBurnXKnc } from './burn';
/*test('Calculate ETH expected quantity on burn of xKNCa', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXKnc(
    X_KNC_A,
    true,
    '1',
    provider
  )
  console.log('Expected ETH qty for 1 xKNCa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
test('Calculate KNC expected quantity on burn of xKNCa', async (t) => {
    const expectedQty = await getExpectedQuantityOnBurnXKnc(X_KNC_A, false, '1', provider);
    console.log('Expected KNC qty for 1 xKNCa:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
/*test('Calculate ETH expected quantity on burn of xKNCb', async (t) => {
  const expectedQty = await getExpectedQuantityOnBurnXKnc(
    X_KNC_B,
    true,
    '1',
    provider
  )
  console.log('Expected ETH qty for 1 xKNCb:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
test('Calculate KNC expected quantity on burn of xKNCb', async (t) => {
    const expectedQty = await getExpectedQuantityOnBurnXKnc(X_KNC_B, false, '1', provider);
    console.log('Expected KNC qty for 1 xKNCb:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9idXJuLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDL0MsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFBO0FBRXRCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUUvQyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFdEQ7Ozs7Ozs7OztJQVNJO0FBRUosSUFBSSxDQUFDLGtEQUFrRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNuRSxNQUFNLFdBQVcsR0FBRyxNQUFNLDZCQUE2QixDQUNyRCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEdBQUcsRUFDSCxRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDekQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRjs7Ozs7Ozs7O0lBU0k7QUFFSixJQUFJLENBQUMsa0RBQWtELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ25FLE1BQU0sV0FBVyxHQUFHLE1BQU0sNkJBQTZCLENBQ3JELE9BQU8sRUFDUCxLQUFLLEVBQ0wsR0FBRyxFQUNILFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQSJ9