"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintXAssetLev = exports.getExpectedQuantityOnMintXAssetLev = exports.approveXAssetLev = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const abis_1 = require("@xtoken/abis");
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../../constants");
const utils_2 = require("../../utils");
const uniswapV3_1 = require("../exchanges/uniswapV3");
const utils_3 = require("../utils");
const helper_1 = require("./helper");
const approveXAssetLev = async (symbol, amount, provider, spenderAddress) => {
    const { tokenContract, xassetlevContract } = await helper_1.getXAssetLevContracts(symbol, provider);
    if (symbol === abis_1.X_BTC_3X && !amount.eq(constants_1.MAX_UINT)) {
        amount = amount.div('10000000000');
    }
    const address = spenderAddress || xassetlevContract.address;
    const contract = spenderAddress ? xassetlevContract : tokenContract;
    // estimate gasLimit
    const gasLimit = utils_2.getPercentage(await contract.estimateGas.approve(address, amount), constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT);
    return contract.approve(address, amount, { gasLimit });
};
exports.approveXAssetLev = approveXAssetLev;
const getExpectedQuantityOnMintXAssetLev = async (symbol, tradeWithEth, amount, provider) => {
    const tokenSymbol = utils_3.getXAssetLevTokenSymbol(symbol);
    const { xassetlevContract } = await helper_1.getXAssetLevContracts(symbol, provider);
    const [{ bufferBalance, marketBalance }, xassetlevSupply, { mintFee },] = await Promise.all([
        xassetlevContract.getFundBalances(),
        xassetlevContract.totalSupply(),
        xassetlevContract.feeDivisors(),
    ]);
    const MINT_FEE = utils_3.parseFees(mintFee);
    const inputAmount = utils_1.parseUnits(amount, tokenSymbol === abis_1.WBTC ? 8 : 18);
    const ethToTrade = inputAmount.mul(MINT_FEE);
    let tokenExpected;
    if (tradeWithEth && symbol !== abis_1.X_ETH_3X) {
        tokenExpected = utils_1.parseUnits(await uniswapV3_1.getUniswapV3EstimatedQty(abis_1.ETH, tokenSymbol, amount, abis_1.BUY, bignumber_1.BigNumber.from('10000'), // 1% Uniswap V3 trade fees
        provider), tokenSymbol === abis_1.WBTC ? 8 : 18).mul(constants_1.DEC_18);
    }
    else {
        tokenExpected = ethToTrade;
    }
    const xassetlevExpected = tokenExpected
        .mul(xassetlevSupply)
        .div(bufferBalance.add(marketBalance))
        .div(constants_1.DEC_18);
    return utils_1.formatEther(xassetlevExpected);
};
exports.getExpectedQuantityOnMintXAssetLev = getExpectedQuantityOnMintXAssetLev;
const mintXAssetLev = async (symbol, tradeWithEth, amount, provider) => {
    const { tokenContract, xassetlevContract } = await helper_1.getXAssetLevContracts(symbol, provider);
    if (symbol === abis_1.X_BTC_3X) {
        amount = amount.div('10000000000');
    }
    if (tradeWithEth) {
        // estimate gasLimit
        const gasLimit = utils_2.getPercentage(await xassetlevContract.estimateGas.mint('1', {
            value: amount,
        }), constants_1.GAS_LIMIT_PERCENTAGE_ETH);
        return xassetlevContract.mint('1', {
            gasLimit,
            value: amount,
        });
    }
    else {
        const address = await utils_3.getSignerAddress(provider);
        const approvedAmount = await _getApprovedAmount(tokenContract, xassetlevContract, address);
        if (approvedAmount.lt(amount)) {
            return Promise.reject(new Error('Please approve the tokens before minting'));
        }
        // estimate gasLimit
        const gasLimit = utils_2.getPercentage(await xassetlevContract.estimateGas.mintWithToken(amount), constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT);
        return xassetlevContract.mintWithToken(amount, { gasLimit });
    }
};
exports.mintXAssetLev = mintXAssetLev;
const _getApprovedAmount = async (tokenContract, xassetlevContract, address) => {
    return tokenContract.allowance(address, xassetlevContract.address);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2xldi9taW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUdwRCx1Q0FBaUU7QUFDakUsNENBQTBEO0FBRTFELCtDQUt3QjtBQUd4Qix1Q0FBMkM7QUFDM0Msc0RBQWlFO0FBQ2pFLG9DQUErRTtBQUUvRSxxQ0FBZ0Q7QUFFekMsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLEVBQ25DLE1BQWtCLEVBQ2xCLE1BQWlCLEVBQ2pCLFFBQXNCLEVBQ3RCLGNBQXVCLEVBQ08sRUFBRTtJQUNoQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSw4QkFBcUIsQ0FDdEUsTUFBTSxFQUNOLFFBQVEsQ0FDVCxDQUFBO0lBRUQsSUFBSSxNQUFNLEtBQUssZUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxvQkFBUSxDQUFDLEVBQUU7UUFDL0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7S0FDbkM7SUFFRCxNQUFNLE9BQU8sR0FBRyxjQUFjLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFBO0lBQzNELE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQTtJQUVuRSxvQkFBb0I7SUFDcEIsTUFBTSxRQUFRLEdBQUcscUJBQWEsQ0FDNUIsTUFBTSxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQ25ELHdDQUE0QixDQUM3QixDQUFBO0lBRUQsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQ3hELENBQUMsQ0FBQTtBQXpCWSxRQUFBLGdCQUFnQixvQkF5QjVCO0FBRU0s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