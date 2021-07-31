'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getBalancerV2PortfolioItem = exports.getBalancerV2EstimatedQuantity = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const constants_1 = require('@ethersproject/constants')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_2 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const xsnx_1 = require('../xsnx')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const getBalancerV2EstimatedQuantity = async (
  tokenIn,
  symbol,
  amount,
  tradeType,
  provider
) => {
  try {
    const network = await provider.getNetwork()
    const { chainId } = network
    // Addresses
    const snxAddress = abis_1.ADDRESSES[abis_1.SNX][chainId]
    const wethAddress = abis_1.ADDRESSES[abis_1.WETH][chainId]
    const xsnxAddress = abis_1.ADDRESSES[symbol][chainId]
    let tokenInAddress
    let tokenOutAddress
    if (tradeType === abis_1.BUY) {
      tokenInAddress = tokenIn === abis_1.ETH ? wethAddress : snxAddress
      tokenOutAddress = xsnxAddress
    } else {
      tokenInAddress = xsnxAddress
      tokenOutAddress = tokenIn === abis_1.ETH ? wethAddress : snxAddress
    }
    const balancerV2VaultContract = getBalancerV2VaultContract(
      provider,
      chainId
    )
    const funds = {
      sender: constants_1.AddressZero,
      fromInternalBalance: false,
      recipient: constants_1.AddressZero,
      toInternalBalance: false,
    }
    const swap = {
      poolId: constants_2.X_SNX_A_BALANCER_V2_POOL_ID,
      kind: 0,
      assetIn: tokenInAddress,
      assetOut: tokenOutAddress,
      amount: parseEther(amount),
      userData: constants_1.HashZero,
    }
    const assets = [swap.assetIn, swap.assetOut]
    const batchSwapStep = {
      poolId: swap.poolId,
      kind: swap.kind,
      assetInIndex: constants_1.Zero,
      assetOutIndex: constants_1.One,
      amount: swap.amount,
      userData: swap.userData,
    }
    const result = await balancerV2VaultContract.callStatic.queryBatchSwap(
      swap.kind,
      [batchSwapStep],
      assets,
      funds
    )
    return utils_1
      .formatNumber(
        formatEther(result[1]).replace('-', ''),
        tradeType === abis_1.BUY ? 0 : 3
      )
      .toString()
  } catch (e) {
    return '0'
  }
}
exports.getBalancerV2EstimatedQuantity = getBalancerV2EstimatedQuantity
const getBalancerV2PortfolioItem = async (symbol, address, provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const tokenSymbol = utils_2.getTokenSymbol(symbol)
  const underlying = tokenSymbol.toUpperCase()
  // Addresses
  const asset = `${symbol} - ${abis_1.ETH.toUpperCase()} - ${underlying}`
  const balancerPoolAddress = '0xBA12222222228d8Ba445958a75a0704d566BF2C8' // Balancer V2 Vault address
  const xTokenAddress = abis_1.ADDRESSES[symbol][chainId]
  // Contracts
  const balancerPoolContract = utils_2.getBalancerPoolContract(
    symbol,
    provider,
    chainId
  )
  const balancerV2VaultContract = getBalancerV2VaultContract(provider, chainId)
  const tokenContract = new ethers_1.ethers.Contract(
    xTokenAddress,
    abis_1.Abi.ERC20,
    provider
  )
  let userBalance = bignumber_1.BigNumber.from('0')
  try {
    userBalance = await balancerPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  const {
    balances: [xTokenBalance, ethBalance],
  } = await balancerV2VaultContract.getPoolTokens(
    constants_2.X_SNX_A_BALANCER_V2_POOL_ID
  )
  let tokenPrice = 0
  try {
    switch (symbol) {
      case abis_1.X_SNX_A: {
        const xsnxAdminAddress = abis_1.ADDRESSES[abis_1.X_SNX_ADMIN][chainId]
        const tradeAccountingContract = utils_2.getContract(
          abis_1.TRADE_ACCOUNTING,
          provider,
          network
        )
        const exchangeRatesContract = await utils_2.getExchangeRateContract(
          provider
        )
        const snxContract = utils_2.getContract(abis_1.SNX, provider, network)
        const { priceUsd } = await xsnx_1.getXSnxPrices(
          tokenContract,
          xsnxAdminAddress,
          tradeAccountingContract,
          exchangeRatesContract,
          snxContract,
          provider
        )
        tokenPrice = priceUsd
        break
      }
    }
  } catch (e) {
    console.error(e)
  }
  const balancerContractBalances = await helper_1.getBalances(
    symbol,
    balancerPoolAddress,
    tokenPrice,
    provider,
    chainId,
    undefined,
    true,
    xTokenBalance,
    ethBalance
  )
  const bptTokenSupply = await balancerPoolContract.totalSupply()
  const poolPrice = parseEther(balancerContractBalances.eth.val)
    .mul(4)
    .mul(constants_2.DEC_18)
    .div(bptTokenSupply)
  const value = poolPrice.mul(userBalance).div(constants_2.DEC_18)
  return {
    asset,
    balances: balancerContractBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice,
    value: formatEther(value),
  }
}
exports.getBalancerV2PortfolioItem = getBalancerV2PortfolioItem
const getBalancerV2VaultContract = (provider, chainId) => {
  const signer = utils_2.getSigner(provider)
  const balancerV2VaultAddress =
    abis_1.ADDRESSES[abis_1.BALANCER_V2_VAULT][chainId]
  return new ethers_1.ethers.Contract(
    balancerV2VaultAddress,
    abis_1.Abi.BalancerV2Vault,
    signer
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZXJWMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2V4Y2hhbmdlcy9iYWxhbmNlclYyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUNwRCx3REFBMkU7QUFFM0UsdUNBV3FCO0FBQ3JCLG1DQUF5QztBQUV6QywrQ0FBcUU7QUFhckUsdUNBQTBDO0FBQzFDLG9DQU1pQjtBQUNqQixrQ0FBdUM7QUFFdkMscUNBQXNDO0FBRXRDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQTtBQUV6QyxNQUFNLDhCQUE4QixHQUFHLEtBQUssRUFDakQsT0FBb0MsRUFDcEMsTUFBc0IsRUFDdEIsTUFBYyxFQUNkLFNBQXFCLEVBQ3JCLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDM0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtRQUUzQixZQUFZO1FBQ1osTUFBTSxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxVQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMxQyxNQUFNLFdBQVcsR0FBRyxnQkFBUyxDQUFDLFdBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzVDLE1BQU0sV0FBVyxHQUFHLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFOUMsSUFBSSxjQUFzQixDQUFBO1FBQzFCLElBQUksZUFBdUIsQ0FBQTtRQUUzQixJQUFJLFNBQVMsS0FBSyxVQUFHLEVBQUU7WUFDckIsY0FBYyxHQUFHLE9BQU8sS0FBSyxVQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFBO1lBQzNELGVBQWUsR0FBRyxXQUFXLENBQUE7U0FDOUI7YUFB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
