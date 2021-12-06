import { formatEther } from 'ethers/lib/utils';
import { DEFAULT_PORTFOLIO_ITEM } from '../../constants';
import { getUserAvailableTokenBalance } from '../utils';
import { getXKncContracts } from './helper';
import { getXKncPrices } from './prices';
export const getPortfolioItemXKnc = async (symbol, address, provider) => {
    try {
        const { xkncContract } = await getXKncContracts(symbol, provider);
        const [xkncBal, { priceUsd }, tokenEquivalent] = await Promise.all([
            getUserAvailableTokenBalance(xkncContract, address),
            getXKncPrices(xkncContract),
            getUnderlyingTokenEquivalent(xkncContract, address),
        ]);
        const xkncValue = (xkncBal * priceUsd).toFixed(2);
        return {
            symbol,
            quantity: xkncBal.toString(),
            price: priceUsd.toString(),
            value: xkncValue.toString(),
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
const getUnderlyingTokenEquivalent = async (xkncContract, address) => {
    const [userXkncBal, contractKncBal, xkncSupply] = await Promise.all([
        xkncContract.balanceOf(address),
        xkncContract.getFundKncBalanceTwei(),
        xkncContract.totalSupply(),
    ]);
    const userTokenEquivalent = contractKncBal.mul(userXkncBal).div(xkncSupply);
    return formatEther(userTokenEquivalent);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9wb3J0Zm9saW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBRTlDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBR3hELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV4QyxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxLQUFLLEVBQ3ZDLE1BQXFCLEVBQ3JCLE9BQWUsRUFDZixRQUFzQixFQUNHLEVBQUU7SUFDM0IsSUFBSTtRQUNGLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUVqRSxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsZUFBZSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2pFLDRCQUE0QixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUM7WUFDbkQsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUMzQiw0QkFBNEIsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDO1NBQ3BELENBQUMsQ0FBQTtRQUVGLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVqRCxPQUFPO1lBQ0wsTUFBTTtZQUNOLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQzVCLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzFCLEtBQUssRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQzNCLGVBQWU7U0FDaEIsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNELE9BQU87WUFDTCxNQUFNO1lBQ04sR0FBRyxzQkFBc0I7U0FDMUIsQ0FBQTtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSw0QkFBNEIsR0FBRyxLQUFLLEVBQ3hDLFlBQWtCLEVBQ2xCLE9BQWUsRUFDZixFQUFFO0lBQ0YsTUFBTSxDQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQy9CLFlBQVksQ0FBQyxxQkFBcUIsRUFBRTtRQUNwQyxZQUFZLENBQUMsV0FBVyxFQUFFO0tBQzNCLENBQUMsQ0FBQTtJQUVGLE1BQU0sbUJBQW1CLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDM0UsT0FBTyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUEifQ==