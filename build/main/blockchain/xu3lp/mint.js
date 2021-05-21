'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.mintXU3LP = exports.getExpectedQuantityOnMintXU3LP = exports.approveXU3LP = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const { formatEther, parseEther } = ethers_1.ethers.utils
const approveXU3LP = async (symbol, amount, inputAsset, provider) => {
  const {
    token0Contract,
    token1Contract,
    xu3lpContract,
  } = await helper_1.getXU3LPContracts(symbol, provider)
  const tokenContract = inputAsset === 0 ? token0Contract : token1Contract
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await tokenContract.estimateGas.approve(xu3lpContract.address, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(xu3lpContract.address, amount, { gasLimit })
}
exports.approveXU3LP = approveXU3LP
const getExpectedQuantityOnMintXU3LP = async (
  symbol,
  inputAsset,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const { xu3lpContract } = await helper_1.getXU3LPContracts(symbol, provider)
  const [
    nav,
    totalSupply,
    { mintFee },
    { token0Price, token1Price },
  ] = await Promise.all([
    xu3lpContract.getNav(),
    xu3lpContract.totalSupply(),
    xu3lpContract.feeDivisors(),
    prices_1.getXU3LPTokenPrices(xu3lpContract),
  ])
  // Get amount in asset1 or asset0 terms
  const tokenPrice = inputAsset ? token1Price : token0Price
  const MINT_FEE = utils_2.parseFees(mintFee)
  const expectedQty = inputAmount
    .mul(tokenPrice)
    .mul(totalSupply)
    .div(nav)
    .div(constants_1.DEC_18)
  return formatEther(expectedQty.mul(MINT_FEE).div(constants_1.DEC_18))
}
exports.getExpectedQuantityOnMintXU3LP = getExpectedQuantityOnMintXU3LP
const mintXU3LP = async (symbol, inputAsset, amount, provider) => {
  const {
    token0Contract,
    token1Contract,
    xu3lpContract,
  } = await helper_1.getXU3LPContracts(symbol, provider)
  const assets = utils_2.getLPTokenSymbol(symbol)
  const tokenContract = inputAsset === 0 ? token0Contract : token1Contract
  const address = await utils_2.getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmount(
    tokenContract,
    xu3lpContract,
    address
  )
  // Parse 18 decimals `amount` to 6 decimals
  if ([abis_1.USDC, abis_1.USDT].includes(assets[inputAsset])) {
    amount = amount.div('1000000000000')
  }
  if (approvedAmount.lt(amount)) {
    return Promise.reject(new Error('Please approve the tokens before minting'))
  }
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await xu3lpContract.estimateGas.mintWithToken(inputAsset, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return xu3lpContract.mintWithToken(inputAsset, amount, {
    gasLimit,
  })
}
exports.mintXU3LP = mintXU3LP
const _getApprovedAmount = async (tokenContract, xu3lpContract, address) => {
  return tokenContract.allowance(address, xu3lpContract.address)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3h1M2xwL21pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsdUNBQXlDO0FBQ3pDLG1DQUE2QztBQUU3QywrQ0FBc0U7QUFHdEUsdUNBQTJDO0FBQzNDLG9DQUF3RTtBQUV4RSxxQ0FBNEM7QUFDNUMscUNBQThDO0FBRTlDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQTtBQUV6QyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQy9CLE1BQXVCLEVBQ3ZCLE1BQWlCLEVBQ2pCLFVBQXdCLEVBQ3hCLFFBQXNCLEVBQ1EsRUFBRTtJQUNoQyxNQUFNLEVBQ0osY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEdBQ2QsR0FBRyxNQUFNLDBCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUU3QyxNQUFNLGFBQWEsR0FBRyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQTtJQUV4RSxzQkFBc0I7SUFDdEIsTUFBTSxRQUFRLEdBQUcscUJBQWEsQ0FDNUIsTUFBTSxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUN0RSx3Q0FBNEIsQ0FDN0IsQ0FBQTtJQUVELE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDM0UsQ0FBQyxDQUFBO0FBckJZLFFBQUEsWUFBWSxnQkFxQnhCO0FBRU0sTUFBTSw4QkFBOEIsR0FBRyxLQUFLLEVBQ2pELE1BQXVCLEVBQ3ZCLFVBQXdCLEVBQ3hCLE1BQWMsRUFDZCxRQUFzQixFQUNMLEVBQUU7SUFDbkIsTUFBTSxXQUFXLEdBQUcs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
