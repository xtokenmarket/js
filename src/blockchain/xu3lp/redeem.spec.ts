import {
  X_U3LP_A,
  X_U3LP_B,
  X_U3LP_C,
  X_U3LP_D,
  X_U3LP_E,
  X_U3LP_F,
  X_U3LP_G,
  X_U3LP_H,
} from '@xtoken/abis'
import test from 'ava'

import { provider } from '../../constants.spec'

import { getMaximumRedeemableXU3LP } from './redeem'

test('Get maximum redeemable xU3LPa when burning to DAI', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_A, 0, provider)
  console.log('Maximum redeemable xU3LPa when burning to DAI:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPa when burning to USDC', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_A, 1, provider)
  console.log('Maximum redeemable xU3LPa when burning to USDC:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPb when burning to USDC', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_B, 0, provider)
  console.log('Maximum redeemable xU3LPb when burning to USDC:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPb when burning to USDT', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_B, 1, provider)
  console.log('Maximum redeemable xU3LPb when burning to USDT:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPc when burning to sUSD', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_C, 0, provider)
  console.log('Maximum redeemable xU3LPc when burning to sUSD:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPc when burning to USDC', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_C, 1, provider)
  console.log('Maximum redeemable xU3LPc when burning to USDC:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPd when burning to sETH', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_D, 0, provider)
  console.log('Maximum redeemable xU3LPd when burning to sETH:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPd when burning to WETH', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_D, 1, provider)
  console.log('Maximum redeemable xU3LPd when burning to WETH:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPe when burning to WBTC', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_E, 0, provider)
  console.log('Maximum redeemable xU3LPe when burning to WBTC:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPe when burning to renBTC', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_E, 1, provider)
  console.log(
    'Maximum redeemable xU3LPe when burning to renBTC:',
    maxRedeemable
  )
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPf when burning to USDC', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_F, 0, provider)
  console.log('Maximum redeemable xU3LPf when burning to USDC:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPf when burning to UST', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_F, 1, provider)
  console.log('Maximum redeemable xU3LPf when burning to UST:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPg when burning to FRAX', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_G, 0, provider)
  console.log('Maximum redeemable xU3LPg when burning to FRAX:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPg when burning to USDC', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_G, 1, provider)
  console.log('Maximum redeemable xU3LPg when burning to USDC:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPh when burning to BUSD', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_H, 0, provider)
  console.log('Maximum redeemable xU3LPh when burning to BUSD:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})

test('Get maximum redeemable xU3LPh when burning to USDT', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXU3LP(X_U3LP_H, 1, provider)
  console.log('Maximum redeemable xU3LPh when burning to USDT:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
