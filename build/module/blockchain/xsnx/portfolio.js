import { formatBytes32String, formatEther, parseEther } from 'ethers/lib/utils';
import { DEFAULT_PORTFOLIO_ITEM } from '../../constants';
import { getExchangeRateContract, getUserAvailableTokenBalance } from '../utils';
import { getXSnxContracts } from './helper';
import { getXSnxPrices } from './prices';
export const getPortfolioItemXSnx = async (symbol, address, provider) => {
    try {
        const { xsnxContract } = await getXSnxContracts(provider);
        const exchangeRatesContract = (await getExchangeRateContract(provider));
        const [xsnxBal, { priceUsd }, { rate: snxPriceInUsd }] = await Promise.all([
            getUserAvailableTokenBalance(xsnxContract, address),
            getXSnxPrices(xsnxContract),
            exchangeRatesContract.rateAndUpdatedTime(formatBytes32String('SNX')),
        ]);
        const xsnxValue = parseEther((xsnxBal * priceUsd).toString());
        const tokenEquivalent = xsnxValue.div(snxPriceInUsd).toString();
        return {
            symbol,
            quantity: xsnxBal.toString(),
            price: priceUsd.toString(),
            value: formatEther(xsnxValue),
            tokenEquivalent,
        };
    }
    catch (e) {
        console.error('Error while fetching portfolio balance:', e);
        return {
            symbol,
            ...DEFAULT_PORTFOLIO_ITEM,
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9wb3J0Zm9saW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUUvRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFeEMsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsS0FBSyxFQUN2QyxNQUFxQixFQUNyQixPQUFlLEVBQ2YsUUFBc0IsRUFDRyxFQUFFO0lBQzNCLElBQUk7UUFDRixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUV6RCxNQUFNLHFCQUFxQixHQUFHLENBQUMsTUFBTSx1QkFBdUIsQ0FDMUQsUUFBUSxDQUNULENBQWtCLENBQUE7UUFFbkIsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3pFLDRCQUE0QixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUM7WUFDbkQsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUMzQixxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyRSxDQUFDLENBQUE7UUFFRixNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUM3RCxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRS9ELE9BQU87WUFDTCxNQUFNO1lBQ04sUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDNUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDN0IsZUFBZTtTQUNoQixDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMseUNBQXlDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDM0QsT0FBTztZQUNMLE1BQU07WUFDTixHQUFHLHNCQUFzQjtTQUMxQixDQUFBO0tBQ0Y7QUFDSCxDQUFDLENBQUEifQ==