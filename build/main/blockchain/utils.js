'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.toTitleCase = exports.isXAssetCLRSymbol = exports.getSignerAddress = exports.getSigner = exports.getUniswapPoolContract = exports.getUniswapPoolAddress = exports.getExchangeRateContract = exports.getUserAvailableTokenBalance = exports.parseFees = exports.getXAssetPrices = exports.getXAssetCLRTokenSymbol = exports.getXAssetCLRSymbol = exports.getLPTokenSymbol = exports.getTokenSymbol = exports.getKyberPoolContract = exports.getKyberPoolAddress = exports.getInchPoolContract = exports.getInchPoolAddress = exports.getExpectedRate = exports.getContract = exports.getBancorPoolContract = exports.getBancorPoolAddress = exports.getBalancerPoolContract = exports.getBalancerPoolAddress = exports.getAbi = exports.capitalizeToken = void 0
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
    case abis_1.LINK:
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
    case abis_1.BNT_X_BNT_A_CLR:
    case abis_1.INCH_X_INCH_A_CLR:
    case abis_1.INCH_X_INCH_B_CLR:
    case abis_1.X_AAVE_B_AAVE_CLR:
    case abis_1.X_ALPHA_A_ALPHA_CLR:
    case abis_1.X_KNC_A_KNC_CLR:
    case abis_1.X_KNC_B_KNC_CLR:
    case abis_1.X_SNX_A_SNX_CLR:
    case abis_1.XTK_ETH_CLR:
      return abis_1.Abi.xAssetCLR
    case abis_1.LENDING_COMPTROLLER:
      return abis_1.Abi.Comptroller
    case abis_1.LENDING_LIQUIDITY_POOL:
      return abis_1.Abi.LiquidityPool
    case abis_1.LENDING_LPT:
      return abis_1.Abi.LPT
    // case LENDING_X_AAVE_A_MARKET:
    // case LENDING_X_AAVE_B_MARKET:
    // case LENDING_X_INCH_A_MARKET:
    // case LENDING_X_INCH_B_MARKET:
    // case LENDING_X_KNC_A_MARKET:
    // case LENDING_X_KNC_B_MARKET:
    case abis_1.LENDING_WBTC_MARKET:
    case abis_1.LENDING_WETH_MARKET:
    case abis_1.LENDING_LINK_MARKET:
      return abis_1.Abi.Market
    /*case LENDING_X_AAVE_A_PRICE:
        case LENDING_X_AAVE_B_PRICE:
          return Abi.xAAVEPrice as ContractInterface
        case LENDING_X_INCH_A_PRICE:
        case LENDING_X_INCH_B_PRICE:
          return Abi.xINCHPrice as ContractInterface
        case LENDING_X_KNC_A_PRICE:
        case LENDING_X_KNC_B_PRICE:
          return Abi.xKNCPrice as ContractInterface
         */
    case abis_1.LENDING_WBTC_PRICE:
    case abis_1.LENDING_WETH_PRICE:
    case abis_1.LENDING_LINK_PRICE:
      return abis_1.Abi.NativePrice
    case abis_1.ARBITRUM_NFT_CORE:
      return abis_1.Abi.ArbitrumNFTCore
    case abis_1.L2_NFT:
      return abis_1.Abi.L2_NFT
    case abis_1.GM:
    case abis_1.GA:
    case abis_1.GN:
    case abis_1.WAGMI:
      return abis_1.Abi.GM
    case abis_1.LIQUIDITY_POOL:
      return abis_1.Abi.liquidityPool
    case abis_1.X_ASSET_LEV:
      return abis_1.Abi.xAssetLev
    case abis_1.X_ASSET_LEV_2X:
      return abis_1.Abi.xAssetLev2x
    case abis_1.X_ASSET_LEV_3X:
      return abis_1.Abi.xAssetLev3x
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
const getLPTokenSymbol = (symbol, chainId = 1) => {
  switch (symbol) {
    case abis_1.X_U3LP_A:
      return { 0: abis_1.DAI, 1: abis_1.USDC }
    case abis_1.X_U3LP_B:
      if (chainId === constants_1.ChainId.Arbitrum) {
        return { 0: abis_1.USDT, 1: abis_1.USDC }
      } else {
        return { 0: abis_1.USDC, 1: abis_1.USDT }
      }
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
    case abis_1.BNT_X_BNT_A_CLR:
      return { 0: abis_1.BNT, 1: abis_1.X_BNT_A }
    case abis_1.INCH_X_INCH_A_CLR:
      return { 0: abis_1.INCH, 1: abis_1.X_INCH_A }
    case abis_1.INCH_X_INCH_B_CLR:
      return { 0: abis_1.INCH, 1: abis_1.X_INCH_B }
    case abis_1.X_AAVE_B_AAVE_CLR:
      return { 0: abis_1.X_AAVE_B, 1: abis_1.AAVE }
    case abis_1.X_ALPHA_A_ALPHA_CLR:
      return { 0: abis_1.X_ALPHA_A, 1: abis_1.ALPHA }
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
      const { xaaveContract } = await helper_1.getXAaveContracts(
        symbol,
        provider
      )
      return xaave_1.getXAavePrices(xaaveContract)
    }
    case abis_1.X_ALPHA_A: {
      const { xalphaContract } = await helper_2.getXAlphaContracts(
        symbol,
        provider
      )
      return xalpha_1.getXAlphaPrices(xalphaContract)
    }
    case abis_1.X_BNT_A: {
      const { xbntContract } = await helper_3.getXBntContracts(symbol, provider)
      return xbnt_1.getXBntPrices(xbntContract)
    }
    case abis_1.X_INCH_A:
    case abis_1.X_INCH_B: {
      const { xinchContract } = await helper_4.getXInchContracts(
        symbol,
        provider
      )
      return xinch_1.getXInchPrices(xinchContract)
    }
    case abis_1.X_KNC_A:
    case abis_1.X_KNC_B: {
      const { xkncContract } = await helper_5.getXKncContracts(symbol, provider)
      return xknc_1.getXKncPrices(xkncContract)
    }
    case abis_1.X_SNX_A: {
      const { xsnxContract } = await helper_6.getXSnxContracts(provider)
      return xsnx_1.getXSnxPrices(xsnxContract)
    }
  }
}
exports.getXAssetPrices = getXAssetPrices
const parseFees = (fee) => {
  return parseEther(fee.isZero() ? '1' : String(1 - 1 / fee.toNumber()))
}
exports.parseFees = parseFees
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSx1Q0FrR3FCO0FBQ3JCLG1DQUEwQztBQUcxQyw0Q0FBbUQ7QUFZbkQsbUNBQXdDO0FBQ3hDLDJDQUFrRDtBQUNsRCxxQ0FBMEM7QUFDMUMsNENBQW9EO0FBQ3BELGlDQUFzQztBQUN0QywwQ0FBZ0Q7QUFDaEQsbUNBQXdDO0FBQ3hDLDJDQUFrRDtBQUNsRCxpQ0FBc0M7QUFDdEMsMENBQWdEO0FBQ2hELGlDQUFzQztBQUN0QywwQ0FBZ0Q7QUFFaEQsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBcUIsRUFBRSxFQUFFO0lBQ3ZELElBQUksQ0FBQyxDQUFDLGNBQU8sRUFBRSxZQUFLLEVBQUUsWUFBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzdDLE9BQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFBO0tBQzVCO0lBQ0QsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUE7QUFMWSxRQUFBLGVBQWUsbUJBSzNCO0FBRU0sTUFBTSxNQUFNLEdBQUcsQ0FBQyxZQUF3QixFQUFFLEVBQUU7SUFDakQsUUFBUSxZQUFZLEVBQUU7UUFDcEIsS0FBSyxXQUFJLENBQUM7UUFDVixLQUFLLFlBQUssQ0FBQztRQUNYLEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxXQUFJLENBQUM7UUFDVixLQUFLLFVBQUcsQ0FBQztRQUNULEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxXQUFJLENBQUM7UUFDVixLQUFLLFdBQUksQ0FBQztRQUNWLEtBQUssVUFBRyxDQUFDO1FBQ1QsS0FBSyxjQUFPLENBQUM7UUFDYixLQUFLLFlBQUssQ0FBQztRQUNYLEtBQUssWUFBSyxDQUFD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
