"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXAlphaAsset = void 0;
const helper_1 = require("./helper");
const prices_1 = require("./prices");
const getXAlphaAsset = async (symbol, provider) => {
    const { xalphaContract } = await helper_1.getXAlphaContracts(symbol, provider);
    const { aum, priceEth, priceUsd } = await prices_1.getXAlphaPrices(xalphaContract);
    return {
        aum,
        mandate: 'Liquid Staker',
        order: 17,
        price: priceUsd,
        priceEth,
        symbol,
    };
};
exports.getXAlphaAsset = getXAlphaAsset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWxwaGEvYXNzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EscUNBQTZDO0FBQzdDLHFDQUEwQztBQUVuQyxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQ2pDLE1BQXdCLEVBQ3hCLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsTUFBTSwyQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFckUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSx3QkFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBRXpFLE9BQU87UUFDTCxHQUFHO1FBQ0gsT0FBTyxFQUFFLGVBQWU7UUFDeEIsS0FBSyxFQUFFLEVBQUU7UUFDVCxLQUFLLEVBQUUsUUFBUTtRQUNmLFFBQVE7UUFDUixNQUFNO0tBQ1AsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQWhCWSxRQUFBLGNBQWMsa0JBZ0IxQiJ9