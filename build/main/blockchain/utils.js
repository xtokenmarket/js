'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getSignerAddress = exports.getSigner = exports.getUniswapPoolContract = exports.getUniswapPoolAddress = exports.getExchangeRateContract = exports.getUserAvailableTokenBalance = exports.getTokenBalance = exports.parseFees = exports.getLPTokenSymbol = exports.getTokenSymbol = exports.getKyberPoolContract = exports.getKyberPoolAddress = exports.getInchPoolContract = exports.getInchPoolAddress = exports.getExpectedRate = exports.getContract = exports.getBancorPoolContract = exports.getBancorPoolAddress = exports.getBalancerPoolContract = exports.getBalancerPoolAddress = exports.getAbi = exports.capitalizeToken = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../constants')
const { formatEther, parseEther } = ethers_1.ethers.utils
const capitalizeToken = (symbol) => {
  if (![abis_1.S_ETH, abis_1.S_USD].includes(symbol)) {
    return symbol.toUpperCase()
  }
  return symbol
}
exports.capitalizeToken = capitalizeToken
const getAbi = (contractName) => {
  switch (contractName) {
    case abis_1.AAVE:
    case abis_1.BNT:
    case abis_1.INCH:
    case abis_1.KNC:
    case abis_1.DAI:
    case abis_1.S_ETH:
    case abis_1.S_USD:
    case abis_1.USDC:
    case abis_1.USDT:
    case abis_1.WETH:
      return abis_1.Abi.ERC20
    case abis_1.EXCHANGE_RATES:
      return abis_1.Abi.ExchangeRates
    case abis_1.INCH_LIQUIDITY_PROTOCOL:
      return abis_1.Abi.InchLiquidityProtocol
    case abis_1.KYBER_PROXY:
      return abis_1.Abi.KyberProxy
    case abis_1.SNX:
      return abis_1.Abi.Synthetix
    case abis_1.TRADE_ACCOUNTING:
      return abis_1.Abi.TradeAccounting
    case abis_1.UNISWAP_V2_PAIR:
      return abis_1.Abi.UniswapV2Pair
    case abis_1.X_AAVE_A:
    case abis_1.X_AAVE_B:
      return abis_1.Abi.xAAVE
    case abis_1.X_BNT_A:
      return abis_1.Abi.xBNT
    case abis_1.X_INCH_A:
    case abis_1.X_INCH_B:
      return abis_1.Abi.xINCH
    case abis_1.X_KNC_A:
    case abis_1.X_KNC_B:
      return abis_1.Abi.xKNC
    case abis_1.X_SNX_A:
      return abis_1.Abi.xSNX
    case abis_1.X_U3LP_A:
    case abis_1.X_U3LP_B:
    case abis_1.X_U3LP_C:
      // case X_U3LP_D:
      return abis_1.Abi.xU3LP
  }
}
exports.getAbi = getAbi
const getBalancerPoolAddress = (symbol, chainId) => {
  let address
  switch (symbol) {
    case abis_1.X_AAVE_A:
      address = abis_1.ADDRESSES[abis_1.X_AAVE_A_BALANCER_POOL][chainId]
      break
    case abis_1.X_AAVE_B:
      address = abis_1.ADDRESSES[abis_1.X_AAVE_B_BALANCER_POOL][chainId]
      break
    case abis_1.X_SNX_A:
      address = abis_1.ADDRESSES[abis_1.X_SNX_A_BALANCER_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}
exports.getBalancerPoolAddress = getBalancerPoolAddress
const getBalancerPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = exports.getBalancerPoolAddress(symbol, chainId)
  if (!address) return null
  return new ethers_1.ethers.Contract(
    address,
    abis_1.Abi.BalancerPool,
    exports.getSigner(provider)
  )
}
exports.getBalancerPoolContract = getBalancerPoolContract
const getBancorPoolAddress = (symbol, chainId) => {
  let address
  switch (symbol) {
    case abis_1.X_BNT_A:
      address = abis_1.ADDRESSES[abis_1.X_BNT_A_BANCOR_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}
exports.getBancorPoolAddress = getBancorPoolAddress
const getBancorPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = exports.getBancorPoolAddress(symbol, chainId)
  if (!address) return null
  return new ethers_1.ethers.Contract(
    address,
    abis_1.Abi.BancorSmartToken,
    exports.getSigner(provider)
  )
}
exports.getBancorPoolContract = getBancorPoolContract
const getContract = (contractName, provider, network) => {
  if (!provider) return null
  const address = abis_1.ADDRESSES[contractName][network.chainId]
  if (!address) return null
  return new ethers_1.ethers.Contract(
    address,
    exports.getAbi(contractName),
    exports.getSigner(provider)
  )
}
exports.getContract = getContract
const getExpectedRate = async (
  kyberProxyContract,
  inputAsset,
  outputAsset,
  amount,
  isMinRate = false
) => {
  if (isMinRate) {
    return constants_1.ZERO_NUMBER
  }
  const { expectedRate } = await kyberProxyContract.getExpectedRate(
    inputAsset,
    outputAsset,
    amount
  )
  return expectedRate
}
exports.getExpectedRate = getExpectedRate
const getInchPoolAddress = (symbol, chainId) => {
  let address
  switch (symbol) {
    case abis_1.X_INCH_A:
      address = abis_1.ADDRESSES[abis_1.X_INCH_A_INCH_POOL][chainId]
      break
    case abis_1.X_INCH_B:
      address = abis_1.ADDRESSES[abis_1.X_INCH_B_INCH_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}
exports.getInchPoolAddress = getInchPoolAddress
const getInchPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = exports.getInchPoolAddress(symbol, chainId)
  return new ethers_1.ethers.Contract(
    address,
    abis_1.Abi.InchLiquidityProtocol,
    exports.getSigner(provider)
  )
}
exports.getInchPoolContract = getInchPoolContract
const getKyberPoolAddress = (symbol, chainId) => {
  let address
  switch (symbol) {
    case abis_1.X_KNC_A:
      address = abis_1.ADDRESSES[abis_1.X_KNC_A_KYBER_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}
exports.getKyberPoolAddress = getKyberPoolAddress
const getKyberPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = exports.getKyberPoolAddress(symbol, chainId)
  return new ethers_1.ethers.Contract(
    address,
    abis_1.Abi.DMMPool,
    exports.getSigner(provider)
  )
}
exports.getKyberPoolContract = getKyberPoolContract
const getTokenSymbol = (symbol) => {
  switch (symbol) {
    case abis_1.X_AAVE_A:
    case abis_1.X_AAVE_B:
      return abis_1.AAVE
    case abis_1.X_BNT_A:
      return abis_1.BNT
    case abis_1.X_INCH_A:
    case abis_1.X_INCH_B:
      return abis_1.INCH
    case abis_1.X_KNC_A:
    case abis_1.X_KNC_B:
      return abis_1.KNC
    case abis_1.X_SNX_A:
      return abis_1.SNX
  }
}
exports.getTokenSymbol = getTokenSymbol
const getLPTokenSymbol = (symbol) => {
  switch (symbol) {
    case abis_1.X_U3LP_A:
      return { 0: abis_1.DAI, 1: abis_1.USDC }
    case abis_1.X_U3LP_B:
      return { 0: abis_1.USDC, 1: abis_1.USDT }
    case abis_1.X_U3LP_C:
      return { 0: abis_1.S_USD, 1: abis_1.USDC }
    // case X_U3LP_D:
    //   return { 0: S_ETH, 1: WETH }
  }
}
exports.getLPTokenSymbol = getLPTokenSymbol
const parseFees = (fee) => {
  return parseEther(fee.isZero() ? '1' : String(1 - 1 / fee.toNumber()))
}
exports.parseFees = parseFees
const getTokenBalance = async (tokenAddress, userAddress, provider) => {
  const contract = new ethers_1.ethers.Contract(
    tokenAddress,
    abis_1.Abi.ERC20,
    provider
  )
  return contract.balanceOf(userAddress)
}
exports.getTokenBalance = getTokenBalance
const getUserAvailableTokenBalance = async (contract, address) => {
  let balance
  // TODO: Update the check to not be dependent upon `chainId`
  if (contract.address === abis_1.ADDRESSES[abis_1.SNX][1]) {
    balance = await contract.transferableSynthetix(address)
  } else {
    balance = await contract.balanceOf(address)
  }
  return Math.floor(Number(formatEther(balance.toString())) * 1000) / 1000
}
exports.getUserAvailableTokenBalance = getUserAvailableTokenBalance
const getExchangeRateContract = async (provider) => {
  if (!provider) return null
  const resolver = new ethers_1.ethers.Contract(
    abis_1.ADDRESSES[abis_1.SYNTHETIX_ADDRESS_RESOLVER][1],
    abis_1.Abi.AddressResolver,
    provider
  )
  const address = resolver.getAddress(
    ethers_1.ethers.utils.formatBytes32String('ExchangeRates')
  )
  if (!address) return null
  return new ethers_1.ethers.Contract(
    address,
    abis_1.Abi.ExchangeRates,
    exports.getSigner(provider)
  )
}
exports.getExchangeRateContract = getExchangeRateContract
const getUniswapPoolAddress = (symbol, chainId) => {
  let address
  switch (symbol) {
    case abis_1.X_KNC_A:
      address = abis_1.ADDRESSES[abis_1.X_KNC_A_UNISWAP_POOL][chainId]
      break
    case abis_1.X_KNC_B:
      address = abis_1.ADDRESSES[abis_1.X_KNC_B_UNISWAP_POOL][chainId]
      break
    default:
      address = null
  }
  return address
}
exports.getUniswapPoolAddress = getUniswapPoolAddress
const getUniswapPoolContract = (symbol, provider, chainId) => {
  if (!provider || !symbol) return null
  const address = exports.getUniswapPoolAddress(symbol, chainId)
  return new ethers_1.ethers.Contract(
    address,
    abis_1.Abi.UniswapV2Pair,
    exports.getSigner(provider)
  )
}
exports.getUniswapPoolContract = getUniswapPoolContract
const getSigner = (provider) => {
  try {
    return provider.getSigner()
  } catch (e) {
    return provider
  }
}
exports.getSigner = getSigner
const getSignerAddress = async (provider) => {
  const signer = provider.getSigner()
  return signer.getAddress()
}
exports.getSignerAddress = getSignerAddress
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSx1Q0F5Q3FCO0FBQ3JCLG1DQUEwQztBQUcxQyw0Q0FBMEM7QUFVMUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBcUIsRUFBRSxFQUFFO0lBQ3ZELElBQUksQ0FBQyxDQUFDLFlBQUssRUFBRSxZQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsT0FBTyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUE7S0FDNUI7SUFDRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQUxZLFFBQUEsZUFBZSxtQkFLM0I7QUFFTSxNQUFNLE1BQU0sR0FBRyxDQUFDLFlBQXdCLEVBQUUsRUFBRTtJQUNqRCxRQUFRLFlBQVksRUFBRTtRQUNwQixLQUFLLFdBQUksQ0FBQztRQUNWLEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxXQUFJLENBQUM7UUFDVixLQUFLLFVBQUcsQ0FBQztRQUNULEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxZQUFLLENBQUM7UUFDWCxLQUFLLFlBQUssQ0FBQztRQUNYLEtBQUssV0FBSSxDQUFDO1FBQ1YsS0FBSyxXQUFJLENBQUM7UUFDVixLQUFLLFdBQUk7WUFDUCxPQUFPLFVBQUcsQ0FBQyxLQUEwQixDQUFBO1FBQ3ZDLEtBQUsscUJBQWM7WUFDakIsT0FBTyxVQUFHLENBQUMsYUFBa0MsQ0FBQTtRQUMvQyxLQUFLLDhCQUF1QjtZQUMxQixPQUFPLFVBQUcsQ0FBQyxxQkFBMEMsQ0FBQTtRQUN2RCxLQUFLLGtCQUFXO1lBQ2QsT0FBTyxVQUFHLENBQUMsVUFBK0IsQ0FBQTtRQUM1QyxLQUFLLFVBQUc7WUFDTixPQUFPLFVBQUcs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
