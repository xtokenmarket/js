import { X_AAVE_A, X_AAVE_B } from '@xtoken/abis'
import test from 'ava'
import { provider } from '../../constants.spec'
import { getExpectedQuantityOnMintXAave } from './mint'
test('Calculate xAAVEa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAave(
    X_AAVE_A,
    true,
    '1',
    provider
  )
  console.log('Expected xAAVEa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
test('Calculate xAAVEa expected quantity on mint with AAVE', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAave(
    X_AAVE_A,
    false,
    '1',
    provider
  )
  console.log('Expected xAAVEa qty for 1 AAVE:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
test('Calculate xAAVEb expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAave(
    X_AAVE_B,
    true,
    '1',
    provider
  )
  console.log('Expected xAAVEb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
test('Calculate xAAVEb expected quantity on mint with AAVE', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXAave(
    X_AAVE_B,
    false,
    '1',
    provider
  )
  console.log('Expected xAAVEb qty for 1 AAVE:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFhdmUvbWludC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ2pELE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFL0MsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRXZELElBQUksQ0FBQyxxREFBcUQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdEUsTUFBTSxXQUFXLEdBQUcsTUFBTSw4QkFBOEIsQ0FDdEQsUUFBUSxFQUNSLElBQUksRUFDSixHQUFHLEVBQ0gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzFELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLHNEQUFzRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN2RSxNQUFNLFdBQVcsR0FBRyxNQUFNLDhCQUE4QixDQUN0RCxRQUFRLEVBQ1IsS0FBSyxFQUNMLEdBQUcsRUFDSCxRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDM0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMscURBQXFELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3RFLE1BQU0sV0FBVyxHQUFHLE1BQU0sOEJBQThCLENBQ3RELFFBQVEsRUFDUixJQUFJLEVBQ0osR0FBRyxFQUNILFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMxRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxzREFBc0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdkUsTUFBTSxXQUFXLEdBQUcsTUFBTSw4QkFBOEIsQ0FDdEQsUUFBUSxFQUNSLEtBQUssRUFDTCxHQUFHLEVBQ0gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzNELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBIn0=