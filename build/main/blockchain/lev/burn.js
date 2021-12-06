"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpectedQuantityOnBurnXAssetLev = exports.burnXAssetLev = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../../utils");
const uniswapV3_1 = require("../exchanges/uniswapV3");
const utils_3 = require("../utils");
const helper_1 = require("./helper");
const { formatEther } = ethers_1.ethers.utils;
const burnXAssetLev = async (symbol, sellForEth, amount, provider) => {
    const { xassetlevContract } = await helper_1.getXAssetLevContracts(symbol, provider);
    if (symbol === abis_1.X_BTC_3X) {
        amount = amount.div('10000000000');
    }
    // estimate gasLimit
    const gasLimit = utils_2.getPercentage(await xassetlevContract.estimateGas.burn(amount, sellForEth, '1'), sellForEth ? constants_1.GAS_LIMIT_PERCENTAGE_ETH : constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT);
    return xassetlevContract.burn(amount, sellForEth, '0', {
        gasLimit,
    });
};
exports.burnXAssetLev = burnXAssetLev;
const getExpectedQuantityOnBurnXAssetLev = async (symbol, sellForEth, amount, provider) => {
    const inputAmount = utils_1.parseEther(amount);
    const tokenSymbol = utils_3.getXAssetLevTokenSymbol(symbol);
    const { xassetlevContract } = await helper_1.getXAssetLevContracts(symbol, provider);
    const { BURN_FEE, proRataToken } = await getProRataToken(xassetlevContract, inputAmount);
    let expectedQty;
    if (!sellForEth || symbol === abis_1.X_ETH_3X) {
        if (symbol === abis_1.X_BTC_3X) {
            expectedQty = proRataToken.mul('10000000000');
        }
        else {
            expectedQty = proRataToken;
        }
    }
    else {
        expectedQty = utils_1.parseEther(await uniswapV3_1.getUniswapV3EstimatedQty(abis_1.ETH, tokenSymbol, utils_1.formatUnits(proRataToken, tokenSymbol === abis_1.WBTC ? 8 : 18), abis_1.SELL, bignumber_1.BigNumber.from('10000'), // 1% Uniswap V3 trade fees
        provider));
    }
    return formatEther(expectedQty.mul(BURN_FEE).div(constants_1.DEC_18));
};
exports.getExpectedQuantityOnBurnXAssetLev = getExpectedQuantityOnBurnXAssetLev;
const getProRataToken = async (xassetlevContract, amount) => {
    const [{ bufferBalance, marketBalance }, xassetlevSupply, { burnFee },] = await Promise.all([
        xassetlevContract.getFundBalances(),
        xassetlevContract.totalSupply(),
        xassetlevContract.feeDivisors(),
    ]);
    const BURN_FEE = utils_3.parseFees(burnFee);
    const proRataToken = bufferBalance
        .add(marketBalance)
        .mul(amount)
        .div(xassetlevSupply);
    return { BURN_FEE, proRataToken };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2xldi9idXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUdwRCx1Q0FBa0U7QUFDbEUsbUNBQStCO0FBQy9CLDRDQUEwRDtBQUUxRCwrQ0FJd0I7QUFHeEIsdUNBQTJDO0FBQzNDLHNEQUFpRTtBQUNqRSxvQ0FBNkQ7QUFFN0QscUNBQWdEO0FBRWhELE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRTdCLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsTUFBa0IsRUFDbEIsVUFBbUIsRUFDbkIsTUFBaUIsRUFDakIsUUFBc0IsRUFDUSxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxHQUFHLE1BQU0sOEJBQXFCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTNFLElBQUksTUFBTSxLQUFLLGVBQVEsRUFBRTtRQUN2QixNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtLQUNuQztJQUVELG9CQUFvQjtJQUNwQixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsRUFDakUsVUFBVSxDQUFDLENBQUMsQ0FBQyxvQ0FBd0IsQ0FBQyxDQUFDLENBQUMsd0NBQTRCLENBQ3JFLENBQUE7SUFFRCxPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRTtRQUNyRCxRQUFRO0tBQ1QsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBckJZLFFBQUEsYUFBYSxpQkFxQnpCO0FBRU0sTUFBTSxrQ0FBa0MsR0FBRyxLQUFLLEVBQ3JELE1BQWtCLEVBQ2xCLFVBQW1CLEVBQ25CLE1BQWMsRUFDZCxRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxXQUFXLEdBQUcsa0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN0QyxNQUFNLFdBQVcsR0FBRywrQkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNuRCxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLDhCQUFxQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUUzRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0sZUFBZSxDQUN0RCxpQkFBaUIsRUFDakIsV0FBVyxDQUNaLENBQUE7SUFFRCxJQUFJLFdBQXNCLENBQUE7SUFFMUIsSUFBSSxDQUFDLFVBQVUsSUFBSSxNQUFNLEtBQUssZUFBUSxFQUFFO1FBQ3RDLElBQUksTUFBTSxLQUFLLGVBQVEsRUFBRTtZQUN2QixXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUM5QzthQUFNO1lBQ0wsV0FBVyxHQUFHLFlBQVksQ0FBQTtTQUMzQjtLQUNGO1NBQU07UUFDTCxXQUFXLEdBQUcsa0JBQVUsQ0FDdEIsTUFBTSxvQ0FBd0IsQ0FDNUIsVUFBRyxFQUNILFdBQVcsRUFDWCxtQkFBVyxDQUFDLFlBQVksRUFBRSxXQUFXLEtBQUssV0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUN4RCxXQUFJLEVBQ0oscUJBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsMkJBQTJCO1FBQ3BELFFBQVEsQ0FDVCxDQUNGLENBQUE7S0FDRjtJQUVELE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQyxDQUFBO0FBQzNELENBQUMsQ0FBQTtBQXJDWSxRQUFBLGtDQUFrQyxzQ0FxQzlDO0FBRUQsTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUMzQixpQkFBNEIsRUFDNUIsTUFBaUIsRUFDakIsRUFBRTtJQUNGLE1BQU0sQ0FDSixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsRUFDaEMsZUFBZSxFQUNmLEVBQUUsT0FBTyxFQUFFLEVBQ1osR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDcEIsaUJBQWlCLENBQUMsZUFBZSxFQUFFO1FBQ25DLGlCQUFpQixDQUFDLFdBQVcsRUFBRTtRQUMvQixpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7S0FDaEMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxRQUFRLEdBQUcsaUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuQyxNQUFNLFlBQVksR0FBRyxhQUFhO1NBQy9CLEdBQUcsQ0FBQyxhQUFhLENBQUM7U0FDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQztTQUNYLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFBO0FBQ25DLENBQUMsQ0FBQSJ9