// import { BUY, ETH, SELL, X_BNT_A } from '@xtoken/abis'
import test from 'ava'
import { isAddress } from 'ethers/lib/utils'

import { provider } from '../../constants.spec'

import {
  // getBancorEstimatedQuantity,
  getBancorNetworkAddress,
  // getBancorPortfolioItem,
  getBntEthPrice,
} from './bancor'

test('Get Bancor Network address', async (t) => {
  const bancorNetworkAddress = await getBancorNetworkAddress(provider)
  console.log('[Bancor] Bancor Network address:', bancorNetworkAddress)
  t.true(isAddress(bancorNetworkAddress))
})

test('Get BNT ETH price', async (t) => {
  const minReturn = await getBntEthPrice(provider)
  console.log('[Bancor] minReturn:', minReturn)
  t.true(Number(minReturn) > 0)
})

/*test('Calculate expected quantity on burn of xBNTa with ETH on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    ETH,
    X_BNT_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Bancor] Expected ETH qty for 1000 xBNTa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on burn of xBNTa with BNT on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    X_BNT_A,
    X_BNT_A,
    '1000',
    SELL,
    provider
  )
  console.log('[Bancor] Expected BNT qty for 1000 xBNTa:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xBNTa on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    ETH,
    X_BNT_A,
    '1',
    BUY,
    provider
  )
  console.log('[Bancor] Expected xBNTa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Calculate expected quantity on mint of xBNTa with BNT on Bancor', async (t) => {
  const expectedQty = await getBancorEstimatedQuantity(
    X_BNT_A,
    X_BNT_A,
    '100',
    BUY,
    provider
  )
  console.log('[Bancor] Expected xBNTa qty for 100 BNT:', expectedQty)
  t.true(Number(expectedQty) > 0)
})

test('Get Bancor Portfolio of xBNTa', async (t) => {
  const portfolio = await getBancorPortfolioItem(X_BNT_A, testAddress, provider)
  console.log('[Bancor] Portfolio value of xBNTa:', portfolio?.value)
  t.true(Number(portfolio?.value) > 0)
})*/
