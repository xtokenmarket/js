"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortfolioItemXInch = void 0;
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../utils");
const helper_1 = require("./helper");
const prices_1 = require("./prices");
const getPortfolioItemXInch = async (symbol, address, provider) => {
    try {
        const { xinchContract } = await helper_1.getXInchContracts(symbol, provider);
        const [xinchBal, { priceUsd }, tokenEquivalent] = await Promise.all([
            utils_2.getUserAvailableTokenBalance(xinchContract, address),
            prices_1.getXInchPrices(xinchContract),
            getUnderlyingTokenEquivalent(xinchContract, address),
        ]);
        const xinchValue = (xinchBal * priceUsd).toFixed(2);
        return {
            symbol,
            quantity: xinchBal.toString(),
            price: priceUsd.toString(),
            value: xinchValue.toString(),
            tokenEquivalent,
        };
    }
    catch (e) {
        console.error('Error while fetching portfolio balance:', e);
        return Object.assign({ symbol }, constants_1.DEFAULT_PORTFOLIO_ITEM);
    }
};
exports.getPortfolioItemXInch = getPortfolioItemXInch;
const getUnderlyingTokenEquivalent = async (xinchContract, address) => {
    const [userXinchBal, inchHoldings, xinchSupply] = await Promise.all([
        xinchContract.balanceOf(address),
        xinchContract.getNav(),
        xinchContract.totalSupply(),
    ]);
    const userTokenEquivalent = inchHoldings.mul(userXinchBal).div(xinchSupply);
    return utils_1.formatEther(userTokenEquivalent);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvcG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUE4QztBQUU5QywrQ0FBd0Q7QUFHeEQsb0NBQXVEO0FBRXZELHFDQUE0QztBQUM1QyxxQ0FBeUM7QUFFbEMsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLEVBQ3hDLE1BQXFCLEVBQ3JCLE9BQWUsRUFDZixRQUFzQixFQUNHLEVBQUU7SUFDM0IsSUFBSTtRQUNGLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLDBCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUVuRSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsZUFBZSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2xFLG9DQUE0QixDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7WUFDcEQsdUJBQWMsQ0FBQyxhQUFhLENBQUM7WUFDN0IsNEJBQTRCLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztTQUNyRCxDQUFDLENBQUE7UUFFRixNQUFNLFVBQVUsR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFbkQsT0FBTztZQUNMLE1BQU07WUFDTixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUM3QixLQUFLLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUMxQixLQUFLLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUM1QixlQUFlO1NBQ2hCLENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMzRCx1QkFDRSxNQUFNLElBQ0gsa0NBQXNCLEVBQzFCO0tBQ0Y7QUFDSCxDQUFDLENBQUE7QUE5QlksUUFBQSxxQkFBcUIseUJBOEJqQztBQUVELE1BQU0sNEJBQTRCLEdBQUcsS0FBSyxFQUN4QyxhQUFvQixFQUNwQixPQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNsRSxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxhQUFhLENBQUMsTUFBTSxFQUFFO1FBQ3RCLGFBQWEsQ0FBQyxXQUFXLEVBQUU7S0FDNUIsQ0FBQyxDQUFBO0lBRUYsTUFBTSxtQkFBbUIsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUMzRSxPQUFPLG1CQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUEifQ==