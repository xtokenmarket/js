import { X_U3LP_A, X_U3LP_B, X_U3LP_C, X_U3LP_D, X_U3LP_E, X_U3LP_F, X_U3LP_G, X_U3LP_H, } from '@xtoken/abis';
import test from 'ava';
import { provider } from '../../constants.spec';
import { getMaximumRedeemableXU3LP } from './redeem';
test('Get maximum redeemable xU3LPa when burning to DAI', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_A, 0, provider);
    console.log('Maximum redeemable xU3LPa when burning to DAI:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPa when burning to USDC', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_A, 1, provider);
    console.log('Maximum redeemable xU3LPa when burning to USDC:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPb when burning to USDC', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_B, 0, provider);
    console.log('Maximum redeemable xU3LPb when burning to USDC:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPb when burning to USDT', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_B, 1, provider);
    console.log('Maximum redeemable xU3LPb when burning to USDT:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPc when burning to sUSD', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_C, 0, provider);
    console.log('Maximum redeemable xU3LPc when burning to sUSD:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPc when burning to USDC', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_C, 1, provider);
    console.log('Maximum redeemable xU3LPc when burning to USDC:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPd when burning to sETH', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_D, 0, provider);
    console.log('Maximum redeemable xU3LPd when burning to sETH:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPd when burning to WETH', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_D, 1, provider);
    console.log('Maximum redeemable xU3LPd when burning to WETH:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPe when burning to WBTC', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_E, 0, provider);
    console.log('Maximum redeemable xU3LPe when burning to WBTC:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPe when burning to renBTC', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_E, 1, provider);
    console.log('Maximum redeemable xU3LPe when burning to renBTC:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPf when burning to USDC', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_F, 0, provider);
    console.log('Maximum redeemable xU3LPf when burning to USDC:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPf when burning to UST', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_F, 1, provider);
    console.log('Maximum redeemable xU3LPf when burning to UST:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPg when burning to FRAX', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_G, 0, provider);
    console.log('Maximum redeemable xU3LPg when burning to FRAX:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPg when burning to USDC', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_G, 1, provider);
    console.log('Maximum redeemable xU3LPg when burning to USDC:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPh when burning to BUSD', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_H, 0, provider);
    console.log('Maximum redeemable xU3LPh when burning to BUSD:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
test('Get maximum redeemable xU3LPh when burning to USDT', async (t) => {
    const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_H, 1, provider);
    console.log('Maximum redeemable xU3LPh when burning to USDT:', maxRedeemable);
    t.true(Number(maxRedeemable) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94dTNscC9yZWRlZW0uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsR0FDVCxNQUFNLGNBQWMsQ0FBQTtBQUNyQixPQUFPLElBQUksTUFBTSxLQUFLLENBQUE7QUFFdEIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRS9DLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVwRCxJQUFJLENBQUMsbURBQW1ELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3BFLE1BQU0sYUFBYSxHQUFHLE1BQU0seUJBQXlCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQzVFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRSxNQUFNLGFBQWEsR0FBRyxNQUFNLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUM3RSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNuQyxDQUFDLENBQUMsQ0FBQTtBQUVG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