import { USDC, USDT } from '@xtoken/abis'
import { ethers } from 'ethers'
import { DEC_18, GAS_LIMIT_PERCENTAGE_DEFAULT } from '../../constants'
import { getPercentage } from '../../utils'
import { getLPTokenSymbol, getSignerAddress, parseFees } from '../utils'
import { getXU3LPContracts } from './helper'
const { formatEther, parseEther } = ethers.utils
export const approveXU3LP = async (symbol, amount, inputAsset, provider) => {
  const {
    token0Contract,
    token1Contract,
    xu3lpContract,
  } = await getXU3LPContracts(symbol, provider)
  const tokenContract = inputAsset === 0 ? token0Contract : token1Contract
  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await tokenContract.estimateGas.approve(xu3lpContract.address, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return tokenContract.approve(xu3lpContract.address, amount, { gasLimit })
}
export const getExpectedQuantityOnMintXU3LP = async (
  symbol,
  inputAsset,
  amount,
  provider
) => {
  const { xu3lpContract } = await getXU3LPContracts(symbol, provider)
  const [nav, totalSupply, { mintFee }] = await Promise.all([
    xu3lpContract.getNav(),
    xu3lpContract.totalSupply(),
    xu3lpContract.feeDivisors(),
  ])
  const getAmountInAssetTerms = inputAsset
    ? xu3lpContract.getAmountInAsset0Terms
    : xu3lpContract.getAmountInAsset1Terms
  const MINT_FEE = parseFees(mintFee)
  const inputAmount = parseEther(amount).mul(totalSupply).div(nav)
  const expectedQty = await getAmountInAssetTerms(inputAmount)
  return formatEther(expectedQty.mul(MINT_FEE).div(DEC_18))
}
export const mintXU3LP = async (symbol, inputAsset, amount, provider) => {
  const {
    token0Contract,
    token1Contract,
    xu3lpContract,
  } = await getXU3LPContracts(symbol, provider)
  const assets = getLPTokenSymbol(symbol)
  const tokenContract = inputAsset === 0 ? token0Contract : token1Contract
  const address = await getSignerAddress(provider)
  const approvedAmount = await _getApprovedAmount(
    tokenContract,
    xu3lpContract,
    address
  )
  // Parse 18 decimals `amount` to 6 decimals
  if ([USDC, USDT].includes(assets[inputAsset])) {
    amount = amount.div('1000000000000')
  }
  if (approvedAmount.lt(amount)) {
    return Promise.reject(new Error('Please approve the tokens before minting'))
  }
  // Estimate `gasLimit`
  const gasLimit = getPercentage(
    await xu3lpContract.estimateGas.mintWithToken(inputAsset, amount),
    GAS_LIMIT_PERCENTAGE_DEFAULT
  )
  return xu3lpContract.mintWithToken(inputAsset, amount, {
    gasLimit,
  })
}
const _getApprovedAmount = async (tokenContract, xu3lpContract, address) => {
  return tokenContract.allowance(address, xu3lpContract.address)
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL3h1M2xwL21pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDekMsT0FBTyxFQUFnQixNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBR3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFNUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO0FBRWhELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQy9CLE1BQXVCLEVBQ3ZCLE1BQWlCLEVBQ2pCLFVBQXdCLEVBQ3hCLFFBQXNCLEVBQ1EsRUFBRTtJQUNoQyxNQUFNLEVBQ0osY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEdBQ2QsR0FBRyxNQUFNLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUU3QyxNQUFNLGFBQWEsR0FBRyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQTtJQUV4RSxzQkFBc0I7SUFDdEIsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUM1QixNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQ3RFLDRCQUE0QixDQUM3QixDQUFBO0lBRUQsT0FBTyxhQUFhLENB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
