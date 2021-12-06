"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintXAlpha = exports.getExpectedQuantityOnMintXAlpha = exports.approveXAlpha = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const uniswapV3_1 = require("../exchanges/uniswapV3");
const utils_2 = require("../utils");
const helper_1 = require("./helper");
const { formatEther, parseEther } = ethers_1.ethers.utils;
const approveXAlpha = async (symbol, amount, provider, spenderAddress) => {
    const { tokenContract, xalphaContract } = await helper_1.getXAlphaContracts(symbol, provider);
    const address = spenderAddress || xalphaContract.address;
    const contract = spenderAddress ? xalphaContract : tokenContract;
    // estimate gasLimit
    const gasLimit = utils_1.getPercentage(await contract.estimateGas.approve(address, amount), constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT);
    return contract.approve(address, amount, { gasLimit });
};
exports.approveXAlpha = approveXAlpha;
const getExpectedQuantityOnMintXAlpha = async (symbol, tradeWithEth, amount, provider) => {
    const inputAmount = parseEther(amount);
    const { xalphaContract } = await helper_1.getXAlphaContracts(symbol, provider);
    const [alphaHoldings, xalphaSupply, { mintFee }] = await Promise.all([
        xalphaContract.getNav(),
        xalphaContract.totalSupply(),
        xalphaContract.feeDivisors(),
    ]);
    const MINT_FEE = utils_2.parseFees(mintFee);
    const ethToTrade = inputAmount.mul(MINT_FEE);
    let alphaExpected;
    if (tradeWithEth) {
        alphaExpected = parseEther(await uniswapV3_1.getUniswapV3EstimatedQty(abis_1.ETH, abis_1.X_ALPHA_A, amount, abis_1.BUY, bignumber_1.BigNumber.from('10000'), // 1% Uniswap V3 trade fees
        provider)).mul(constants_1.DEC_18);
    }
    else {
        alphaExpected = ethToTrade;
    }
    const xalphaExpected = alphaExpected
        .mul(xalphaSupply)
        .div(alphaHoldings)
        .div(constants_1.DEC_18);
    return formatEther(xalphaExpected);
};
exports.getExpectedQuantityOnMintXAlpha = getExpectedQuantityOnMintXAlpha;
const mintXAlpha = async (symbol, tradeWithEth, amount, provider) => {
    const { tokenContract, xalphaContract } = await helper_1.getXAlphaContracts(symbol, provider);
    if (tradeWithEth) {
        // estimate gasLimit
        const gasLimit = utils_1.getPercentage(await xalphaContract.estimateGas.mint('1', {
            value: amount,
        }), constants_1.GAS_LIMIT_PERCENTAGE_ETH);
        return xalphaContract.mint('1', {
            gasLimit,
            value: amount,
        });
    }
    else {
        const address = await utils_2.getSignerAddress(provider);
        const approvedAmount = await _getApprovedAmount(tokenContract, xalphaContract, address);
        if (approvedAmount.lt(amount)) {
            return Promise.reject(new Error('Please approve the tokens before minting'));
        }
        // estimate gasLimit
        const gasLimit = utils_1.getPercentage(await xalphaContract.estimateGas.mintWithToken(amount), constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT);
        return xalphaContract.mintWithToken(amount, { gasLimit });
    }
};
exports.mintXAlpha = mintXAlpha;
const _getApprovedAmount = async (tokenContract, xalphaContract, address) => {
    return tokenContract.allowance(address, xalphaContract.address);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hhbHBoYS9taW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUdwRCx1Q0FBa0Q7QUFDbEQsbUNBQStCO0FBRS9CLCtDQUl3QjtBQUd4Qix1Q0FBMkM7QUFDM0Msc0RBQWlFO0FBQ2pFLG9DQUFzRDtBQUV0RCxxQ0FBNkM7QUFFN0MsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsTUFBcUIsRUFDckIsTUFBaUIsRUFDakIsUUFBc0IsRUFDdEIsY0FBdUIsRUFDTyxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLEdBQUcsTUFBTSwyQkFBa0IsQ0FDaEUsTUFBTSxFQUNOLFFBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUcsY0FBYyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUE7SUFDeEQsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQTtJQUVoRSxvQkFBb0I7SUFDcEIsTUFBTSxRQUFRLEdBQUcscUJBQWEsQ0FDNUIsTUFBTSxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQ25ELHdDQUE0QixDQUM3QixDQUFBO0lBRUQsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQ3hELENBQUMsQ0FBQTtBQXJCWSxRQUFBLGFBQWEsaUJBcUJ6QjtBQUVNLE1BQU0sK0JBQStCLEdBQUcsS0FBSyxFQUNsRCxNQUFxQixFQUNyQixZQUFxQixFQUNyQixNQUFjLEVBQ2QsUUFBc0IsRUFDTCxF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