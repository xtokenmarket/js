'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.mintXSnx = exports.getExpectedQuantityOnMintXSnx = exports.approveXSnx = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const constants_1 = require('../../constants')
const utils_1 = require('../../utils')
const utils_2 = require('../utils')
const helper_1 = require('./helper')
const { formatEther, parseEther } = ethers_1.ethers.utils
const approveXSnx = async (amount, provider) => {
  const { tokenContract, xsnxContract } = await helper_1.getXSnxContracts(
    provider
  )
  // Estimate `gasLimit`
  const gasLimit = utils_1.getPercentage(
    await tokenContract.estimateGas.approve(xsnxContract.address, amount),
    constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(xsnxContract.address, amount, { gasLimit })
}
exports.approveXSnx = approveXSnx
const getExpectedQuantityOnMintXSnx = async (
  tradeWithEth,
  amount,
  provider
) => {
  const inputAmount = parseEther(amount)
  const {
    kyberProxyContract,
    network,
    tradeAccountingContract,
    xsnxContract,
  } = await helper_1.getXSnxContracts(provider)
  const { chainId } = network
  const [snxBalanceBefore, totalSupply, { mintFee }] = await Promise.all([
    tradeAccountingContract.getSnxBalance(),
    xsnxContract.totalSupply(),
    xsnxContract.feeDivisors(),
  ])
  const MINT_FEE = utils_2.parseFees(mintFee)
  if (tradeWithEth) {
    const ethContributed = inputAmount.mul(MINT_FEE).div(constants_1.DEC_18)
    const expectedRate = await utils_2.getExpectedRate(
      kyberProxyContract,
      abis_1.ADDRESSES[abis_1.ETH],
      abis_1.ADDRESSES[abis_1.SNX][chainId],
      ethContributed
    )
    const [setHoldingsWei, ethBal] = await Promise.all([
      tradeAccountingContract.getSetHoldingsValueInWei(),
      tradeAccountingContract.getEthBalance(),
    ])
    const nonSnxAssetValue = setHoldingsWei.add(ethBal)
    const weiPerOneSnx = constants_1.DEC_18.mul(constants_1.DEC_18).div(
      expectedRate
    )
    const pricePerToken = await tradeAccountingContract.calculateIssueTokenPrice(
      weiPerOneSnx.toString(),
      snxBalanceBefore,
      nonSnxAssetValue,
      totalSupply
    )
    const expectedTokenReturn = ethContributed
      .mul(constants_1.DEC_18)
      .div(pricePerToken)
    return formatEther(expectedTokenReturn)
  } else {
    const expQuantity = await tradeAccountingContract.calculateTokensToMintWithSnx(
      snxBalanceBefore,
      inputAmount,
      totalSupply
    )
    return formatEther(expQuantity)
  }
}
exports.getExpectedQuantityOnMintXSnx = getExpectedQuantityOnMintXSnx
const mintXSnx = async (tradeWithEth, amount, provider) => {
  const {
    kyberProxyContract,
    tokenContract,
    xsnxContract,
  } = await helper_1.getXSnxContracts(provider)
  if (tradeWithEth) {
    const minRate = await utils_2.getExpectedRate(
      kyberProxyContract,
      abis_1.ADDRESSES[abis_1.ETH],
      tokenContract.address,
      amount,
      true
    )
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(
      await xsnxContract.estimateGas.mint(minRate.toString(), {
        value: amount,
      }),
      constants_1.GAS_LIMIT_PERCENTAGE_ETH
    )
    return xsnxContract.mint(minRate.toString(), {
      gasLimit,
      value: amount,
    })
  } else {
    const address = await utils_2.getSignerAddress(provider)
    const approvedAmount = await _getApprovedAmount(
      tokenContract,
      xsnxContract,
      address
    )
    if (approvedAmount.lt(amount)) {
      return Promise.reject(
        new Error('Please approve the tokens before minting')
      )
    }
    // Estimate `gasLimit`
    const gasLimit = utils_1.getPercentage(
      await xsnxContract.estimateGas.mintWithSnx(amount),
      constants_1.GAS_LIMIT_PERCENTAGE_DEFAULT
    )
    return xsnxContract.mintWithSnx(amount, { gasLimit })
  }
}
exports.mintXSnx = mintXSnx
const _getApprovedAmount = async (tokenContract, xsnxContract, address) => {
  return tokenContract.allowance(address, xsnxContract.address)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3hzbngvbWludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1Q0FBa0Q7QUFDbEQsbUNBQTBDO0FBRTFDLCtDQUl3QjtBQUV4Qix1Q0FBMkM7QUFDM0Msb0NBQXVFO0FBRXZFLHFDQUEyQztBQUUzQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUE7QUFFekMsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixNQUFpQixFQUNqQixRQUFzQixFQUNRLEVBQUU7SUFDaEMsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLHlCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRXhFLHNCQUFzQjtJQUN0QixNQUFNLFFBQVEsR0FBRyxxQkFBYSxDQUM1QixNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQ3JFLHdDQUE0QixDQUM3QixDQUFBO0lBRUQsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUMxRSxDQUFDLENBQUE7QUFiWSxRQUFBLFdBQVcsZUFhdkI7QUFFTSxNQUFNLDZCQUE2QixHQUFHLEtBQUssRUFDaEQsWUFBcUIsRUFDckIsTUFBYyxFQUNkLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEMsTUFBTSxFQUNKLGtCQUFrQixFQUNsQixPQUFPLEVBQ1AsdUJBQXVCLEVBQ3ZCLFlBQVksR0FDYixHQUFHLE1BQU0seUJBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFH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
