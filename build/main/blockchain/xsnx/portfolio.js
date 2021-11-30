"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortfolioItemXSnx = void 0;
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../utils");
const helper_1 = require("./helper");
const prices_1 = require("./prices");
const getPortfolioItemXSnx = async (symbol, address, provider) => {
    try {
        const { xsnxContract } = await helper_1.getXSnxContracts(provider);
        const exchangeRatesContract = (await utils_2.getExchangeRateContract(provider));
        const [xsnxBal, { priceUsd }, { rate: snxPriceInUsd }] = await Promise.all([
            utils_2.getUserAvailableTokenBalance(xsnxContract, address),
            prices_1.getXSnxPrices(xsnxContract),
            exchangeRatesContract.rateAndUpdatedTime(utils_1.formatBytes32String('SNX')),
        ]);
        const xsnxValue = utils_1.parseEther((xsnxBal * priceUsd).toString());
        const tokenEquivalent = xsnxValue.div(snxPriceInUsd).toString();
        return {
            symbol,
            quantity: xsnxBal.toString(),
            price: priceUsd.toString(),
            value: utils_1.formatEther(xsnxValue),
            tokenEquivalent,
        };
    }
    catch (e) {
        console.error('Error while fetching portfolio balance:', e);
        return Object.assign({ symbol }, constants_1.DEFAULT_PORTFOLIO_ITEM);
    }
};
exports.getPortfolioItemXSnx = getPortfolioItemXSnx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9wb3J0Zm9saW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNENBQStFO0FBRS9FLCtDQUF3RDtBQUd4RCxvQ0FBZ0Y7QUFFaEYscUNBQTJDO0FBQzNDLHFDQUF3QztBQUVqQyxNQUFNLG9CQUFvQixHQUFHLEtBQUssRUFDdkMsTUFBcUIsRUFDckIsT0FBZSxFQUNmLFFBQXNCLEVBQ0csRUFBRTtJQUMzQixJQUFJO1FBQ0YsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0seUJBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFekQsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLE1BQU0sK0JBQXVCLENBQzFELFFBQVEsQ0FDVCxDQUFrQixDQUFBO1FBRW5CLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUN6RSxvQ0FBNEIsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDO1lBQ25ELHNCQUFhLENBQUMsWUFBWSxDQUFDO1lBQzNCLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLDJCQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JFLENBQUMsQ0FBQTtRQUVGLE1BQU0sU0FBUyxHQUFHLGtCQUFVLENBQUMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUM3RCxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRS9ELE9BQU87WUFDTCxNQUFNO1lBQ04sUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDNUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsS0FBSyxFQUFFLG1CQUFXLENBQUMsU0FBUyxDQUFDO1lBQzdCLGVBQWU7U0FDaEIsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNELHVCQUNFLE1BQU0sSUFDSCxrQ0FBc0IsRUFDMUI7S0FDRjtBQUNILENBQUMsQ0FBQTtBQW5DWSxRQUFBLG9CQUFvQix3QkFtQ2hDIn0=