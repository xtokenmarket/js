import test from 'ava'
import { provider } from '../../constants.spec'
import { getMaximumRedeemableXSnx } from './redeem'
test('Get maximum redeemable xSNX', async (t) => {
  const maxRedeemable = await getMaximumRedeemableXSnx(provider)
  console.log('Maximum redeemable xSNX:', maxRedeemable)
  t.true(Number(maxRedeemable) > 0)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94c254L3JlZGVlbS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRW5ELElBQUksQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDOUMsTUFBTSxhQUFhLEdBQUcsTUFBTSx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQ3RELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFBIn0=
