"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortfolioItemXKnc = void 0;
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../utils");
const helper_1 = require("./helper");
const prices_1 = require("./prices");
const getPortfolioItemXKnc = async (symbol, address, provider) => {
    try {
        const { xkncContract } = await helper_1.getXKncContracts(symbol, provider);
        const [xkncBal, { priceUsd }, tokenEquivalent] = await Promise.all([
            utils_2.getUserAvailableTokenBalance(xkncContract, address),
            prices_1.getXKncPrices(xkncContract),
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
        return Object.assign({ symbol }, constants_1.DEFAULT_PORTFOLIO_ITEM);
    }
};
exports.getPortfolioItemXKnc = getPortfolioItemXKnc;
const getUnderlyingTokenEquivalent = async (xkncContract, address) => {
    const [userXkncBal, contractKncBal, xkncSupply] = await Promise.all([
        xkncContract.balanceOf(address),
        xkncContract.getFundKncBalanceTwei(),
        xkncContract.totalSupply(),
    ]);
    const userTokenEquivalent = contractKncBal.mul(userXkncBal).div(xkncSupply);
    return utils_1.formatEther(userTokenEquivalent);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9wb3J0Zm9saW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNENBQThDO0FBRTlDLCtDQUF3RDtBQUd4RCxvQ0FBdUQ7QUFFdkQscUNBQTJDO0FBQzNDLHFDQUF3QztBQUVqQyxNQUFNLG9CQUFvQixHQUFHLEtBQUssRUFDdkMsTUFBcUIsRUFDckIsT0FBZSxFQUNmLFFBQXNCLEVBQ0csRUFBRTtJQUMzQixJQUFJO1FBQ0YsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0seUJBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBRWpFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxlQUFlLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDakUsb0NBQTRCLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQztZQUNuRCxzQkFBYSxDQUFDLFlBQVksQ0FBQztZQUMzQiw0QkFBNEIsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDO1NBQ3BELENBQUMsQ0FBQTtRQUVGLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVqRCxPQUFPO1lBQ0wsTUFBTTtZQUNOLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQzVCLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzFCLEtBQUssRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQzNCLGVBQWU7U0FDaEIsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNELHVCQUNFLE1BQU0sSUFDSCxrQ0FBc0IsRUFDMUI7S0FDRjtBQUNILENBQUMsQ0FBQTtBQTlCWSxRQUFBLG9CQUFvQix3QkE4QmhDO0FBRUQsTUFBTSw0QkFBNEIsR0FBRyxLQUFLLEVBQ3hDLFlBQWtCLEVBQ2xCLE9BQWUsRUFDZixFQUFFO0lBQ0YsTUFBTSxDQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQy9CLFlBQVksQ0FBQyxxQkFBcUIsRUFBRTtRQUNwQyxZQUFZLENBQUMsV0FBVyxFQUFFO0tBQzNCLENBQUMsQ0FBQTtJQUVGLE1BQU0sbUJBQW1CLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDM0UsT0FBTyxtQkFBVyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDekMsQ0FBQyxDQUFBIn0=