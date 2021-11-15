'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.mintXU3LP = exports.getExpectedQuantityOnMintXU3LP = exports.approveXU3LP = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
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
  const { xu3lpContract } = await helper_1.getXU3LPContracts(symbol, provider)
  const [nav, totalSupply, { mintFee }] = await Promise.all([
    xu3lpContract.getNav(),
    xu3lpContract.totalSupply(),
    xu3lpContract.feeDivisors(),
  ])
  const MINT_FEE = utils_2.parseFees(mintFee)
  let expectedQty = parseEther(amount).mul(totalSupply).div(nav)
  // Get amount in `asset1` terms for token 0
  if (!inputAsset) {
    expectedQty = await xu3lpContract.getAmountInAsset1Terms(expectedQty)
  }
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
  if ([abis_1.USDC, abis_1.USDT].includes(assets[inputAsset])) {
    // Parse 18 decimals `amount` to 6 decimals
    amount = amount.div('1000000000000')
  } else if ([abis_1.REN_BTC, abis_1.WBTC].includes(assets[inputAsset])) {
    // Parse 18 decimals `amount` to 8 decimals
    amount = amount.div('10000000000')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3h1M2xwL21pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsdUNBQXdEO0FBQ3hELG1DQUE2QztBQUU3QywrQ0FBc0U7QUFHdEUsdUNBQTJDO0FBQzNDLG9DQUF3RTtBQUV4RSxxQ0FBNEM7QUFFNUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFBO0FBRXpDLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFDL0IsTUFBdUIsRUFDdkIsTUFBaUIsRUFDakIsVUFBb0IsRUFDcEIsUUFBc0IsRUFDUSxFQUFFO0lBQ2hDLE1BQU0sRUFDSixjQUFjLEVBQ2QsY0FBYyxFQUNkLGFBQWEsR0FDZCxHQUFHLE1BQU0sMEJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTdDLE1BQU0sYUFBYSxHQUFHLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFBO0lBRXhFLHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQ3RFLHdDQUE0QixDQUM3QixDQUFBO0lBRUQsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUMzRSxDQUFDLENBQUE7QUFyQlksUUFBQSxZQUFZLGdCQXFCeEI7QUFFTSxNQUFNLDhCQUE4QixHQUFHLEtBQUssRUFDakQsTUFBdUIsRUFDdkIsVUFBb0IsRUFDcEIsTUFBYyxFQUNkLFFBQXNCLEVBQ0wsRUFBRTtJQUNuQixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFB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
