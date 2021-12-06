"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintXBnt = exports.getExpectedQuantityOnMintXBnt = exports.approveXBnt = void 0;
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const utils_2 = require("../utils");
const helper_1 = require("./helper");
const { formatEther, parseEther } = ethers_1.ethers.utils;
const approveXBnt = async (symbol, amount, provider, spenderAddress) => {
    const { tokenContract, xbntContract } = await helper_1.getXBntContracts(symbol, provider);
    const address = spenderAddress || xbntContract.address;
    const contract = spenderAddress ? xbntContract : tokenContract;
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(await contract.estimateGas.approve(address, amount), constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT);
    return contract.approve(address, amount, { gasLimit });
};
exports.approveXBnt = approveXBnt;
const getExpectedQuantityOnMintXBnt = async (symbol, tradeWithEth, amount, provider) => {
    const inputAmount = parseEther(amount);
    const { network, xbntContract } = await helper_1.getXBntContracts(symbol, provider);
    const { chainId } = network;
    const kyberProxyContract = utils_2.getContract(abis_1.KYBER_PROXY, provider, network);
    const [bntHoldings, xbntSupply, { mintFee }] = await Promise.all([
        xbntContract.getNav(),
        xbntContract.totalSupply(),
        xbntContract.feeDivisors(),
    ]);
    const MINT_FEE = utils_2.parseFees(mintFee);
    const ethToTrade = inputAmount.mul(MINT_FEE);
    const ethAddress = abis_1.ADDRESSES[abis_1.ETH];
    const bntAddress = abis_1.ADDRESSES[abis_1.BNT][chainId];
    let bntExpected;
    if (tradeWithEth) {
        const expectedRate = await utils_2.getExpectedRate(kyberProxyContract, ethAddress, bntAddress, inputAmount);
        bntExpected = ethToTrade.mul(expectedRate).div(constants_1.DEC_18);
    }
    else {
        bntExpected = ethToTrade;
    }
    const xbntExpected = bntExpected.mul(xbntSupply).div(bntHoldings).div(constants_1.DEC_18);
    return formatEther(xbntExpected);
};
exports.getExpectedQuantityOnMintXBnt = getExpectedQuantityOnMintXBnt;
const mintXBnt = async (symbol, tradeWithEth, amount, provider) => {
    const { tokenContract, xbntContract } = await helper_1.getXBntContracts(symbol, provider);
    if (tradeWithEth) {
        // Estimate `gasLimit`
        const gasLimit = utils_1.getPercentage(await xbntContract.estimateGas.mint('1', {
            value: amount,
        }), constants_1.GAS_LIMIT_PERCENTAGE_ETH);
        return xbntContract.mint('1', {
            gasLimit,
            value: amount,
        });
    }
    else {
        const address = await utils_2.getSignerAddress(provider);
        const approvedAmount = await _getApprovedAmount(tokenContract, xbntContract, address);
        if (approvedAmount.lt(amount)) {
            return Promise.reject(new Error('Please approve the tokens before minting'));
        }
        // Estimate `gasLimit`
        const gasLimit = utils_1.getPercentage(await xbntContract.estimateGas.mintWithToken(amount), constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT);
        return xbntContract.mintWithToken(amount, { gasLimit });
    }
};
exports.mintXBnt = mintXBnt;
const _getApprovedAmount = async (tokenContract, xbntContract, address) => {
    return tokenContract.allowance(address, xbntContract.address);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hibnQvbWludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSx1Q0FBK0Q7QUFDL0QsbUNBQStCO0FBRS9CLCtDQUl3QjtBQUd4Qix1Q0FBMkM7QUFDM0Msb0NBS2lCO0FBRWpCLHFDQUEyQztBQUUzQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixNQUFxQixFQUNyQixNQUFpQixFQUNqQixRQUFzQixFQUN0QixjQUF1QixFQUNPLEVBQUU7SUFDaEMsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUM1RCxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxjQUFjLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQTtJQUN0RCxNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFBO0lBRTlELHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFDbkQsd0NBQTRCLENBQzdCLENBQUE7SUFFRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDeEQsQ0FBQyxDQUFBO0FBckJZLFFBQUEsV0FBVyxlQXFCdkI7QUFFTSxNQUFNLDZCQUE2QixHQUFHLEtBQUssRUFDaEQsTUFBcUIsRUFDckIsWUFBcUIsRUFDckIsTUFBYyxFQUNkLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLFdBQVcsR0FBRyxVQUFV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