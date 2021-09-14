'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.mintXAssetCLR = exports.getPoolRatioXAssetCLR = exports.getExpectedQuantityOnMintXAssetCLR = exports.approveXAssetCLR = void 0
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const approveXAssetCLR = async (symbol, amount, inputAsset, provider) => {
  const {
    token0Contract,
    token1Contract,
    xAssetCLRContract,
  } = await helper_1.getXAssetCLRContracts(symbol, provider)
  const tokenContract = inputAsset === 0 ? token0Contract : token1Contract
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await tokenContract.estimateGas.approve(xAssetCLRContract.address, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(xAssetCLRContract.address, amount, { gasLimit })
}
exports.approveXAssetCLR = approveXAssetCLR
const getExpectedQuantityOnMintXAssetCLR = async (
  symbol,
  inputAsset,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const { xAssetCLRContract } = await helper_1.getXAssetCLRContracts(
    symbol,
    provider
  )
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
exports.getExpectedQuantityOnMintXAssetCLR = getExpectedQuantityOnMintXAssetCLR
const getPoolRatioXAssetCLR = async (symbol, provider) => {
  const {
    uniswapLibraryContract,
    xAssetCLRContract,
  } = await helper_1.getXAssetCLRContracts(symbol, provider)
  const [poolAddress, stakedBalance] = await Promise.all([
    xAssetCLRContract.poolAddress(),
    xAssetCLRContract.getStakedTokenBalance(),
  ])
  const midPrice = _formatPoolPrice(
    await uniswapLibraryContract.getPoolPrice(poolAddress)
  )
  return formatEther(
    stakedBalance.amount0.mul(midPrice).div(stakedBalance.amount1)
  )
}
exports.getPoolRatioXAssetCLR = getPoolRatioXAssetCLR
const mintXAssetCLR = async (symbol, inputAsset, amount, provider) => {
  const {
    token0Contract,
    token1Contract,
    xAssetCLRContract,
  } = await helper_1.getXAssetCLRContracts(symbol, provider)
  const address = await utils_2.getSignerAddress(provider)
  const [approved0Amount, approved1Amount] = await Promise.all([
    _getApprovedAmount(token0Contract, xAssetCLRContract, address),
    _getApprovedAmount(token1Contract, xAssetCLRContract, address),
  ])
  if (approved0Amount.lt(amount) || approved1Amount.lt(amount)) {
    return Promise.reject(new Error('Please approve the tokens before minting'))
  }
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await xAssetCLRContract.estimateGas.mint(inputAsset, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return xAssetCLRContract.mint(inputAsset, amount, {
    gasLimit,
  })
}
exports.mintXAssetCLR = mintXAssetCLR
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2Nsci9taW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLG1DQUErQjtBQUUvQiwrQ0FBOEQ7QUFHOUQsdUNBQTJDO0FBQzNDLG9DQUEyQztBQUUzQyxxQ0FBZ0Q7QUFFaEQsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUNuQyxNQUFrQixFQUNsQixNQUFpQixFQUNqQixVQUFvQixFQUNwQixRQUFzQixFQUNRLEVBQUU7SUFDaEMsTUFBTSxFQUNKLGNBQWMsRUFDZCxjQUFjLEVBQ2QsaUJBQWlCLEdBQ2xCLEdBQUcsTUFBTSw4QkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFakQsTUFBTSxhQUFhLEdBQUcsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUE7SUFFeEUsc0JBQXNCO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLHFCQUFhLENBQzVCLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUMxRSx3Q0FBNEIsQ0FDN0IsQ0FBQTtJQUVELE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUMvRSxDQUFDLENBQUE7QUFyQlksUUFBQSxnQkFBZ0Isb0JBcUI1QjtBQUVNLE1BQU0sa0NBQWtDLEdBQUcsS0FBSyxFQUNyRCxNQUFrQixFQUNsQixVQUFvQixFQUNwQixNQUFjLEVBQ2QsUUFBc0IsRUFDQSxFQUFFO0lBQ3hCLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENB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
