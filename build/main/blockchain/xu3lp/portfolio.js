"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortfolioItemXU3LP = void 0;
const constants_1 = require("../../constants");
const utils_1 = require("../utils");
const helper_1 = require("./helper");
const prices_1 = require("./prices");
const getPortfolioItemXU3LP = async (symbol, address, provider) => {
    try {
        const { xu3lpContract } = await helper_1.getXU3LPContracts(symbol, provider);
        const xu3lpBal = await utils_1.getUserAvailableTokenBalance(xu3lpContract, address);
        const { priceUsd } = await prices_1.getXU3LPPrices(xu3lpContract);
        const xu3lpValue = (xu3lpBal * priceUsd).toFixed(2).toString();
        return {
            symbol,
            quantity: xu3lpBal.toString(),
            price: priceUsd.toString(),
            value: xu3lpValue.toString(),
        };
    }
    catch (e) {
        console.error('Error while fetching portfolio balance:', e);
        return Object.assign({ symbol }, constants_1.DEFAULT_LP_PORTFOLIO_ITEM);
    }
};
exports.getPortfolioItemXU3LP = getPortfolioItemXU3LP;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHUzbHAvcG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtDQUEyRDtBQUUzRCxvQ0FBdUQ7QUFFdkQscUNBQTRDO0FBQzVDLHFDQUF5QztBQUVsQyxNQUFNLHFCQUFxQixHQUFHLEtBQUssRUFDeEMsTUFBdUIsRUFDdkIsT0FBZSxFQUNmLFFBQXNCLEVBQ0csRUFBRTtJQUMzQixJQUFJO1FBQ0YsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sMEJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBRW5FLE1BQU0sUUFBUSxHQUFHLE1BQU0sb0NBQTRCLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRTNFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLHVCQUFjLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDeEQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRTlELE9BQU87WUFDTCxNQUFNO1lBQ04sUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDN0IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUU7U0FDN0IsQ0FBQTtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNELHVCQUNFLE1BQU0sSUFDSCxxQ0FBeUIsRUFDN0I7S0FDRjtBQUNILENBQUMsQ0FBQTtBQTFCWSxRQUFBLHFCQUFxQix5QkEwQmpDIn0=