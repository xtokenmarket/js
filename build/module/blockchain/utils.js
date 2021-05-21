import {
  AAVE,
  Abi,
  ADDRESSES,
  BNT,
  DAI,
  EXCHANGE_RATES,
  INCH,
  INCH_LIQUIDITY_PROTOCOL,
  KNC,
  KYBER_PROXY,
  S_ETH,
  S_USD,
  SNX,
  SYNTHETIX_ADDRESS_RESOLVER,
  TRADE_ACCOUNTING,
  UNISWAP_V2_PAIR,
  USDC,
  USDT,
  WETH,
  X_AAVE_A,
  X_AAVE_A_BALANCER_POOL,
  X_AAVE_B,
  X_AAVE_B_BALANCER_POOL,
  X_BNT_A,
  X_BNT_A_BANCOR_POOL,
  X_INCH_A,
  X_INCH_A_INCH_POOL,
  X_INCH_B,
  X_INCH_B_INCH_POOL,
  X_KNC_A,
  X_KNC_A_KYBER_POOL,
  X_KNC_A_UNISWAP_POOL,
  X_KNC_B,
  X_KNC_B_UNISWAP_POOL,
  X_SNX_A,
  X_SNX_A_BALANCER_POOL,
  X_U3LP_A,
  X_U3LP_B,
  X_U3LP_C,
  X_U3LP_D,
} from '@xtoken/abis'
import { ethers } from 'ethers'
import { ZERO_NUMBER } from '../constants'
const { formatEther, parseEther } = ethers.utils
export const getAbi = (contractName) => {
  switch (contractName) {
    case AAVE:
    case BNT:
    case INCH:
    case KNC:
    case DAI:
    case S_ETH:
    case S_USD:
    case USDC:
    case USDT:
    case WETH:
      return Abi.ERC20
    case EXCHANGE_RATES:
      return Abi.ExchangeRates
    case INCH_LIQUIDITY_PROTOCOL:
      return Abi.InchLiquidityProtocol
    case KYBER_PROXY:
      return Abi.KyberProxy
    case SNX:
      return Abi.Synthetix
    case TRADE_ACCOUNTING:
      return Abi.TradeAccounting
    case UNISWAP_V2_PAIR:
      return Abi.UniswapV2Pair
    case X_AAVE_A:
    case X_AAVE_B:
      return Abi.xAAVE
    case X_BNT_A:
      return Abi.xBNT
    case X_INCH_A:
    case X_INCH_B:
      return Abi.xINCH
    case X_KNC_A:
    case X_KNC_B:
      return Abi.xKNC
    case X_SNX_A:
      return Abi.xSNX
    case X_U3LP_A:
    case X_U3LP_B:
    case X_U3LP_C:
    case X_U3LP_D:
      return Abi.xU3LP
  }
}
export const getBalancerPoolAddress = (symbol, chainId) => {
  let address
  switch (symbol) {
    case X_AAVE_A:
      address = ADDRESSES[X_AAVE_A_BALANCER_POOL][chainId]
      break
    case X_AAVE_B:
      address = ADDRESSES[X_AAVE_B_BALANCER_POOL][chainId]
      break
    case X_SNX_A:
      address = ADDRESSES[X_SNX_A_BALANCER_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}
export const getBalancerPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = getBalancerPoolAddress(symbol, chainId)
  if (!address) return null
  return new ethers.Contract(address, Abi.BalancerPool, getSigner(provider))
}
export const getBancorPoolAddress = (symbol, chainId) => {
  let address
  switch (symbol) {
    case X_BNT_A:
      address = ADDRESSES[X_BNT_A_BANCOR_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}
export const getBancorPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = getBancorPoolAddress(symbol, chainId)
  if (!address) return null
  return new ethers.Contract(address, Abi.BancorSmartToken, getSigner(provider))
}
export const getContract = (contractName, provider, network) => {
  if (!provider) return null
  const address = ADDRESSES[contractName][network.chainId]
  if (!address) return null
  return new ethers.Contract(address, getAbi(contractName), getSigner(provider))
}
export const getExpectedRate = async (
  kyberProxyContract,
  inputAsset,
  outputAsset,
  amount,
  isMinRate = false
) => {
  if (isMinRate) {
    return ZERO_NUMBER
  }
  const { expectedRate } = await kyberProxyContract.getExpectedRate(
    inputAsset,
    outputAsset,
    amount
  )
  return expectedRate
}
export const getInchPoolAddress = (symbol, chainId) => {
  let address
  switch (symbol) {
    case X_INCH_A:
      address = ADDRESSES[X_INCH_A_INCH_POOL][chainId]
      break
    case X_INCH_B:
      address = ADDRESSES[X_INCH_B_INCH_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}
export const getInchPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = getInchPoolAddress(symbol, chainId)
  return new ethers.Contract(
    address,
    Abi.InchLiquidityProtocol,
    getSigner(provider)
  )
}
export const getKyberPoolAddress = (symbol, chainId) => {
  let address
  switch (symbol) {
    case X_KNC_A:
      address = ADDRESSES[X_KNC_A_KYBER_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}
export const getKyberPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = getKyberPoolAddress(symbol, chainId)
  return new ethers.Contract(address, Abi.DMMPool, getSigner(provider))
}
export const getTokenSymbol = (symbol) => {
  switch (symbol) {
    case X_AAVE_A:
    case X_AAVE_B:
      return AAVE
    case X_BNT_A:
      return BNT
    case X_INCH_A:
    case X_INCH_B:
      return INCH
    case X_KNC_A:
    case X_KNC_B:
      return KNC
    case X_SNX_A:
      return SNX
  }
}
export const getLPTokenSymbol = (symbol) => {
  switch (symbol) {
    case X_U3LP_A:
      return { 0: DAI, 1: USDC }
    case X_U3LP_B:
      return { 0: USDC, 1: USDT }
    case X_U3LP_C:
      return { 0: S_USD, 1: USDC }
    case X_U3LP_D:
      return { 0: S_ETH, 1: WETH }
  }
}
export const parseFees = (fee) => {
  return parseEther(fee.isZero() ? '1' : String(1 - 1 / fee.toNumber()))
}
export const getTokenBalance = async (tokenAddress, userAddress, provider) => {
  const contract = new ethers.Contract(tokenAddress, Abi.ERC20, provider)
  return contract.balanceOf(userAddress)
}
export const getUserAvailableTokenBalance = async (contract, address) => {
  let balance
  // TODO: Update the check to not be dependent upon `chainId`
  if (contract.address === ADDRESSES[SNX][1]) {
    balance = await contract.transferableSynthetix(address)
  } else {
    balance = await contract.balanceOf(address)
  }
  return Math.floor(Number(formatEther(balance.toString())) * 1000) / 1000
}
export const getExchangeRateContract = async (provider) => {
  if (!provider) return null
  const resolver = new ethers.Contract(
    ADDRESSES[SYNTHETIX_ADDRESS_RESOLVER][1],
    Abi.AddressResolver,
    provider
  )
  const address = resolver.getAddress(
    ethers.utils.formatBytes32String('ExchangeRates')
  )
  if (!address) return null
  return new ethers.Contract(address, Abi.ExchangeRates, getSigner(provider))
}
export const getUniswapPoolAddress = (symbol, chainId) => {
  let address
  switch (symbol) {
    case X_KNC_A:
      address = ADDRESSES[X_KNC_A_UNISWAP_POOL][chainId]
      break
    case X_KNC_B:
      address = ADDRESSES[X_KNC_B_UNISWAP_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}
export const getUniswapPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = getUniswapPoolAddress(symbol, chainId)
  return new ethers.Contract(address, Abi.UniswapV2Pair, getSigner(provider))
}
export const getSigner = (provider) => {
  try {
    return provider.getSigner()
  } catch (e) {
    return provider
  }
}
export const getSignerAddress = async (provider) => {
  const signer = provider.getSigner()
  return signer.getAddress()
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQ0wsSUFBSSxFQUNKLEdBQUcsRUFDSCxTQUFTLEVBQ1QsR0FBRyxFQUNILEdBQUcsRUFDSCxjQUFjLEVBQ2QsSUFBSSxFQUNKLHVCQUF1QixFQUN2QixHQUFHLEVBQ0gsV0FBVyxFQUNYLEtBQUssRUFDTCxLQUFLLEVBQ0wsR0FBRyxFQUNILDBCQUEwQixFQUMxQixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLFFBQVEsRUFDUixzQkFBc0IsRUFDdEIsUUFBUSxFQUNSLHNCQUFzQixFQUN0QixPQUFPLEVBQ1AsbUJBQW1CLEVBQ25CLFFBQVEsRUFDUixrQkFBa0IsRUFDbEIsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUNwQixPQUFPLEVBQ1Asb0JBQW9CLEVBQ3BCLE9BQU8sRUFDUCxxQkFBcUIsRUFDckIsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxHQUNULE1BQU0sY0FBYyxDQUFBO0FBQ3JCLE9BQU8sRUFBYSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFHMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQVMxQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7QUFFaEQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLENBQUMsWUFBd0IsRUFBRSxFQUFFO0lBQ2pELFFBQVEsWUFBWSxFQUFFO1FBQ3BCLEtBQUssSUFBSSxDQUFDO1FBQ1YsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLElBQUksQ0FBQztRQUNWLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxJQUFJLENBQUM7UUFDVixLQUFLLElBQUksQ0FBQztRQUNWLEtBQUssSUFBSTtZQUNQLE9BQU8sR0FBRyxDQUFDLEtBQTBCLENBQUE7UUFDdkMsS0FBSyxjQUFjO1lBQ2pCLE9BQU8sR0FBRyxDQUFDLGFBQWtDLENBQUE7UUFDL0MsS0FBSyx1QkFBdUI7WUFDMUIsT0FBTyxHQUFHLENBQUMscUJBQTBDLENBQUE7UUFDdkQsS0FBSyxXQUFXO1lBQ2QsT0FBTyxHQUFHLENBQUMsVUFBK0IsQ0FBQTtRQUM1QyxLQUFLLEdBQUc7WUFDTixPQUFPLEdBQUcsQ0FBQyxTQUE4QixDQUFBO1FBQzNDLEtBQUssZ0JBQWdCO1lBQ25CLE9BQU8sR0FBRyxDQUFDLGVBQW9DLENBQUE7UUFDakQsS0FBSyxlQUFlO1lBQ2xCLE9BQU8sR0FBRyxDQUFDLGFBQWtDLENBQUE7UUFDL0MsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFFBQVE7WUFDWCxPQUFPLEdBQUcsQ0FBQyxLQUEwQixDQUFBO1FBQ3ZDLEtBQUssT0FBTztZQUNWLE9BQU8sR0FBRyxDQUFDLElBQXlCLENBQUE7UUFDdEMsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFFBQVE7WUFDWCxPQUFPLEdBQUcsQ0FBQyxLQUEwQixDQUFBO1FBQ3ZDLEtBQUssT0FBTyxDQUFDO1FBQ2IsS0FBSyxPQUFPO1lBQ1YsT0FBTyxHQUFHLENBQUMsSUFBeUIsQ0FBQTtRQUN0QyxLQUFLLE9BQU87WUFDVixPQUFPLEdBQUcsQ0FBQyxJQUF5QixDQUFBO1FBQ3RDLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssUUFBUTtZQUNYLE9BQU8sR0FBRyxDQUFDLEtBQTBCLENBQUE7S0FDeEM7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxDQUNwQyxNQUFxQixFQUNyQixPQUFlLEVBQ2YsRUFBRTtJQUNGLElBQUksT0FBTyxDQUFBO0lBQ1gsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLFFBQVE7WUFDWCxPQUFPLEdBQUcsU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDcEQsTUFBSztRQUNQLEtBQUssUUFBUTtZQUNYLE9BQU8sR0FBRyxTQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNwRCxNQUFLO1FBQ1AsS0FBSyxPQUFPO1lBQ1YsT0FBTyxHQUFHLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ25ELE1BQUs7UUFDUDtZQUNFLE9BQU8sR0FBRyxJQUFJLENBQUE7S0FDakI7SUFDRCxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxDQUNyQyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixPQUFlLEVBQ2YsRUFBRTtJQUNGLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFFckMsTUFBTSxPQUFPLEdBQUcsc0JBQXNCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRXZELElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFFekIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7QUFDNUUsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsQ0FDbEMsTUFBcUIsRUFDckIsT0FBZSxFQUNmLEVBQUU7SUFDRixJQUFJLE9BQU8sQ0FBQTtJQUNYLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxPQUFPO1lBQ1YsT0FBTyxHQUFHLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2pELE1BQUs7UUFDUDtZQUNFLE9BQU8sR0FBRyxJQUFJLENBQUE7S0FDakI7SUFDRCxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxDQUNuQyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixPQUFlLEVBQ2YsRUFBRTtJQUNGLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFFckMsTUFBTSxPQUFPLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRXJELElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFFekIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUNoRixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FDekIsWUFBd0IsRUFDeEIsUUFBc0IsRUFDdEIsT0FBZ0IsRUFDaEIsRUFBRTtJQUNGLElBQUksQ0FBQyxRQUFRO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFFMUIsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4RCxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBRXpCLE9BQU8sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7QUFDaEYsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFDbEMsa0JBQThCLEVBQzlCLFVBQWtCLEVBQ2xCLFdBQW1CLEVBQ25CLE1BQWlCLEVBQ2pCLFNBQVMsR0FBRyxLQUFLLEVBQ2pCLEVBQUU7SUFDRixJQUFJLFNBQVMsRUFBRTtRQUNiLE9BQU8sV0FBVyxDQUFBO0tBQ25CO0lBRUQsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsZUFBZSxDQUMvRCxVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sQ0FDUCxDQUFBO0lBQ0QsT0FBTyxZQUFZLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsQ0FDaEMsTUFBeUMsRUFDekMsT0FBZSxFQUNmLEVBQUU7SUFDRixJQUFJLE9BQU8sQ0FBQTtJQUNYLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxRQUFRO1lBQ1gsT0FBTyxHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2hELE1BQUs7UUFDUCxLQUFLLFFBQVE7WUFDWCxPQUFPLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDaEQsTUFBSztRQUNQO1lBQ0UsT0FBTyxHQUFHLElBQUksQ0FBQTtLQUNqQjtJQUNELE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLENBQ2pDLE1BQXlDLEVBQ3pDLFFBQXNCLEVBQ3RCLE9BQWUsRUFDZixFQUFFO0lBQ0YsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPLElBQUksQ0FBQTtJQUVyQyxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFXLENBQUE7SUFFN0QsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQ3hCLE9BQU8sRUFDUCxHQUFHLENBQUMscUJBQXFCLEVBQ3pCLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FDcEIsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLENBQ2pDLE1BQXVDLEVBQ3ZDLE9BQWUsRUFDZixFQUFFO0lBQ0YsSUFBSSxPQUFPLENBQUE7SUFDWCxRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssT0FBTztZQUNWLE9BQU8sR0FBRyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNoRCxNQUFLO1FBQ1A7WUFDRSxPQUFPLEdBQUcsSUFBSSxDQUFBO0tBQ2pCO0lBQ0QsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsQ0FDbEMsTUFBdUMsRUFDdkMsUUFBc0IsRUFDdEIsT0FBZSxFQUNmLEVBQUU7SUFDRixJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFBO0lBRXJDLE1BQU0sT0FBTyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQVcsQ0FBQTtJQUU5RCxPQUFPLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUN2RSxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsQ0FBQyxNQUFxQixFQUFFLEVBQUU7SUFDdEQsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssUUFBUTtZQUNYLE9BQU8sSUFBSSxDQUFBO1FBQ2IsS0FBSyxPQUFPO1lBQ1YsT0FBTyxHQUFHLENBQUE7UUFDWixLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssUUFBUTtZQUNYLE9BQU8sSUFBSSxDQUFBO1FBQ2IsS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLE9BQU87WUFDVixPQUFPLEdBQUcsQ0FBQTtRQUNaLEtBQUssT0FBTztZQUNWLE9BQU8sR0FBRyxDQUFBO0tBQ2I7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE1BQXVCLEVBQWMsRUFBRTtJQUN0RSxRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssUUFBUTtZQUNYLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQTtRQUM1QixLQUFLLFFBQVE7WUFDWCxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDN0IsS0FBSyxRQUFRO1lBQ1gsT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFBO1FBQzlCLEtBQUssUUFBUTtZQUNYLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQTtLQUMvQjtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQWMsRUFBRSxFQUFFO0lBQzFDLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3hFLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQ2xDLFlBQW9CLEVBQ3BCLFdBQW1CLEVBQ25CLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDdkUsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ3hDLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFHLEtBQUssRUFDL0MsUUFBa0IsRUFDbEIsT0FBZSxFQUNmLEVBQUU7SUFDRixJQUFJLE9BQU8sQ0FBQTtJQUVYLDREQUE0RDtJQUM1RCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzFDLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUN4RDtTQUFNO1FBQ0wsT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUM1QztJQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFBO0FBQzFFLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDdEUsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFPLElBQUksQ0FBQTtJQUUxQixNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQ2xDLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN4QyxHQUFHLENBQUMsZUFBZSxFQUNuQixRQUFRLENBQ1QsQ0FBQTtJQUNELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLENBQ2xELENBQUE7SUFFRCxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sSUFBSSxDQUFBO0lBRXpCLE9BQU8sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0FBQzdFLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLENBQ25DLE1BQXVDLEVBQ3ZDLE9BQWUsRUFDZixFQUFFO0lBQ0YsSUFBSSxPQUFPLENBQUE7SUFDWCxRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssT0FBTztZQUNWLE9BQU8sR0FBRyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNsRCxNQUFLO1FBQ1AsS0FBSyxPQUFPO1lBQ1YsT0FBTyxHQUFHLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2xELE1BQUs7UUFDUDtZQUNFLE9BQU8sR0FBRyxJQUFJLENBQUE7S0FDakI7SUFDRCxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxDQUNwQyxNQUF1QyxFQUN2QyxRQUFzQixFQUN0QixPQUFlLEVBQ2YsRUFBRTtJQUNGLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFFckMsTUFBTSxPQUFPLEdBQUcscUJBQXFCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBVyxDQUFBO0lBRWhFLE9BQU8sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0FBQzdFLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxDQUFDLFFBQXNCLEVBQUUsRUFBRTtJQUNsRCxJQUFJO1FBQ0YsT0FBUSxRQUE0QixDQUFDLFNBQVMsRUFBRSxDQUFBO0tBQ2pEO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLFFBQVEsQ0FBQTtLQUNoQjtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxRQUFzQixFQUFFLEVBQUU7SUFDL0QsTUFBTSxNQUFNLEdBQUksUUFBNEIsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUN4RCxPQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtBQUM1QixDQUFDLENBQUEifQ==