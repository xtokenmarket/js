import { getXAlphaContracts } from './helper';
import { getXAlphaPrices } from './prices';
export const getXAlphaAsset = async (symbol, provider) => {
    const { xalphaContract } = await getXAlphaContracts(symbol, provider);
    const { aum, priceEth, priceUsd } = await getXAlphaPrices(xalphaContract);
    return {
        aum,
        mandate: 'Liquid Staker',
        order: 17,
        price: priceUsd,
        priceEth,
        symbol,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWxwaGEvYXNzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFMUMsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFDakMsTUFBd0IsRUFDeEIsUUFBc0IsRUFDTCxFQUFFO0lBQ25CLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxNQUFNLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUVyRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUV6RSxPQUFPO1FBQ0wsR0FBRztRQUNILE9BQU8sRUFBRSxlQUFlO1FBQ3hCLEtBQUssRUFBRSxFQUFFO1FBQ1QsS0FBSyxFQUFFLFFBQVE7UUFDZixRQUFRO1FBQ1IsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUEifQ==