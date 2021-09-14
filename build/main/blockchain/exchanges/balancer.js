'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getBalancerPortfolioItem = exports.getBalancerEstimatedQuantity = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const xaave_1 = require('../xaave')
const helper_1 = require('./helper')
const uniswap_1 = require('./uniswap')
const { formatEther, parseEther } = ethers_1.ethers.utils
const getBalancerEstimatedQuantity = async (
  tokenIn,
  symbol,
  amount,
  tradeType,
  provider
) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  let tokenInSymbol
  let poolSymbol
  switch (symbol) {
    case abis_1.X_AAVE_A:
      tokenInSymbol = tokenIn === abis_1.ETH ? abis_1.WETH : abis_1.AAVE
      poolSymbol = abis_1.X_AAVE_A_BALANCER_POOL
      break
    case abis_1.X_AAVE_B:
      tokenInSymbol = tokenIn === abis_1.ETH ? abis_1.WETH : abis_1.AAVE
      poolSymbol = abis_1.X_AAVE_B_BALANCER_POOL
      break
    default:
      return '0'
  }
  const tokenInAddress = abis_1.ADDRESSES[tokenInSymbol][chainId]
  const tokenOutAddress = abis_1.ADDRESSES[symbol][chainId]
  const poolAddress = abis_1.ADDRESSES[poolSymbol][chainId]
  const balancerContract = utils_2.getBalancerPoolContract(
    symbol,
    provider,
    chainId
  )
  const tokenInContract = new ethers_1.ethers.Contract(
    tokenInAddress,
    abis_1.Abi.ERC20,
    utils_2.getSigner(provider)
  )
  const tokenOutContract = new ethers_1.ethers.Contract(
    tokenOutAddress,
    abis_1.Abi.ERC20,
    utils_2.getSigner(provider)
  )
  const [
    tokenInBalance,
    tokenInWeight,
    tokenOutBalance,
    tokenOutWeight,
    swapFee,
  ] = await Promise.all([
    tokenInContract.balanceOf(poolAddress),
    balancerContract.getDenormalizedWeight(tokenInAddress),
    tokenOutContract.balanceOf(poolAddress),
    balancerContract.getDenormalizedWeight(tokenOutAddress),
    balancerContract.getSwapFee(),
  ])
  const calcOutGivenIn = await balancerContract.calcOutGivenIn(
    tradeType === abis_1.BUY ? tokenInBalance : tokenOutBalance,
    tradeType === abis_1.BUY ? tokenInWeight : tokenOutWeight,
    tradeType === abis_1.BUY ? tokenOutBalance : tokenInBalance,
    tradeType === abis_1.BUY ? tokenOutWeight : tokenInWeight,
    parseEther(amount),
    swapFee
  )
  return utils_1
    .formatNumber(formatEther(calcOutGivenIn), tradeType === abis_1.BUY ? 0 : 3)
    .toString()
}
exports.getBalancerEstimatedQuantity = getBalancerEstimatedQuantity
const getBalancerPortfolioItem = async (symbol, address, provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  const tokenSymbol = utils_2.getTokenSymbol(symbol)
  const underlying = tokenSymbol.toUpperCase()
  // Addresses
  const asset = `${symbol} - ${abis_1.ETH.toUpperCase()} - ${underlying}`
  const balancerPoolAddress = utils_2.getBalancerPoolAddress(symbol, chainId)
  const underlyingAddress = abis_1.ADDRESSES[tokenSymbol][chainId]
  // Contracts
  const balancerPoolContract = utils_2.getBalancerPoolContract(
    symbol,
    provider,
    chainId
  )
  const kyberProxyContract = utils_2.getContract(
    abis_1.KYBER_PROXY,
    provider,
    network
  )
  let userBalance = bignumber_1.BigNumber.from('0')
  try {
    userBalance = await balancerPoolContract.balanceOf(address)
  } catch (e) {
    console.error('Error while fetching user balance:', e)
  }
  let tokenPrice = 0
  const [ethUsdcPrice, underlyingEthPrice] = await Promise.all([
    uniswap_1.getEthUsdcPrice(provider),
    uniswap_1.getEthTokenPrice(underlyingAddress, true, provider),
  ])
  const underlyingPrice = parseEther(underlyingEthPrice)
    .mul(parseEther(ethUsdcPrice))
    .div(constants_1.DEC_18)
  try {
    switch (symbol) {
      case abis_1.X_AAVE_A: {
        const xaaveaContract = utils_2.getContract(symbol, provider, network)
        const { priceUsd } = await xaave_1.getXAavePrices(
          xaaveaContract,
          kyberProxyContract,
          chainId
        )
        tokenPrice = priceUsd
        break
      }
      case abis_1.X_AAVE_B: {
        const xaavebContract = utils_2.getContract(symbol, provider, network)
        const { priceUsd } = await xaave_1.getXAavePrices(
          xaavebContract,
          kyberProxyContract,
          chainId
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
    underlyingPrice,
    true
  )
  const bptTokenSupply = await balancerPoolContract.totalSupply()
  const poolPrice = parseEther(balancerContractBalances.eth.val)
    .mul(4)
    .mul(constants_1.DEC_18)
    .div(bptTokenSupply)
  const value = poolPrice.mul(userBalance).div(constants_1.DEC_18)
  return {
    asset,
    balances: balancerContractBalances,
    poolPrice: formatEther(poolPrice),
    quantity: formatEther(userBalance),
    tokenPrice,
    underlyingPrice: formatEther(underlyingPrice),
    value: formatEther(value),
  }
}
exports.getBalancerPortfolioItem = getBalancerPortfolioItem
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9leGNoYW5nZXMvYmFsYW5jZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQW9EO0FBRXBELHVDQVlxQjtBQUNyQixtQ0FBK0I7QUFFL0IsK0NBQXdDO0FBT3hDLHVDQUEwQztBQUMxQyxvQ0FNaUI7QUFDakIsb0NBQXlDO0FBRXpDLHFDQUFzQztBQUN0Qyx1Q0FBNkQ7QUFFN0QsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sNEJBQTRCLEdBQUcsS0FBSyxFQUMvQyxPQUF1RCxFQUN2RCxNQUF5QyxFQUN6QyxNQUFjLEVBQ2QsU0FBcUIsRUFDckIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQzNDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7SUFFM0IsSUFBSSxhQUFhLENBQUE7SUFDakIsSUFBSSxVQUFVLENBQUE7SUFFZCxRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssZUFBUTtZQUNYLGFBQWEsR0FBRyxPQUFPLEtBQUssVUFBRyxDQUFDLENBQUMsQ0FBQyxXQUFJLENBQUMsQ0FBQyxDQUFDLFdBQUksQ0FBQTtZQUM3QyxVQUFVLEdBQUcsNkJBQXNCLENBQUE7WUFDbkMsTUFBSztRQUNQLEtBQUssZUFBUTtZQUNYLGFBQWEsR0FBRyxPQUFPLEtBQUssVUFBRyxDQUFDLENBQUMsQ0FBQyxXQUFJLENBQUMsQ0FBQyxDQUFDLFdBQUksQ0FBQTtZQUM3QyxVQUFVLEdBQUcsNkJBQXNCLENBQUE7WUFDbkMsTUFBSztRQUNQO1lBQ0UsT0FBTyxHQUFHLENBQUE7S0FDYjtJQUVELE1BQU0sY0FBYyxHQUFHLGdCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEQsTUFBTSxlQUFlLEdBQUcsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNsRCxNQUFNLFdBQVcsR0FBRyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRWxELE1BQU0sZ0JBQWdCLEdBQUcsK0JBQXVCLENBQzlDLE1BQU0sRUFDTixRQUFRLEVBQ1IsT0FBTyxDQUNRLENBQUE7SUFDakIsTUFBTSxlQUFlLEdBQUcsSUFBSSxlQUFNLENBQUMsUUFBUSxDQUN6QyxjQUFjLEVBQ2QsVUFBRyxDQUFDLEtBQUssRUFDVCxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUNwQixDQUFBO0lBQ0QsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQzFDLGVBQWUsRUFDZixVQUFHLENBQUMsS0FBSyxFQUNULGlCQUFTLENBQUMsUUFBUSxDQUFDLENBQ3BCLENBQUE7SUFFRCxNQUFNLENBQ0osY0FBYyxFQUNkLGFBQWEsRUFDYixlQUFlLEVBQ2YsY0FBYyxFQUNkLE9BQU8sRUFDUixHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNwQixlQUFlLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztRQUN0QyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUM7UUFDdEQsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztRQUN2QyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLENBQUM7UUFDdkQsZ0JBQWdCLENBQUMsVUFBVSxFQUFFO0tBQzlCLENBQUMsQ0FBQTtJQUVGLE1BQU0sY0FBYyxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsY0FBYyxDQUMxRCxTQUFTLEtBQUssVUFBRyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFDcEQsU0FBUyxLQUFLLFVBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQ2xELFNBQVMsS0FBSyxVQUFHLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUNwRCxTQUFTLEtBQUssVUFBRyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFDbEQsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUNsQixPQUFPLENBQ1IsQ0FBQTtJQUVELE9BQU8sb0JBQVksQ0FDakIsV0FBVyxDQUFDLGNBQWMsQ0FBQyxFQUMzQixTQUFTLEtBQUssVUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDMUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUNkLENBQUMsQ0FBQTtBQXpFWSxRQUFBLDRCQUE0QixnQ0F5RXhDO0FBRU0sTUFBTSx3QkFBd0IsR0FBRyxLQUFLLEVBQzNDLE1BQXFCLEVBQ3JCLE9BQWUsRUFDZixRQUFzQixFQUNPLEVBQUU7SUFDL0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDM0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUUzQixNQUFNLFdBQVcsR0FBRyxzQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzFDLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUU1QyxZQUFZO0lBQ1osTUFBTSxLQUFLLEdBQUcsR0FBRyxNQUFNLE1BQU0sVUFBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLFVBQVUsRUFBRSxDQUFBO0lBQ2hFLE1BQU0sbUJBQW1CLEdBQUcsOEJBQXNCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBVyxDQUFBO0lBQzdFLE1BQU0saUJBQWlCLEdBQUcsZ0JBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUV6RCxZQUFZO0lBQ1osTUFBTSxvQkFBb0IsR0FBRywrQkFBdUIsQ0FDbEQsTUFBTSxFQUNOLFFBQVEsRUFDUixPQUFPLENBQ1EsQ0FBQTtJQUNqQixNQUFNLGtCQUFrQixHQUFHLG1CQUFXLENBQ3BDLGtCQUFXLEVBQ1gsUUFBUSxFQUNSLE9BQU8sQ0FDTSxDQUFBO0lBRWYsSUFBSSxXQUFXLEdBQUcscUJBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDckMsSUFBSTtRQUNGLFdBQVcsR0FBRyxNQUFNLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUM1RDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUN2RDtJQUVELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQTtJQUNsQixNQUFNLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQzNELHlCQUFlLENBQUMsUUFBUSxDQUFDO1FBQ3pCLDBCQUFnQixDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxRQUFRLENBQUM7S0FDcEQsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixDQUFDO1NBQ25ELEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDN0IsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtJQUVkLElBQUk7UUFDRixRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssZUFBUSxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxjQUFjLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBVSxDQUFBO2dCQUN0RSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxzQkFBYyxDQUN2QyxjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLE9BQU8sQ0FDUixDQUFBO2dCQUNELFVBQVUsR0FBRyxRQUFRLENBQUE7Z0JBQ3JCLE1BQUs7YUFDTjtZQUNELEtBQUssZUFBUSxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxjQUFjLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBVSxDQUFBO2dCQUN0RSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxzQkFBYyxDQUN2QyxjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLE9BQU8sQ0FDUixDQUFBO2dCQUNELFVBQVUsR0FBRyxRQUFRLENBQUE7Z0JBQ3JCLE1BQUs7YUFDTjtTQUNGO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDakI7SUFFRCxNQUFNLHdCQUF3QixHQUFHLE1BQU0sb0JBQVcsQ0FDaEQsTUFBTSxFQUNOLG1CQUFtQixFQUNuQixVQUFVLEVBQ1YsUUFBUSxFQUNSLE9BQU8sRUFDUCxlQUFlLEVBQ2YsSUFBSSxDQUNMLENBQUE7SUFFRCxNQUFNLGNBQWMsR0FBRyxNQUFNLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQy9ELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1NBQzNELEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsa0JBQU0sQ0FBQztTQUNYLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUN0QixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBTSxDQUFDLENBQUE7SUFFcEQsT0FBTztRQUNMLEtBQUs7UUFDTCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLFNBQVMsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ2pDLFFBQVEsRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ2xDLFVBQVU7UUFDVixlQUFlLEVBQUUsV0FBVyxDQUFDLGVBQWUsQ0FBQztRQUM3QyxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQztLQUMxQixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBakdZLFFBQUEsd0JBQXdCLDRCQWlHcEMifQ==
