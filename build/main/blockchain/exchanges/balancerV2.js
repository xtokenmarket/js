"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalancerV2PortfolioItem = exports.getBalancerV2EstimatedQuantity = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const constants_1 = require("@ethersproject/constants");
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const constants_2 = require("../../constants");
const utils_1 = require("../../utils");
const utils_2 = require("../utils");
const xsnx_1 = require("../xsnx");
const helper_1 = require("./helper");
const { formatEther, parseEther } = ethers_1.ethers.utils;
const getBalancerV2EstimatedQuantity = async (tokenIn, symbol, amount, tradeType, provider) => {
    try {
        const network = await provider.getNetwork();
        const { chainId } = network;
        const isEth = tokenIn === abis_1.ETH;
        const isBuy = tradeType === abis_1.BUY;
        // Addresses
        const snxAddress = abis_1.ADDRESSES[abis_1.SNX][chainId];
        const wethAddress = abis_1.ADDRESSES[abis_1.WETH][chainId];
        const xsnxAddress = abis_1.ADDRESSES[symbol][chainId];
        const tokenInAddress = isBuy ? wethAddress : xsnxAddress;
        const tokenOutAddress = isBuy ? xsnxAddress : wethAddress;
        const balancerV2VaultContract = getBalancerV2VaultContract(provider, chainId);
        const funds = {
            sender: constants_1.AddressZero,
            fromInternalBalance: false,
            recipient: constants_1.AddressZero,
            toInternalBalance: false,
        };
        const swap = {
            poolId: constants_2.X_SNX_A_BALANCER_V2_POOL_ID,
            kind: 0,
            amount: parseEther(amount),
            userData: constants_1.HashZero,
        };
        let assets = [tokenInAddress, tokenOutAddress];
        if (!isEth) {
            assets = [...assets, snxAddress];
        }
        const batchSwapStep = {
            poolId: swap.poolId,
            kind: swap.kind,
            assetInIndex: constants_1.Zero,
            assetOutIndex: constants_1.One,
            amount: !isEth && isBuy ? constants_1.Zero : swap.amount,
            userData: swap.userData,
        };
        let batchSwapStep2;
        if (!isEth) {
            batchSwapStep2 = {
                poolId: constants_2.SNX_BALANCER_V2_POOL_ID,
                kind: 0,
                assetInIndex: isBuy ? constants_1.Two : constants_1.One,
                assetOutIndex: isBuy ? constants_1.Zero : constants_1.Two,
                amount: isBuy ? swap.amount : constants_1.Zero,
                userData: swap.userData,
            };
        }
        const batchSwapSteps = !isEth
            ? isBuy
                ? [batchSwapStep2, batchSwapStep]
                : [batchSwapStep, batchSwapStep2]
            : [batchSwapStep];
        const result = await balancerV2VaultContract.callStatic.queryBatchSwap(swap.kind, 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        batchSwapSteps, assets, funds);
        return utils_1.formatNumber(formatEther(result[!isEth && !isBuy ? 2 : 1]).replace('-', ''), 4).toString();
    }
    catch (e) {
        console.error('Error while fetching Balancer V2 estimate:', e);
        return '0';
    }
};
exports.getBalancerV2EstimatedQuantity = getBalancerV2EstimatedQuantity;
const getBalancerV2PortfolioItem = async (symbol, address, provider) => {
    const network = await provider.getNetwork();
    const { chainId } = network;
    const tokenSymbol = utils_2.getTokenSymbol(symbol);
    const underlying = tokenSymbol.toUpperCase();
    // Addresses
    const asset = `${symbol} - ${abis_1.ETH.toUpperCase()} - ${underlying}`;
    const balancerPoolAddress = '0xBA12222222228d8Ba445958a75a0704d566BF2C8'; // Balancer V2 Vault address
    const xTokenAddress = abis_1.ADDRESSES[symbol][chainId];
    // Contracts
    const balancerPoolContract = utils_2.getBalancerPoolContract(symbol, provider, chainId);
    const balancerV2VaultContract = getBalancerV2VaultContract(provider, chainId);
    const xtokenContract = new ethers_1.ethers.Contract(xTokenAddress, abis_1.Abi.ERC20, provider);
    let userBalance = bignumber_1.BigNumber.from('0');
    try {
        userBalance = await balancerPoolContract.balanceOf(address);
    }
    catch (e) {
        console.error('Error while fetching user balance:', e);
    }
    const { balances: [xTokenBalance, ethBalance], } = await balancerV2VaultContract.getPoolTokens(constants_2.X_SNX_A_BALANCER_V2_POOL_ID);
    let tokenPrice = 0;
    try {
        switch (symbol) {
            case abis_1.X_SNX_A: {
                const { priceUsd } = await xsnx_1.getXSnxPrices(xtokenContract);
                tokenPrice = priceUsd;
                break;
            }
        }
    }
    catch (e) {
        console.error(e);
    }
    const balancerContractBalances = await helper_1.getBalances(symbol, balancerPoolAddress, tokenPrice, provider, chainId, undefined, true, xTokenBalance, ethBalance);
    const bptTokenSupply = await balancerPoolContract.totalSupply();
    const poolPrice = parseEther(balancerContractBalances.eth.val)
        .mul(4)
        .mul(constants_2.DEC_18)
        .div(bptTokenSupply);
    const value = poolPrice.mul(userBalance).div(constants_2.DEC_18);
    return {
        asset,
        balances: balancerContractBalances,
        poolPrice: formatEther(poolPrice),
        quantity: formatEther(userBalance),
        tokenPrice,
        value: formatEther(value),
    };
};
exports.getBalancerV2PortfolioItem = getBalancerV2PortfolioItem;
const getBalancerV2VaultContract = (provider, chainId) => {
    const signer = utils_2.getSigner(provider);
    const balancerV2VaultAddress = abis_1.ADDRESSES[abis_1.BALANCER_V2_VAULT][chainId];
    return new ethers_1.ethers.Contract(balancerV2VaultAddress, abis_1.Abi.BalancerV2Vault, signer);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZXJWMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2V4Y2hhbmdlcy9iYWxhbmNlclYyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUNwRCx3REFBZ0Y7QUFFaEYsdUNBU3FCO0FBQ3JCLG1DQUErQjtBQUUvQiwrQ0FJd0I7QUFPeEIsdUNBQTBDO0FBQzFDLG9DQUE2RTtBQUM3RSxrQ0FBdUM7QUFFdkMscUNBQXNDO0FBRXRDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQTtBQUV6QyxNQUFNLDhCQUE4QixHQUFHLEtBQUssRUFDakQsT0FBb0MsRUFDcEMsTUFBc0IsRUFDdEIsTUFBYyxFQUNkLFNBQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDM0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtRQUUzQixNQUFNLEtBQUssR0FBRyxPQUFPLEtBQUssVUFBRyxDQUFBO1FBQzdCLE1BQU0sS0FBSyxHQUFHLFNBQVMsS0FBSyxVQUFHLENBQUE7UUFFL0IsWUFBWTtRQUNaLE1BQU0sVUFBVSxHQUFHLGdCQUFTLENBQUMsVUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDMUMsTUFBTSxXQUFXLEdBQUcsZ0JBQVMsQ0FBQyxXQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM1QyxNQUFNLFdBQVcsR0FBRyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRTlDLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUE7UUFDeEQsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLENB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