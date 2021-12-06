import { formatEther } from 'ethers/lib/utils';
import { DEFAULT_PORTFOLIO_ITEM } from '../../constants';
import { getUserAvailableTokenBalance } from '../utils';
import { getXAssetLevContracts } from './helper';
import { getXAssetLevPrices } from './prices';
export const getPortfolioItemXAssetLev = async (symbol, address, provider) => {
    try {
        const { xassetlevContract } = await getXAssetLevContracts(symbol, provider);
        const [xassetlevBal, { priceUsd }, tokenEquivalent] = await Promise.all([
            getUserAvailableTokenBalance(xassetlevContract, address),
            getXAssetLevPrices(xassetlevContract),
            getUnderlyingTokenEquivalent(xassetlevContract, address),
        ]);
        const xassetlevValue = (xassetlevBal * priceUsd).toFixed(2).toString();
        return {
            symbol,
            quantity: xassetlevBal.toString(),
            price: priceUsd.toString(),
            value: xassetlevValue.toString(),
            tokenEquivalent,
        };
    }
    catch (e) {
        console.error('Error while fetching portfolio balance: ', e);
        return {
            symbol,
            ...DEFAULT_PORTFOLIO_ITEM,
        };
    }
};
const getUnderlyingTokenEquivalent = async (xassetlevContract, address) => {
    const [userXAssetLevBal, { bufferBalance, marketBalance }, xassetlevSupply,] = await Promise.all([
        xassetlevContract.balanceOf(address),
        xassetlevContract.getFundBalances(),
        xassetlevContract.totalSupply(),
    ]);
    const userTokenEquivalent = bufferBalance
        .add(marketBalance)
        .mul(userXAssetLevBal)
        .div(xassetlevSupply);
    return formatEther(userTokenEquivalent);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L3BvcnRmb2xpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFOUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHeEQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFN0MsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsS0FBSyxFQUM1QyxNQUFrQixFQUNsQixPQUFlLEVBQ2YsUUFBc0IsRUFDRyxFQUFFO0lBQzNCLElBQUk7UUFDRixNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUUzRSxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsZUFBZSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3RFLDRCQUE0QixDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQztZQUN4RCxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQztZQUNyQyw0QkFBNEIsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUM7U0FDekQsQ0FBQyxDQUFBO1FBRUYsTUFBTSxjQUFjLEdBQUcsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRXRFLE9BQU87WUFDTCxNQUFNO1lBQ04sUUFBUSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDakMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDaEMsZUFBZTtTQUNoQixDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQTBDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDNUQsT0FBTztZQUNMLE1BQU07WUFDTixHQUFHLHNCQUFzQjtTQUMxQixDQUFBO0tBQ0Y7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLDRCQUE0QixHQUFHLEtBQUssRUFDeEMsaUJBQTRCLEVBQzVCLE9BQWUsRUFDZixFQUFFO0lBQ0YsTUFBTSxDQUNKLGdCQUFnQixFQUNoQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsRUFDaEMsZUFBZSxFQUNoQixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNwQixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3BDLGlCQUFpQixDQUFDLGVBQWUsRUFBRTtRQUNuQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7S0FDaEMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxhQUFhO1NBQ3RDLEdBQUcsQ0FBQyxhQUFhLENBQUM7U0FDbEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDO1NBQ3JCLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUN2QixPQUFPLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pDLENBQUMsQ0FBQSJ9