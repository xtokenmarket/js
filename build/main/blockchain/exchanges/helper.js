'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getBalances = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const utils_2 = require('../utils')
const uniswap_1 = require('./uniswap')
const getBalances = async (
  symbol,
  poolAddress,
  tokenPrice,
  provider,
  chainId,
  underlyingPrice,
  isWeth,
  xTokenBalance = bignumber_1.BigNumber.from('0'),
  ethBalance = bignumber_1.BigNumber.from('0')
) => {
  // Addresses
  const xTokenAddress = abis_1.ADDRESSES[symbol][chainId]
  // Contracts
  const xTokenContract = new ethers_1.ethers.Contract(
    xTokenAddress,
    abis_1.Abi.ERC20,
    provider
  )
  // Ignore fetching xAsset balance in liquidity pool for xSNXa
  if (xTokenBalance.isZero()) {
    try {
      // Balances
      xTokenBalance = await xTokenContract.balanceOf(poolAddress)
    } catch (e) {
      console.error('Error while fetching user balance:', e)
    }
  }
  // ETH price in USD
  const ethUsdcPrice = await uniswap_1.getEthUsdcPrice(provider)
  const tokenVal = xTokenBalance
    .mul(utils_1.parseEther(tokenPrice.toString()))
    .div(constants_1.DEC_18)
  // Ignore fetching ETH/WETH balance in liquidity pool for xSNXa
  if (ethBalance.isZero()) {
    if (isWeth) {
      const wethAddress = abis_1.ADDRESSES[abis_1.WETH][chainId]
      const wethContract = new ethers_1.ethers.Contract(
        wethAddress,
        abis_1.Abi.ERC20,
        provider
      )
      ethBalance = await wethContract.balanceOf(poolAddress)
    } else {
      ethBalance = await provider.getBalance(poolAddress)
    }
  }
  const ethVal = ethBalance
    .mul(utils_1.parseEther(ethUsdcPrice))
    .div(constants_1.DEC_18)
  let underlying
  let underlyingVal = bignumber_1.BigNumber.from('0')
  if (underlyingPrice) {
    const tokenSymbol = utils_2.getTokenSymbol(symbol)
    const underlyingToken = tokenSymbol.toUpperCase()
    const underlyingAddress = abis_1.ADDRESSES[tokenSymbol][chainId]
    const underlyingContract = new ethers_1.ethers.Contract(
      underlyingAddress,
      abis_1.Abi.ERC20,
      provider
    )
    const underlyingBalance = await underlyingContract.balanceOf(poolAddress)
    underlyingVal = underlyingBalance
      .mul(underlyingPrice)
      .div(constants_1.DEC_18)
    underlying = {
      name: underlyingToken,
      amt: utils_1.formatEther(underlyingBalance),
      val: utils_1.formatEther(underlyingVal),
    }
  }
  const totalVal = ethVal.add(tokenVal).add(underlyingVal)
  return {
    totalVal: utils_1.formatEther(totalVal),
    token: {
      name: symbol,
      amt: utils_1.formatEther(xTokenBalance),
      val: utils_1.formatEther(tokenVal),
    },
    underlying,
    eth: {
      name: abis_1.ETH.toUpperCase(),
      amt: utils_1.formatEther(ethBalance),
      val: utils_1.formatEther(ethVal),
    },
  }
}
exports.getBalances = getBalances
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXhjaGFuZ2VzL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBb0Q7QUFFcEQsdUNBQXdEO0FBQ3hELG1DQUErQjtBQUMvQiw0Q0FBMEQ7QUFFMUQsK0NBQXdDO0FBRXhDLG9DQUF5QztBQUV6Qyx1Q0FBMkM7QUFFcEMsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixNQUFxQixFQUNyQixXQUFtQixFQUNuQixVQUFrQixFQUNsQixRQUFzQixFQUN0QixPQUFlLEVBQ2YsZUFBMkIsRUFDM0IsTUFBZ0IsRUFDaEIsYUFBYSxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNuQyxVQUFVLEdBQUcscUJBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ2hDLEVBQUU7SUFDRixZQUFZO0lBQ1osTUFBTSxhQUFhLEdBQUcsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUVoRCxZQUFZO0lBQ1osTUFBTSxjQUFjLEdBQUcsSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxVQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTlFLDZEQUE2RDtJQUM3RCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUMxQixJQUFJO1lBQ0YsV0FBVztZQUNYLGFBQWEsR0FBRyxNQUFNLGNBQWMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUE7U0FDNUQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDdkQ7S0FDRjtJQUVELG1CQUFtQjtJQUNuQixNQUFNLFlBQVksR0FBRyxNQUFNLHlCQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFcEQsTUFBTSxRQUFRLEdBQUcsYUFBYTtTQUMzQixHQUFHLENBQUMsa0JBQVUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUN0QyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxDQUFBO0lBRWQsK0RBQStEO0lBQy9ELElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3ZCLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxXQUFXLEdBQUcsZ0JBQVMsQ0FBQyxXQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM1QyxNQUFNLFlBQVksR0FBRyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFVBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFDMUUsVUFBVSxHQUFHLE1BQU0sWUFBWSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUN2RDthQUFNO1lBQ0wsVUFBVSxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUNwRDtLQUNGO0lBRUQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxrQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtJQUVuRSxJQUFJLFVBQVUsQ0FBQTtJQUNkLElBQUksYUFBYSxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRXZDLElBQUksZUFBZSxFQUFFO1FBQ25CLE1BQU0sV0FBVyxHQUFHLHNCQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDMUMsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2pELE1BQU0saUJBQWlCLEdBQUcsZ0JBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN6RCxNQUFNLGtCQUFrQixHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FDNUMsaUJBQWlCLEVBQ2pCLFVBQUcsQ0FBQyxLQUFLLEVBQ1QsUUFBUSxDQUNULENBQUE7UUFDRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sa0JBQWtCLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRXpFLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFNLENBQUMsQ0FBQTtRQUVsRSxVQUFVLEdBQUc7WUFDWCxJQUFJLEVBQUUsZUFBZTtZQUNyQixHQUFHLEVBQUUsbUJBQVcsQ0FBQyxpQkFBaUIsQ0FBQztZQUNuQyxHQUFHLEVBQUUsbUJBQVcsQ0FBQyxhQUFhLENBQUM7U0FDaEMsQ0FBQTtLQUNGO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFFeEQsT0FBTztRQUNMLFFBQVEsRUFBRSxtQkFBVyxDQUFDLFFBQVEsQ0FBQztRQUMvQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLEdBQUcsRUFBRSxtQkFBVyxDQUFDLGFBQWEsQ0FBQztZQUMvQixHQUFHLEVBQUUsbUJBQVcsQ0FBQyxRQUFRLENBQUM7U0FDM0I7UUFDRCxVQUFVO1FBQ1YsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFVBQUcsQ0FBQyxXQUFXLEVBQUU7WUFDdkIsR0FBRyxFQUFFLG1CQUFXLENBQUMsVUFBVSxDQUFDO1lBQzVCLEdBQUcsRUFBRSxtQkFBVyxDQUFDLE1BQU0sQ0FBQztTQUN6QjtLQUNGLENBQUE7QUFDSCxDQUFDLENBQUE7QUF0RlksUUFBQSxXQUFXLGVBc0Z2QiJ9
