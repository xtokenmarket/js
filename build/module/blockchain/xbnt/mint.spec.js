import { X_BNT_A } from '@xtoken/abis'
import test from 'ava'
import { provider } from '../../constants.spec'
import { getExpectedQuantityOnMintXBnt } from './mint'
test('Calculate xBNTa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXBnt(
    X_BNT_A,
    true,
    '1',
    provider
  )
  console.log('Expected xBNTa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
test('Calculate xBNTa expected quantity on mint with BNT', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXBnt(
    X_BNT_A,
    false,
    '1',
    provider
  )
  console.log('Expected xBNTa qty for 1 BNT:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGJudC9taW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLElBQUksTUFBTSxLQUFLLENBQUE7QUFFdEIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRS9DLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUV0RCxJQUFJLENBQUMsb0RBQW9ELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sV0FBVyxHQUFHLE1BQU0sNkJBQTZCLENBQ3JELE9BQU8sRUFDUCxJQUFJLEVBQ0osR0FBRyxFQUNILFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxvREFBb0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckUsTUFBTSxXQUFXLEdBQUcsTUFBTSw2QkFBNkIsQ0FDckQsT0FBTyxFQUNQLEtBQUssRUFDTCxHQUFHLEVBQ0gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBIn0=
