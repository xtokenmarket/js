"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXAssetLev = void 0;
const helper_1 = require("./helper");
const prices_1 = require("./prices");
const getXAssetLev = async (symbol, provider) => {
    const { xassetlevContract } = await helper_1.getXAssetLevContracts(symbol, provider);
    const { aum, priceEth, priceUsd } = await prices_1.getXAssetLevPrices(xassetlevContract);
    return {
        aum,
        mandate: 'Liquid Staker',
        order: 18,
        price: priceUsd,
        priceEth,
        symbol,
    };
};
exports.getXAssetLev = getXAssetLev;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZXYvYXNzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEscUNBQWdEO0FBQ2hELHFDQUE2QztBQUV0QyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQy9CLE1BQWtCLEVBQ2xCLFFBQXNCLEVBQ0YsRUFBRTtJQUN0QixNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLDhCQUFxQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUUzRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLDJCQUFrQixDQUMxRCxpQkFBaUIsQ0FDbEIsQ0FBQTtJQUVELE9BQU87UUFDTCxHQUFHO1FBQ0gsT0FBTyxFQUFFLGVBQWU7UUFDeEIsS0FBSyxFQUFFLEVBQUU7UUFDVCxLQUFLLEVBQUUsUUFBUTtRQUNmLFFBQVE7UUFDUixNQUFNO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQWxCWSxRQUFBLFlBQVksZ0JBa0J4QiJ9