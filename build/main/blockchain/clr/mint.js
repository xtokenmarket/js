"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintXAssetCLR = exports.getPoolRatioXAssetCLR = exports.getExpectedQuantityOnMintXAssetCLR = exports.approveXAssetCLR = void 0;
const ethers_1 = require("ethers");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const utils_2 = require("../utils");
const helper_1 = require("./helper");
const { formatEther, parseEther } = ethers_1.ethers.utils;
const approveXAssetCLR = async (symbol, amount, inputAsset, provider) => {
    const { token0Contract, token1Contract, xAssetCLRContract, } = await helper_1.getXAssetCLRContracts(symbol, provider);
    const tokenContract = inputAsset === 0 ? token0Contract : token1Contract;
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(await tokenContract.estimateGas.approve(xAssetCLRContract.address, amount), constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT);
    return tokenContract.approve(xAssetCLRContract.address, amount, { gasLimit });
};
exports.approveXAssetCLR = approveXAssetCLR;
const getExpectedQuantityOnMintXAssetCLR = async (symbol, inputAsset, amount, provider) => {
    const inputAmount = parseEther(amount);
    const { xAssetCLRContract } = await helper_1.getXAssetCLRContracts(symbol, provider);
    const { amount0Minted, amount1Minted, } = await xAssetCLRContract.calculateAmountsMintedSingleToken(inputAsset, inputAmount);
    const [liquidityAmount, totalSupply, totalLiquidity] = await Promise.all([
        xAssetCLRContract.getLiquidityForAmounts(amount0Minted, amount1Minted),
        xAssetCLRContract.totalSupply(),
        xAssetCLRContract.getTotalLiquidity(),
    ]);
    const expectedQty = liquidityAmount.mul(totalSupply).div(totalLiquidity);
    return {
        0: formatEther(amount0Minted),
        1: formatEther(amount1Minted),
        expectedQty: formatEther(expectedQty),
    };
};
exports.getExpectedQuantityOnMintXAssetCLR = getExpectedQuantityOnMintXAssetCLR;
const getPoolRatioXAssetCLR = async (symbol, provider) => {
    const { uniswapLibraryContract, xAssetCLRContract, } = await helper_1.getXAssetCLRContracts(symbol, provider);
    const [{ pool: poolAddress }, stakedBalance] = await Promise.all([
        xAssetCLRContract.uniContracts(),
        xAssetCLRContract.getStakedTokenBalance(),
    ]);
    const midPrice = _formatPoolPrice(await uniswapLibraryContract.getPoolPrice(poolAddress));
    const ratio = Number(formatEther(stakedBalance.amount0.mul(midPrice).div(stakedBalance.amount1))) * 100;
    const ratioSum = ratio + 100;
    return (ratio / ratioSum).toFixed(4);
};
exports.getPoolRatioXAssetCLR = getPoolRatioXAssetCLR;
const mintXAssetCLR = async (symbol, inputAsset, amount, provider) => {
    const { token0Contract, token1Contract, xAssetCLRContract, } = await helper_1.getXAssetCLRContracts(symbol, provider);
    const address = await utils_2.getSignerAddress(provider);
    const [approved0Amount, approved1Amount] = await Promise.all([
        _getApprovedAmount(token0Contract, xAssetCLRContract, address),
        _getApprovedAmount(token1Contract, xAssetCLRContract, address),
    ]);
    if (approved0Amount.lt(amount) || approved1Amount.lt(amount)) {
        return Promise.reject(new Error('Please approve the tokens before minting'));
    }
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(await xAssetCLRContract.estimateGas.mint(inputAsset, amount), constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT);
    return xAssetCLRContract.mint(inputAsset, amount, {
        gasLimit,
    });
};
exports.mintXAssetCLR = mintXAssetCLR;
const _getApprovedAmount = async (tokenContract, xAssetCLRContract, address) => {
    return tokenContract.allowance(address, xAssetCLRContract.address);
};
const _formatPoolPrice = (poolPrice) => {
    return parseEther((poolPrice
        .pow(2)
        .mul(1e8)
        .shr(96 * 2)
        .toNumber() / 1e8).toString());
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2Nsci9taW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLG1DQUErQjtBQUUvQiwrQ0FBOEQ7QUFHOUQsdUNBQTJDO0FBQzNDLG9DQUEyQztBQUUzQyxxQ0FBZ0Q7QUFFaEQsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUNuQyxNQUFrQixFQUNsQixNQUFpQixFQUNqQixVQUFvQixFQUNwQixRQUFzQixFQUNRLEVBQUU7SUFDaEMsTUFBTSxFQUNKLGNBQWMsRUFDZCxjQUFjLEVBQ2QsaUJBQWlCLEdBQ2xCLEdBQUcsTUFBTSw4QkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFakQsTUFBTSxhQUFhLEdBQUcsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUE7SUFFeEUsc0JBQXNCO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLHFCQUFhLENBQzVCLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUMxRSx3Q0FBNEIsQ0FDN0IsQ0FBQTtJQUVELE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUMvRSxDQUFDLENBQUE7QUFyQlksUUFBQSxnQkFBZ0Isb0JBcUI1QjtBQUVNLE1BQU0sa0NBQWtDLEdBQUcsS0FBSyxFQUNyRCxNQUFrQixFQUNsQixVQUFvQixFQUNwQixNQUFjLEVBQ2QsUUFBc0IsRUFDQSxFQUFFO0lBQ3hCLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENB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