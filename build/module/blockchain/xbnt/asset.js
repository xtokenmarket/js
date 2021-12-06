import { getXBntContracts } from './helper';
import { getXBntPrices } from './prices';
export const getXBntAsset = async (symbol, provider) => {
    const { xbntContract } = await getXBntContracts(symbol, provider);
    const { aum, priceEth, priceUsd } = await getXBntPrices(xbntContract);
    return {
        aum,
        mandate: 'Dynamic Allocator; Buchanan Mandate',
        order: 8,
        price: priceUsd,
        priceEth,
        symbol,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94Ym50L2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXhDLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQy9CLE1BQXNCLEVBQ3RCLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFakUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFckUsT0FBTztRQUNMLEdBQUc7UUFDSCxPQUFPLEVBQUUscUNBQXFDO1FBQzlDLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxFQUFFLFFBQVE7UUFDZixRQUFRO1FBQ1IsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUEifQ==