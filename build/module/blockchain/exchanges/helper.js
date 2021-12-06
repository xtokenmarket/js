import { BigNumber } from '@ethersproject/bignumber';
import { Abi, ADDRESSES, ETH, WETH } from '@xtoken/abis';
import { ethers } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { DEC_18 } from '../../constants';
import { getTokenSymbol } from '../utils';
import { getEthUsdcPrice } from './uniswap';
export const getBalances = async (symbol, poolAddress, tokenPrice, provider, chainId, underlyingPrice, isWeth, xTokenBalance = BigNumber.from('0'), ethBalance = BigNumber.from('0')) => {
    // Addresses
    const xTokenAddress = ADDRESSES[symbol][chainId];
    // Contracts
    const xTokenContract = new ethers.Contract(xTokenAddress, Abi.ERC20, provider);
    // Ignore fetching xAsset balance in liquidity pool for xSNXa
    if (xTokenBalance.isZero()) {
        try {
            // Balances
            xTokenBalance = await xTokenContract.balanceOf(poolAddress);
        }
        catch (e) {
            console.error('Error while fetching user balance:', e);
        }
    }
    // ETH price in USD
    const ethUsdcPrice = await getEthUsdcPrice(provider);
    const tokenVal = xTokenBalance
        .mul(parseEther(tokenPrice.toString()))
        .div(DEC_18);
    // Ignore fetching ETH/WETH balance in liquidity pool for xSNXa
    if (ethBalance.isZero()) {
        if (isWeth) {
            const wethAddress = ADDRESSES[WETH][chainId];
            const wethContract = new ethers.Contract(wethAddress, Abi.ERC20, provider);
            ethBalance = await wethContract.balanceOf(poolAddress);
        }
        else {
            ethBalance = await provider.getBalance(poolAddress);
        }
    }
    const ethVal = ethBalance.mul(parseEther(ethUsdcPrice)).div(DEC_18);
    let underlying;
    let underlyingVal = BigNumber.from('0');
    if (underlyingPrice) {
        const tokenSymbol = getTokenSymbol(symbol);
        const underlyingToken = tokenSymbol.toUpperCase();
        const underlyingAddress = ADDRESSES[tokenSymbol][chainId];
        const underlyingContract = new ethers.Contract(underlyingAddress, Abi.ERC20, provider);
        const underlyingBalance = await underlyingContract.balanceOf(poolAddress);
        underlyingVal = underlyingBalance.mul(underlyingPrice).div(DEC_18);
        underlying = {
            name: underlyingToken,
            amt: formatEther(underlyingBalance),
            val: formatEther(underlyingVal),
        };
    }
    const totalVal = ethVal.add(tokenVal).add(underlyingVal);
    return {
        totalVal: formatEther(totalVal),
        token: {
            name: symbol,
            amt: formatEther(xTokenBalance),
            val: formatEther(tokenVal),
        },
        underlying,
        eth: {
            name: ETH.toUpperCase(),
            amt: formatEther(ethBalance),
            val: formatEther(ethVal),
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFFcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBQy9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFFMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRXhDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUUzQyxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixNQUFxQixFQUNyQixXQUFtQixFQUNuQixVQUFrQixFQUNsQixRQUFzQixFQUN0QixPQUFlLEVBQ2YsZUFBMkIsRUFDM0IsTUFBZ0IsRUFDaEIsYUFBYSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ25DLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNoQyxFQUFFO0lBQ0YsWUFBWTtJQUNaLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUVoRCxZQUFZO0lBQ1osTUFBTSxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTlFLDZEQUE2RDtJQUM3RCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUUs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