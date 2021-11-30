"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXSnxAsset = void 0;
const helper_1 = require("./helper");
const prices_1 = require("./prices");
const getXSnxAsset = async (symbol, provider) => {
    const { xsnxContract } = await helper_1.getXSnxContracts(provider);
    const { aum, priceEth, priceUsd } = await prices_1.getXSnxPrices(xsnxContract);
    return {
        aum,
        mandate: 'Aggressive staker; ETH bull',
        order: 3,
        price: priceUsd,
        priceEth,
        symbol,
    };
};
exports.getXSnxAsset = getXSnxAsset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94c254L2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHFDQUEyQztBQUMzQyxxQ0FBd0M7QUFFakMsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUMvQixNQUFzQixFQUN0QixRQUFzQixFQUNMLEVBQUU7SUFDbkIsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0seUJBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFekQsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxzQkFBYSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBRXJFLE9BQU87UUFDTCxHQUFHO1FBQ0gsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssRUFBRSxRQUFRO1FBQ2YsUUFBUTtRQUNSLE1BQU07S0FDUCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBaEJZLFFBQUEsWUFBWSxnQkFnQnhCIn0=