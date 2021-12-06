"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpectedQuantityOnBurnXInch = exports.burnXInch = void 0;
const constants_1 = require("@ethersproject/constants");
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const constants_2 = require("../../constants");
const utils_1 = require("../../utils");
const utils_2 = require("../utils");
const helper_1 = require("./helper");
const { formatEther, parseEther } = ethers_1.ethers.utils;
const burnXInch = async (symbol, sellForEth, amount, provider) => {
    const { inchLiquidityProtocolContract, tokenContract, xinchContract, } = await helper_1.getXInchContracts(symbol, provider);
    const { proRataInch } = await getProRataInch(xinchContract, amount);
    const minRate = await helper_1.getExpectedRateInch(inchLiquidityProtocolContract, tokenContract.address, constants_1.AddressZero, proRataInch, true);
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(await xinchContract.estimateGas.burn(amount, sellForEth, minRate), sellForEth ? constants_2.GAS_LIMIT_PERCENTAGE_ETH : constants_2.GAS_LIMIT_PERCENTAGE_DEFAULT);
    return xinchContract.burn(amount, sellForEth, minRate, { gasLimit });
};
exports.burnXInch = burnXInch;
const getExpectedQuantityOnBurnXInch = async (symbol, sellForEth, amount, provider) => {
    const inputAmount = parseEther(amount);
    const { inchLiquidityProtocolContract, network, xinchContract, } = await helper_1.getXInchContracts(symbol, provider);
    const { chainId } = network;
    const { BURN_FEE, proRataInch } = await getProRataInch(xinchContract, inputAmount);
    let expectedQty;
    if (!sellForEth) {
        expectedQty = proRataInch;
    }
    else {
        const inchAddress = abis_1.ADDRESSES[abis_1.INCH][chainId];
        expectedQty = await helper_1.getExpectedRateInch(inchLiquidityProtocolContract, inchAddress, constants_1.AddressZero, proRataInch);
    }
    return formatEther(expectedQty.mul(BURN_FEE).div(constants_2.DEC_18));
};
exports.getExpectedQuantityOnBurnXInch = getExpectedQuantityOnBurnXInch;
const getProRataInch = async (xinchContract, amount) => {
    const [inchHoldings, xinchSupply, { burnFee }] = await Promise.all([
        xinchContract.getNav(),
        xinchContract.totalSupply(),
        xinchContract.feeDivisors(),
    ]);
    const BURN_FEE = utils_2.parseFees(burnFee);
    const proRataInch = inchHoldings.mul(amount).div(xinchSupply);
    return { BURN_FEE, proRataInch };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hpbmNoL2J1cm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esd0RBQXNEO0FBR3RELHVDQUE4QztBQUM5QyxtQ0FBK0I7QUFFL0IsK0NBSXdCO0FBR3hCLHVDQUEyQztBQUMzQyxvQ0FBb0M7QUFFcEMscUNBQWlFO0FBRWpFLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQTtBQUV6QyxNQUFNLFNBQVMsR0FBRyxLQUFLLEVBQzVCLE1BQXFCLEVBQ3JCLFVBQW1CLEVBQ25CLE1BQWlCLEVBQ2pCLFFBQXNCLEVBQ1EsRUFBRTtJQUNoQyxNQUFNLEVBQ0osNkJBQTZCLEVBQzdCLGFBQWEsRUFDYixhQUFhLEdBQ2QsR0FBRyxNQUFNLDBCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUU3QyxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxjQUFjLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBRW5FLE1BQU0sT0FBTyxHQUFHLE1BQU0sNEJBQW1CLENBQ3ZDLDZCQUE2QixFQUM3QixhQUFhLENBQUMsT0FBTyxFQUNyQix1QkFBVyxFQUNYLFdBQVcsRUFDWCxJQUFJLENBQ0wsQ0FBQTtJQUVELHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQ2pFLFVBQVUsQ0FBQyxDQUFDLENBQUMsb0NBQXdCLENBQUMsQ0FBQyxDQUFDLHdDQUE0QixDQUNyRSxDQUFBO0lBRUQsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUN0RSxDQUFDLENBQUE7QUE3QlksUUFBQSxTQUFTLGFBNkJyQjtBQUVNLE1BQU0sOEJBQThCLEdBQUcsS0FBSyxFQUNqRCxNQUFxQixFQUNyQixVQUFtQixFQUNuQixNQUFjLEVBQ2QsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN0QyxNQUFNLEVBQ0osNkJBQTZCLEVBQzdCLE9BQU8sRUFDUCxhQUFhLEdBQ2QsR0FBRyxNQUFNLDBCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUM3QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBRTNCLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxjQUFjLENBQ3BELGFBQWEsRUFDYixXQUFXLENBQ1osQ0FBQTtJQUNELElBQUksV0FBc0IsQ0FBQTtJQUUxQixJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsV0FBVyxHQUFHLFdBQVcsQ0FBQTtLQUMxQjtTQUFNO1FBQ0wsTUFBTSxXQUFXLEdBQUcsZ0JBQVMsQ0FBQyxXQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUU1QyxXQUFXLEdBQUcsTUFBTSw0QkFBbUIsQ0FDckMsNkJBQTZCLEVBQzdCLFdBQVcsRUFDWCx1QkFBVyxFQUNYLFdBQVcsQ0FDWixDQUFBO0tBQ0Y7SUFFRCxPQUFPLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUMzRCxDQUFDLENBQUE7QUFsQ1ksUUFBQSw4QkFBOEIsa0NBa0MxQztBQUVELE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxhQUFvQixFQUFFLE1BQWlCLEVBQUUsRUFBRTtJQUN2RSxNQUFNLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ2pFLGFBQWEsQ0FBQyxNQUFNLEVBQUU7UUFDdEIsYUFBYSxDQUFDLFdBQVcsRUFBRTtRQUMzQixhQUFhLENBQUMsV0FBVyxFQUFFO0tBQzVCLENBQUMsQ0FBQTtJQUVGLE1BQU0sUUFBUSxHQUFHLGlCQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbkMsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFFN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQTtBQUNsQyxDQUFDLENBQUEifQ==