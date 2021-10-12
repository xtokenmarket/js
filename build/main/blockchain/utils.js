'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.toTitleCase = exports.isXAssetCLRSymbol = exports.getSignerAddress = exports.getSigner = exports.getUniswapPoolContract = exports.getUniswapPoolAddress = exports.getExchangeRateContract = exports.getUserAvailableTokenBalance = exports.getTokenBalance = exports.parseFees = exports.getXAssetPrices = exports.getXAssetCLRTokenSymbol = exports.getXAssetCLRSymbol = exports.getLPTokenSymbol = exports.getTokenSymbol = exports.getKyberPoolContract = exports.getKyberPoolAddress = exports.getInchPoolContract = exports.getInchPoolAddress = exports.getExpectedRate = exports.getContract = exports.getBancorPoolContract = exports.getBancorPoolAddress = exports.getBalancerPoolContract = exports.getBalancerPoolAddress = exports.getAbi = exports.capitalizeToken = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../constants')
const xaave_1 = require('./xaave')
const helper_1 = require('./xaave/helper')
const xalpha_1 = require('./xalpha')
const helper_2 = require('./xalpha/helper')
const xbnt_1 = require('./xbnt')
const helper_3 = require('./xbnt/helper')
const xinch_1 = require('./xinch')
const helper_4 = require('./xinch/helper')
const xknc_1 = require('./xknc')
const helper_5 = require('./xknc/helper')
const xsnx_1 = require('./xsnx')
const helper_6 = require('./xsnx/helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const capitalizeToken = (symbol) => {
  if (![abis_1.REN_BTC, abis_1.S_ETH, abis_1.S_USD].includes(symbol)) {
    return symbol.toUpperCase()
  }
  return symbol
}
exports.capitalizeToken = capitalizeToken
const getAbi = (contractName) => {
  switch (contractName) {
    case abis_1.AAVE:
    case abis_1.ALPHA:
    case abis_1.BNT:
    case abis_1.BUSD:
    case abis_1.DAI:
    case abis_1.ETH:
    case abis_1.FRAX:
    case abis_1.INCH:
    case abis_1.KNC:
    case abis_1.REN_BTC:
    case abis_1.S_ETH:
    case abis_1.S_USD:
    case abis_1.USDC:
    case abis_1.USDT:
    case abis_1.UST:
    case abis_1.WBTC:
    case abis_1.WETH:
    case abis_1.XTK:
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
    case abis_1.UNISWAP_LIBRARY:
      return abis_1.Abi.UniswapLibrary
    case abis_1.UNISWAP_V2_PAIR:
      return abis_1.Abi.UniswapV2Pair
    case abis_1.X_AAVE_A:
    case abis_1.X_AAVE_B:
      return abis_1.Abi.xAAVE
    case abis_1.X_ALPHA_A:
      return abis_1.Abi.xALPHA
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
    case abis_1.X_U3LP_D:
    case abis_1.X_U3LP_E:
    case abis_1.X_U3LP_F:
    case abis_1.X_U3LP_G:
    case abis_1.X_U3LP_H:
      return abis_1.Abi.xU3LP
    case abis_1.XTK_MANAGEMENT_STAKING_MODULE:
      return abis_1.Abi.XTKManagementStakingModule
    case abis_1.AAVE_X_AAVE_A_CLR:
    case abis_1.X_ALPHA_A_ALPHA_CLR:
    case abis_1.BNT_X_BNT_A_CLR:
    case abis_1.INCH_X_INCH_A_CLR:
    case abis_1.INCH_X_INCH_B_CLR:
    case abis_1.X_AAVE_B_AAVE_CLR:
    case abis_1.X_KNC_A_KNC_CLR:
    case abis_1.X_KNC_B_KNC_CLR:
    case abis_1.X_SNX_A_SNX_CLR:
    case abis_1.XTK_ETH_CLR:
      return abis_1.Abi.xAssetCLR
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
      address = abis_1.ADDRESSES[abis_1.X_SNX_A_BALANCER_POOL_V2][chainId]
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
    case abis_1.X_ALPHA_A:
      return abis_1.ALPHA
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
    case abis_1.X_U3LP_D:
      return { 0: abis_1.S_ETH, 1: abis_1.WETH }
    case abis_1.X_U3LP_E:
      return { 0: abis_1.WBTC, 1: abis_1.REN_BTC }
    case abis_1.X_U3LP_F:
      return { 0: abis_1.USDC, 1: abis_1.UST }
    case abis_1.X_U3LP_G:
      return { 0: abis_1.FRAX, 1: abis_1.USDC }
    case abis_1.X_U3LP_H:
      return { 0: abis_1.BUSD, 1: abis_1.USDT }
  }
}
exports.getLPTokenSymbol = getLPTokenSymbol
const getXAssetCLRSymbol = (symbol) => {
  switch (symbol) {
    case abis_1.X_AAVE_A:
      return abis_1.AAVE_X_AAVE_A_CLR
    case abis_1.X_AAVE_B:
      return abis_1.X_AAVE_B_AAVE_CLR
    case abis_1.X_ALPHA_A:
      return abis_1.X_ALPHA_A_ALPHA_CLR
    case abis_1.X_BNT_A:
      return abis_1.BNT_X_BNT_A_CLR
    case abis_1.X_INCH_A:
      return abis_1.INCH_X_INCH_A_CLR
    case abis_1.X_INCH_B:
      return abis_1.INCH_X_INCH_B_CLR
    case abis_1.X_KNC_A:
      return abis_1.X_KNC_A_KNC_CLR
    case abis_1.X_KNC_B:
      return abis_1.X_KNC_B_KNC_CLR
    case abis_1.X_SNX_A:
      return abis_1.X_SNX_A_SNX_CLR
  }
}
exports.getXAssetCLRSymbol = getXAssetCLRSymbol
const getXAssetCLRTokenSymbol = (symbol) => {
  switch (symbol) {
    case abis_1.AAVE_X_AAVE_A_CLR:
      return { 0: abis_1.AAVE, 1: abis_1.X_AAVE_A }
    case abis_1.X_ALPHA_A_ALPHA_CLR:
      return { 0: abis_1.ALPHA, 1: abis_1.X_ALPHA_A }
    case abis_1.BNT_X_BNT_A_CLR:
      return { 0: abis_1.BNT, 1: abis_1.X_BNT_A }
    case abis_1.INCH_X_INCH_A_CLR:
      return { 0: abis_1.INCH, 1: abis_1.X_INCH_A }
    case abis_1.INCH_X_INCH_B_CLR:
      return { 0: abis_1.INCH, 1: abis_1.X_INCH_B }
    case abis_1.X_AAVE_B_AAVE_CLR:
      return { 0: abis_1.X_AAVE_B, 1: abis_1.AAVE }
    case abis_1.X_KNC_A_KNC_CLR:
      return { 0: abis_1.X_KNC_A, 1: abis_1.KNC }
    case abis_1.X_KNC_B_KNC_CLR:
      return { 0: abis_1.X_KNC_B, 1: abis_1.KNC }
    case abis_1.X_SNX_A_SNX_CLR:
      return { 0: abis_1.X_SNX_A, 1: abis_1.SNX }
    case abis_1.XTK_ETH_CLR:
      return { 0: abis_1.XTK, 1: abis_1.WETH }
  }
}
exports.getXAssetCLRTokenSymbol = getXAssetCLRTokenSymbol
const getXAssetPrices = async (symbol, provider) => {
  switch (symbol) {
    case abis_1.X_AAVE_A:
    case abis_1.X_AAVE_B: {
      const {
        kyberProxyContract,
        network,
        xaaveContract,
      } = await helper_1.getXAaveContracts(symbol, provider)
      return xaave_1.getXAavePrices(
        xaaveContract,
        kyberProxyContract,
        network.chainId
      )
    }
    case abis_1.X_ALPHA_A: {
      const {
        kyberProxyContract,
        xalphaContract,
      } = await helper_2.getXAlphaContracts(symbol, provider)
      return xalpha_1.getXAlphaPrices(xalphaContract, kyberProxyContract)
    }
    case abis_1.X_BNT_A: {
      const {
        kyberProxyContract,
        xbntContract,
      } = await helper_3.getXBntContracts(symbol, provider)
      return xbnt_1.getXBntPrices(xbntContract, kyberProxyContract)
    }
    case abis_1.X_INCH_A:
    case abis_1.X_INCH_B: {
      const {
        kyberProxyContract,
        network,
        xinchContract,
      } = await helper_4.getXInchContracts(symbol, provider)
      return xinch_1.getXInchPrices(
        xinchContract,
        kyberProxyContract,
        network.chainId
      )
    }
    case abis_1.X_KNC_A:
    case abis_1.X_KNC_B: {
      const {
        kncContract,
        kyberProxyContract,
        xkncContract,
      } = await helper_5.getXKncContracts(symbol, provider)
      return xknc_1.getXKncPrices(xkncContract, kncContract, kyberProxyContract)
    }
    case abis_1.X_SNX_A: {
      const {
        network,
        snxContract,
        tradeAccountingContract,
        xsnxContract,
      } = await helper_6.getXSnxContracts(provider)
      const exchangeRatesContract = await exports.getExchangeRateContract(
        provider
      )
      return xsnx_1.getXSnxPrices(
        xsnxContract,
        abis_1.ADDRESSES[abis_1.X_SNX_ADMIN][network.chainId],
        tradeAccountingContract,
        exchangeRatesContract,
        snxContract,
        provider
      )
    }
  }
}
exports.getXAssetPrices = getXAssetPrices
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
  if (contract.address === abis_1.ADDRESSES[abis_1.SNX][1]) {
    balance = await contract.transferableSynthetix(address)
  } else {
    balance = await contract.balanceOf(address)
  }
  return Math.floor(Number(formatEther(balance.toString())) * 10000) / 10000
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
const isXAssetCLRSymbol = async (symbol) => {
  return [
    abis_1.AAVE_X_AAVE_A_CLR,
    abis_1.BNT_X_BNT_A_CLR,
    abis_1.INCH_X_INCH_A_CLR,
    abis_1.INCH_X_INCH_B_CLR,
    abis_1.X_AAVE_B_AAVE_CLR,
    abis_1.X_KNC_A_KNC_CLR,
    abis_1.X_KNC_B_KNC_CLR,
    abis_1.X_SNX_A_SNX_CLR,
  ].includes(symbol)
}
exports.isXAssetCLRSymbol = isXAssetCLRSymbol
const toTitleCase = (text) => {
  return text[0].toUpperCase() + text.slice(1).toLowerCase()
}
exports.toTitleCase = toTitleCase
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSx1Q0FtRXFCO0FBQ3JCLG1DQUEwQztBQUcxQyw0Q0FBMEM7QUFZMUMsbUNBQXdDO0FBQ3hDLDJDQUFrRDtBQUNsRCxxQ0FBMEM7QUFDMUMsNENBQW9EO0FBQ3BELGlDQUFzQztBQUN0QywwQ0FBZ0Q7QUFDaEQsbUNBQXdDO0FBQ3hDLDJDQUFrRDtBQUNsRCxpQ0FBc0M7QUFDdEMsMENBQWdEO0FBQ2hELGlDQUFzQztBQUN0QywwQ0FBZ0Q7QUFFaEQsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBcUIsRUFBRSxFQUFFO0lBQ3ZELElBQUksQ0FBQyxDQUFDLGNBQU8sRUFBRSxZQUFLLEVBQUUsWUFBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzdDLE9BQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFBO0tBQzVCO0lBQ0QsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUE7QUFMWSxRQUFBLGVBQWUsbUJBSzNCO0FBRU0sTUFBTSxNQUFNLEdBQUcsQ0FBQyxZQUF3QixFQUFFLEVBQUU7SUFDakQsUUFBUSxZQUFZLEVBQUU7UUFDcEIsS0FBSyxXQUFJLENBQUM7UUFDVixLQUFLLFlBQUssQ0FBQztRQUNYLEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxXQUFJLENBQUM7UUFDVixLQUFLLFVBQUcsQ0FBQztRQUNULEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxXQUFJLENBQUM7UUFDVixLQUFLLFdBQUksQ0FBQztRQUNWLEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxjQUFPLENBQUM7UUFDYixLQUFLLFlBQUssQ0FBQztRQUNYLEtBQUssWUFBSyxDQUFD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
