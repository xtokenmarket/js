"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortfolioItemXAssetLev = void 0;
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../utils");
const helper_1 = require("./helper");
const prices_1 = require("./prices");
const getPortfolioItemXAssetLev = async (symbol, address, provider) => {
    try {
        const { xassetlevContract } = await helper_1.getXAssetLevContracts(symbol, provider);
        const [xassetlevBal, { priceUsd }, tokenEquivalent] = await Promise.all([
            utils_2.getUserAvailableTokenBalance(xassetlevContract, address),
            prices_1.getXAssetLevPrices(xassetlevContract),
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
        return Object.assign({ symbol }, constants_1.DEFAULT_PORTFOLIO_ITEM);
    }
};
exports.getPortfolioItemXAssetLev = getPortfolioItemXAssetLev;
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
    return utils_1.formatEther(userTokenEquivalent);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGV2L3BvcnRmb2xpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw0Q0FBOEM7QUFFOUMsK0NBQXdEO0FBR3hELG9DQUF1RDtBQUV2RCxxQ0FBZ0Q7QUFDaEQscUNBQTZDO0FBRXRDLE1BQU0seUJBQXlCLEdBQUcsS0FBSyxFQUM1QyxNQUFrQixFQUNsQixPQUFlLEVBQ2YsUUFBc0IsRUFDRyxFQUFFO0lBQzNCLElBQUk7UUFDRixNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLDhCQUFxQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUUzRSxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsZUFBZSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3RFLG9DQUE0QixDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQztZQUN4RCwyQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQztZQUNyQyw0QkFBNEIsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUM7U0FDekQsQ0FBQyxDQUFBO1FBRUYsTUFBTSxjQUFjLEdBQUcsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRXRFLE9BQU87WUFDTCxNQUFNO1lBQ04sUUFBUSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDakMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDaEMsZUFBZTtTQUNoQixDQUFBO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQTBDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDNUQsdUJBQ0UsTUFBTSxJQUNILGtDQUFzQixFQUMxQjtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBOUJZLFFBQUEseUJBQXlCLDZCQThCckM7QUFFRCxNQUFNLDRCQUE0QixHQUFHLEtBQUssRUFDeEMsaUJBQTRCLEVBQzVCLE9BQWUsRUFDZixFQUFFO0lBQ0YsTUFBTSxDQUNKLGdCQUFnQixFQUNoQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsRUFDaEMsZUFBZSxFQUNoQixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNwQixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3BDLGlCQUFpQixDQUFDLGVBQWUsRUFBRTtRQUNuQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7S0FDaEMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxhQUFhO1NBQ3RDLEdBQUcsQ0FBQyxhQUFhLENBQUM7U0FDbEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDO1NBQ3JCLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUN2QixPQUFPLG1CQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUEifQ==