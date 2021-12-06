"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintXSnx = exports.getExpectedQuantityOnMintXSnx = exports.approveXSnx = void 0;
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const utils_2 = require("../utils");
const helper_1 = require("./helper");
const { formatEther, parseEther } = ethers_1.ethers.utils;
const approveXSnx = async (amount, provider, spenderAddress) => {
    const { snxContract, xsnxContract } = await helper_1.getXSnxContracts(provider);
    const address = spenderAddress || xsnxContract.address;
    const contract = spenderAddress ? xsnxContract : snxContract;
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(await contract.estimateGas.approve(address, amount), constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT);
    return contract.approve(address, amount, { gasLimit });
};
exports.approveXSnx = approveXSnx;
const getExpectedQuantityOnMintXSnx = async (tradeWithEth, amount, provider) => {
    const inputAmount = parseEther(amount);
    const { kyberProxyContract, network, tradeAccountingContract, xsnxContract, } = await helper_1.getXSnxContracts(provider);
    const { chainId } = network;
    const [snxBalanceBefore, totalSupply, { mintFee }] = await Promise.all([
        tradeAccountingContract.getSnxBalance(),
        xsnxContract.totalSupply(),
        xsnxContract.feeDivisors(),
    ]);
    const MINT_FEE = utils_2.parseFees(mintFee);
    if (tradeWithEth) {
        const ethContributed = inputAmount.mul(MINT_FEE).div(constants_1.DEC_18);
        const expectedRate = await utils_2.getExpectedRate(kyberProxyContract, abis_1.ADDRESSES[abis_1.ETH], abis_1.ADDRESSES[abis_1.SNX][chainId], ethContributed);
        const [setHoldingsWei, ethBal] = await Promise.all([
            tradeAccountingContract.getSetHoldingsValueInWei(),
            tradeAccountingContract.getEthBalance(),
        ]);
        const nonSnxAssetValue = setHoldingsWei.add(ethBal);
        const weiPerOneSnx = constants_1.DEC_18.mul(constants_1.DEC_18).div(expectedRate);
        const pricePerToken = await tradeAccountingContract.calculateIssueTokenPrice(weiPerOneSnx.toString(), snxBalanceBefore, nonSnxAssetValue, totalSupply);
        const expectedTokenReturn = ethContributed.mul(constants_1.DEC_18).div(pricePerToken);
        return formatEther(expectedTokenReturn);
    }
    else {
        const expQuantity = await tradeAccountingContract.calculateTokensToMintWithSnx(snxBalanceBefore, inputAmount, totalSupply);
        return formatEther(expQuantity);
    }
};
exports.getExpectedQuantityOnMintXSnx = getExpectedQuantityOnMintXSnx;
const mintXSnx = async (tradeWithEth, amount, provider) => {
    const { kyberProxyContract, snxContract, xsnxContract, } = await helper_1.getXSnxContracts(provider);
    if (tradeWithEth) {
        const minRate = await utils_2.getExpectedRate(kyberProxyContract, abis_1.ADDRESSES[abis_1.ETH], snxContract.address, amount, true);
        // Estimate `gasLimit`
        const gasLimit = utils_1.getPercentage(await xsnxContract.estimateGas.mint(minRate.toString(), {
            value: amount,
        }), constants_1.GAS_LIMIT_PERCENTAGE_ETH);
        return xsnxContract.mint(minRate.toString(), {
            gasLimit,
            value: amount,
        });
    }
    else {
        const address = await utils_2.getSignerAddress(provider);
        const approvedAmount = await _getApprovedAmount(snxContract, xsnxContract, address);
        if (approvedAmount.lt(amount)) {
            return Promise.reject(new Error('Please approve the tokens before minting'));
        }
        // Estimate `gasLimit`
        const gasLimit = utils_1.getPercentage(await xsnxContract.estimateGas.mintWithSnx(amount), constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT);
        return xsnxContract.mintWithSnx(amount, { gasLimit });
    }
};
exports.mintXSnx = mintXSnx;
const _getApprovedAmount = async (tokenContract, xsnxContract, address) => {
    return tokenContract.allowance(address, xsnxContract.address);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hzbngvbWludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1Q0FBa0Q7QUFDbEQsbUNBQTBDO0FBRTFDLCtDQUl3QjtBQUV4Qix1Q0FBMkM7QUFDM0Msb0NBQXVFO0FBRXZFLHFDQUEyQztBQUUzQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixNQUFpQixFQUNqQixRQUFzQixFQUN0QixjQUF1QixFQUNPLEVBQUU7SUFDaEMsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRXRFLE1BQU0sT0FBTyxHQUFHLGNBQWMsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFBO0lBQ3RELE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUE7SUFFNUQsc0JBQXNCO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLHFCQUFhLENBQzVCLE1BQU0sUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUNuRCx3Q0FBNEIsQ0FDN0IsQ0FBQTtJQUVELE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUN4RCxDQUFDLENBQUE7QUFqQlksUUFBQSxXQUFXLGVBaUJ2QjtBQUVNLE1BQU0sNkJBQTZCLEdBQUcsS0FBSyxFQUNoRCxZQUFxQixFQUNyQixNQUFjLEVBQ2QsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN0QyxNQUFNLEVB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