import { getXSnxContracts } from './helper';
import { getXSnxPrices } from './prices';
export const getXSnxAsset = async (symbol, provider) => {
    const { xsnxContract } = await getXSnxContracts(provider);
    const { aum, priceEth, priceUsd } = await getXSnxPrices(xsnxContract);
    return {
        aum,
        mandate: 'Aggressive staker; ETH bull',
        order: 3,
        price: priceUsd,
        priceEth,
        symbol,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94c254L2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXhDLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQy9CLE1BQXNCLEVBQ3RCLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUV6RCxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUVyRSxPQUFPO1FBQ0wsR0FBRztRQUNILE9BQU8sRUFBRSw2QkFBNkI7UUFDdEMsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLEVBQUUsUUFBUTtRQUNmLFFBQVE7UUFDUixNQUFNO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9