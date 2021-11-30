import { getXAssetLevContracts } from './helper';
import { getXAssetLevPrices } from './prices';
export const getXAssetLev = async (symbol, provider) => {
    const { xassetlevContract } = await getXAssetLevContracts(symbol, provider);
    const { aum, priceEth, priceUsd } = await getXAssetLevPrices(xassetlevContract);
    return {
        aum,
        mandate: 'Liquid Staker',
        order: 18,
        price: priceUsd,
        priceEth,
        symbol,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZXYvYXNzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ2hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUU3QyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUMvQixNQUFrQixFQUNsQixRQUFzQixFQUNGLEVBQUU7SUFDdEIsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFM0UsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxrQkFBa0IsQ0FDMUQsaUJBQWlCLENBQ2xCLENBQUE7SUFFRCxPQUFPO1FBQ0wsR0FBRztRQUNILE9BQU8sRUFBRSxlQUFlO1FBQ3hCLEtBQUssRUFBRSxFQUFFO1FBQ1QsS0FBSyxFQUFFLFFBQVE7UUFDZixRQUFRO1FBQ1IsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUEifQ==