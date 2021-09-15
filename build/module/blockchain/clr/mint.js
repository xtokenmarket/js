import { ethers } from 'ethers'
import { GAS_LIMIT_PERCENTAGE_DEFAULT } from '../../constants'
import { getPercentage } from '../../utils'
import { getSignerAddress } from '../utils'
import { getXAssetCLRContracts } from './helper'
const { formatEther, parseEther } = ethers.utils
export const approveXAssetCLR = async (
  symbol,
  amount,
  inputAsset,
  provider
) => {
  const {
    token0Contract,
    token1Contract,
    xAssetCLRContract,
  } = await getXAssetCLRContracts(symbol, provider)
  const tokenContract = inputAsset === 0 ? token0Contract : token1Contract
  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await tokenContract.estimateGas.approve(xAssetCLRContract.address, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(xAssetCLRContract.address, amount, { gasLimit })
}
export const getExpectedQuantityOnMintXAssetCLR = async (
  symbol,
  inputAsset,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const { xAssetCLRContract } = await getXAssetCLRContracts(symbol, provider)
  const {
    amount0Minted,
    amount1Minted,
  } = await xAssetCLRContract.calculateAmountsMintedSingleToken(
    inputAsset,
    inputAmount
  )
  const [liquidityAmount, totalSupply, totalLiquidity] = await Promise.all([
    xAssetCLRContract.getLiquidityForAmounts(amount0Minted, amount1Minted),
    xAssetCLRContract.totalSupply(),
    xAssetCLRContract.getTotalLiquidity(),
  ])
  const expectedQty = liquidityAmount.mul(totalSupply).div(totalLiquidity)
  return {
    0: formatEther(amount0Minted),
    1: formatEther(amount1Minted),
    expectedQty: formatEther(expectedQty),
  }
}
export const getPoolRatioXAssetCLR = async (symbol, provider) => {
  const {
    uniswapLibraryContract,
    xAssetCLRContract,
  } = await getXAssetCLRContracts(symbol, provider)
  const [{ pool: poolAddress }, stakedBalance] = await Promise.all([
    xAssetCLRContract.uniContracts(),
    xAssetCLRContract.getStakedTokenBalance(),
  ])
  const midPrice = _formatPoolPrice(
    await uniswapLibraryContract.getPoolPrice(poolAddress)
  )
  return formatEther(
    stakedBalance.amount0.mul(midPrice).div(stakedBalance.amount1)
  )
}
export const mintXAssetCLR = async (symbol, inputAsset, amount, provider) => {
  const {
    token0Contract,
    token1Contract,
    xAssetCLRContract,
  } = await getXAssetCLRContracts(symbol, provider)
  const address = await getSignerAddress(provider)
  const [approved0Amount, approved1Amount] = await Promise.all([
    _getApprovedAmount(token0Contract, xAssetCLRContract, address),
    _getApprovedAmount(token1Contract, xAssetCLRContract, address),
  ])
  if (approved0Amount.lt(amount) || approved1Amount.lt(amount)) {
    return Promise.reject(new Error('Please approve the tokens before minting'))
  }
  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await xAssetCLRContract.estimateGas.mint(inputAsset, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return xAssetCLRContract.mint(inputAsset, amount, {
    gasLimit,
  })
}
const _getApprovedAmount = async (
  tokenContract,
  xAssetCLRContract,
  address
) => {
  return tokenContract.allowance(address, xAssetCLRContract.address)
}
const _formatPoolPrice = (poolPrice) => {
  return parseEther(
    (
      poolPrice
        .pow(2)
        .mul(1e8)
        .shr(96 * 2)
        .toNumber() / 1e8
    ).toString()
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2Nsci9taW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFL0IsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFHOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRWhELE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtBQUVoRCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLEVBQ25DLE1BQWtCLEVBQ2xCLE1BQWlCLEVBQ2pCLFVBQW9CLEVBQ3BCLFFBQXNCLEVBQ1EsRUFBRTtJQUNoQyxNQUFNLEVBQ0osY0FBYyxFQUNkLGNBQWMsRUFDZCxpQkFBaUIsR0FDbEIsR0FBRyxNQUFNLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUVqRCxNQUFNLGFBQWEsR0FBRyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQTtJQUV4RSxzQkFBc0I7SUFDdEIsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUM1QixNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFDMUUsNEJBQTRCLENBQzdCLENBQUE7SUFFRCxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDL0UsQ0FB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
