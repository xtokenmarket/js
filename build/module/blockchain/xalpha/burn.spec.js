import { X_ALPHA_A } from '@xtoken/abis';
import test from 'ava';
import { provider } from '../../constants.spec';
import { getExpectedQuantityOnBurnXAlpha } from './burn';
test('Calculate ALPHA expected quantity on burn of xALPHAa', async (t) => {
    const expectedQty = await getExpectedQuantityOnBurnXAlpha(X_ALPHA_A, false, '10', provider);
    console.log('Expected ALPHA qty for 10 xALPHAa: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
test('Calculate ETH expected quantity on burn of xALPHAa', async (t) => {
    const expectedQty = await getExpectedQuantityOnBurnXAlpha(X_ALPHA_A, true, '10', provider);
    console.log('Expected ETH qty for 10 xALPHAa: ', expectedQty);
    t.true(Number(expectedQty) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGFscGhhL2J1cm4uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ3hDLE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFL0MsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRXhELElBQUksQ0FBQyxzREFBc0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdkUsTUFBTSxXQUFXLEdBQUcsTUFBTSwrQkFBK0IsQ0FDdkQsU0FBUyxFQUNULEtBQUssRUFDTCxJQUFJLEVBQ0osUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQy9ELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRSxNQUFNLFdBQVcsR0FBRyxNQUFNLCtCQUErQixDQUN2RCxTQUFTLEVBQ1QsSUFBSSxFQUNKLElBQUksRUFDSixRQUFRLENBQ1QsQ0FBQTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDN0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUEifQ==