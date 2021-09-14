import { AAVE_X_AAVE_A_CLR, XTK_ETH_CLR } from '@xtoken/abis'
import test from 'ava'
import { provider } from '../../constants.spec'
import { getExpectedQuantityOnBurnXAssetCLR } from './burn'
test(`Calculate expected quantity of AAVE & xAAVEa on burn of ${AAVE_X_AAVE_A_CLR}`, async (t) => {
  const estimateQty = await getExpectedQuantityOnBurnXAssetCLR(
    AAVE_X_AAVE_A_CLR,
    '1000',
    provider
  )
  console.log(
    `Expected qty of AAVE & xAAVEa for 1000 ${AAVE_X_AAVE_A_CLR}:`,
    estimateQty[0],
    estimateQty[1]
  )
  t.true(Number(estimateQty[0]) > 0 && Number(estimateQty[1]) > 0)
})
test(`Calculate expected quantity of XTK & ETH on burn of ${XTK_ETH_CLR}`, async (t) => {
  const estimateQty = await getExpectedQuantityOnBurnXAssetCLR(
    XTK_ETH_CLR,
    '1000',
    provider
  )
  console.log(
    `Expected qty of XTK & ETH for 1000 ${XTK_ETH_CLR}:`,
    estimateQty[0],
    estimateQty[1]
  )
  t.true(Number(estimateQty[0]) > 0 && Number(estimateQty[1]) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vY2xyL2J1cm4uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQzdELE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFL0MsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRTNELElBQUksQ0FBQywyREFBMkQsaUJBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxrQ0FBa0MsQ0FDMUQsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQ1QsMENBQTBDLGlCQUFpQixHQUFHLEVBQzlELFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDZCxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQTtJQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsdURBQXVELFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRixNQUFNLFdBQVcsR0FBRyxNQUFNLGtDQUFrQyxDQUMxRCxXQUFXLEVBQ1gsTUFBTSxFQUNOLFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FDVCxzQ0FBc0MsV0FBVyxHQUFHLEVBQ3BELFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDZCxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQTtJQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFDLENBQUEifQ==
