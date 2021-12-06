import { X_KNC_A, X_KNC_B } from '@xtoken/abis';
import test from 'ava';
import { provider, testAddress } from '../../constants.spec';
import { getPortfolioItemXKnc } from './portfolio';
test('Get xKNCa portfolio balance', async (t) => {
    const portfolioItem = await getPortfolioItemXKnc(X_KNC_A, testAddress, provider);
    console.log('Portfolio balance xKNCa:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
test('Get xKNCb portfolio balance', async (t) => {
    const portfolioItem = await getPortfolioItemXKnc(X_KNC_B, testAddress, provider);
    console.log('Portfolio balance xKNCb:', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94a25jL3BvcnRmb2xpby5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQy9DLE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQTtBQUV0QixPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRTVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUVsRCxJQUFJLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzlDLE1BQU0sYUFBYSxHQUFHLE1BQU0sb0JBQW9CLENBQzlDLE9BQU8sRUFDUCxXQUFXLEVBQ1gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMvRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzlDLE1BQU0sYUFBYSxHQUFHLE1BQU0sb0JBQW9CLENBQzlDLE9BQU8sRUFDUCxXQUFXLEVBQ1gsUUFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMvRCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUEifQ==