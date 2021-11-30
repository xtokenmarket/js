import { X_KNC_A, X_KNC_B } from '@xtoken/abis';
import test from 'ava';
import { provider } from '../../constants.spec';
import { getExpectedQuantityOnMintXKnc } from './mint';
/*test('Calculate xKNCa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    X_KNC_A,
    true,
    '1',
    provider
  )
  console.log('Expected xKNCa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
test('Calculate xKNCa expected quantity on mint with KNC', async (t) => {
    const expectedQty = await getExpectedQuantityOnMintXKnc(X_KNC_A, false, '1', provider);
    console.log('Expected xKNCa qty for 1 KNC:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
/*test('Calculate xKNCb expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    X_KNC_B,
    true,
    '1',
    provider
  )
  console.log('Expected xKNCb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
test('Calculate xKNCb expected quantity on mint with KNC', async (t) => {
    const expectedQty = await getExpectedQuantityOnMintXKnc(X_KNC_B, false, '1', provider);
    console.log('Expected xKNCb qty for 1 KNC:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9taW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDL0MsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFBO0FBRXRCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUUvQyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFdEQ7Ozs7Ozs7OztJQVNJO0FBRUosSUFBSSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRSxNQUFNLFdBQVcsR0FBRyxNQUFNLDZCQUE2QixDQUNyRCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEdBQUcsRUFDSCxRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDekQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRjs7Ozs7Ozs7O0lBU0k7QUFFSixJQUFJLENBQUMsb0RBQW9ELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sV0FBVyxHQUFHLE1BQU0sNkJBQTZCLENBQ3JELE9BQU8sRUFDUCxLQUFLLEVBQ0wsR0FBRyxFQUNILFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQSJ9