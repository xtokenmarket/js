import { AddressZero } from '@ethersproject/constants';
import { ADDRESSES, INCH } from '@xtoken/abis';
import { ethers } from 'ethers';
import { DEC_18, GAS_LIMIT_PERCENTAGE_DEFAULT, GAS_LIMIT_PERCENTAGE_ETH, } from '../../constants';
import { getPercentage } from '../../utils';
import { getSignerAddress, parseFees } from '../utils';
import { getExpectedRateInch, getXInchContracts } from './helper';
const { formatEther, parseEther } = ethers.utils;
export const approveXInch = async (symbol, amount, provider, spenderAddress) => {
    const { tokenContract, xinchContract } = await getXInchContracts(symbol, provider);
    const address = spenderAddress || xinchContract.address;
    const contract = spenderAddress ? xinchContract : tokenContract;
    // Estimate `gasLimit`
    const gasLimit = getPercentage(await contract.estimateGas.approve(address, amount), GAS_LIMIT_PERCENTAGE_DEFAULT);
    return contract.approve(address, amount, { gasLimit });
};
export const getExpectedQuantityOnMintXInch = async (symbol, tradeWithEth, amount, provider) => {
    const inputAmount = parseEther(amount);
    const { inchLiquidityProtocolContract, network, xinchContract, } = await getXInchContracts(symbol, provider);
    const { chainId } = network;
    const [inchHoldings, xinchSupply, { mintFee }] = await Promise.all([
        xinchContract.getNav(),
        xinchContract.totalSupply(),
        xinchContract.feeDivisors(),
    ]);
    const MINT_FEE = parseFees(mintFee);
    const ethToTrade = inputAmount.mul(MINT_FEE);
    const inchAddress = ADDRESSES[INCH][chainId];
    let inchExpected;
    if (tradeWithEth) {
        inchExpected = await getExpectedRateInch(inchLiquidityProtocolContract, AddressZero, inchAddress, inputAmount);
    }
    else {
        inchExpected = ethToTrade;
    }
    let xinchExpected = inchExpected.mul(xinchSupply).div(inchHoldings);
    if (!tradeWithEth) {
        xinchExpected = xinchExpected.div(DEC_18);
    }
    return formatEther(xinchExpected);
};
export const mintXInch = async (symbol, tradeWithEth, amount, provider) => {
    const { inchLiquidityProtocolContract, tokenContract, xinchContract, } = await getXInchContracts(symbol, provider);
    if (tradeWithEth) {
        const minRate = await getExpectedRateInch(inchLiquidityProtocolContract, AddressZero, tokenContract.address, amount, true);
        // Estimate `gasLimit`
        const gasLimit = getPercentage(await xinchContract.estimateGas.mint(minRate.toString(), {
            value: amount,
        }), GAS_LIMIT_PERCENTAGE_ETH);
        return xinchContract.mint(minRate.toString(), {
            gasLimit,
            value: amount,
        });
    }
    else {
        const address = await getSignerAddress(provider);
        const approvedAmount = await _getApprovedAmount(tokenContract, xinchContract, address);
        if (approvedAmount.lt(amount)) {
            return Promise.reject(new Error('Please approve the tokens before minting'));
        }
        // Estimate `gasLimit`
        const gasLimit = getPercentage(await xinchContract.estimateGas.mintWithToken(amount), GAS_LIMIT_PERCENTAGE_DEFAULT);
        return xinchContract.mintWithToken(amount, { gasLimit });
    }
};
const _getApprovedAmount = async (tokenContract, xinchContract, address) => {
    return tokenContract.allowance(address, xinchContract.address);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hpbmNoL21pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFBO0FBR3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQzlDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFL0IsT0FBTyxFQUNMLE1BQU0sRUFDTiw0QkFBNEIsRUFDNUIsd0JBQXdCLEdBQ3pCLE1BQU0saUJBQWlCLENBQUE7QUFHeEIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXRELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVqRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7QUFFaEQsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFDL0IsTUFBcUIsRUFDckIsTUFBaUIsRUFDakIsUUFBc0IsRUFDdEIsY0FBdUIsRUFDTyxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSxpQkFBaUIsQ0FDOUQsTUFBTSxFQUNOLFFBQVEsQ0FDVCxDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUcsY0FBYyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUE7SUFDdkQsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQTtJQUUvRCxzQkFBc0I7SUFDdEIsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUM1QixNQUFNLFFBQVEsQ0FBQyxXQUFX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