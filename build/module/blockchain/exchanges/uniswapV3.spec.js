import { BUY, SELL, X_AAVE_A } from '@xtoken/abis'
import test from 'ava'
import { provider } from '../../constants.spec'
import { getUniswapV3EstimatedQty } from './uniswapV3'
test('Calculate expected quantity on mint of xAAVEa on UniswapV3', async (t) => {
  const expectedQty = await getUniswapV3EstimatedQty(
    X_AAVE_A,
    X_AAVE_A,
    '1',
    BUY,
    undefined,
    provider
  )
  console.log('[UniswapV3] Expected xAAVEa qty for 1 AAVE:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
test('Calculate expected quantity on burn of xAAVEa on UniswapV3', async (t) => {
  const expectedQty = await getUniswapV3EstimatedQty(
    X_AAVE_A,
    X_AAVE_A,
    '100',
    SELL,
    undefined,
    provider
  )
  console.log('[UniswapV3] Expected AAVE qty for 100 xAAVEa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcFYzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9leGNoYW5nZXMvdW5pc3dhcFYzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ2xELE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRXRELElBQUksQ0FBQyw0REFBNEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDN0UsTUFBTSxXQUFXLEdBQUcsTUFBTSx3QkFBd0IsQ0FDaEQsUUFBUSxFQUNSLFFBQVEsRUFDUixHQUFHLEVBQ0gsR0FBRyxFQUNILFNBQVMsRUFDVCxRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdkUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsNERBQTRELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzdFLE1BQU0sV0FBVyxHQUFHLE1BQU0sd0JBQXdCLENBQ2hELFFBQVEsRUFDUixRQUFRLEVBQ1IsS0FBSyxFQUNMLElBQUksRUFDSixTQUFTLEVBQ1QsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBIn0=
