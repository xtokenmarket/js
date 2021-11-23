import { INCH_LIQUIDITY_PROTOCOL } from '@xtoken/abis'
import { BigNumber } from 'ethers'
import { getContract, getTokenSymbol } from '../utils'
export const getExpectedRateInch = async (
  inchLiquidityProtocolContract,
  inputAsset,
  outputAsset,
  amount,
  isMinRate = false
) => {
  const expectedRate = await inchLiquidityProtocolContract.getReturn(
    inputAsset,
    outputAsset,
    amount
  )
  return isMinRate ? BigNumber.from('0') : expectedRate
}
export const getXInchContracts = async (symbol, provider) => {
  const network = await provider.getNetwork()
  const xinchContract = getContract(symbol, provider, network)
  const inchLiquidityProtocolContract = getContract(
    INCH_LIQUIDITY_PROTOCOL,
    provider,
    network
  )
  const tokenContract = getContract(getTokenSymbol(symbol), provider, network)
  if (
    !xinchContract ||
    // !inchLiquidityProtocolContract ||
    !tokenContract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    inchLiquidityProtocolContract,
    network,
    tokenContract,
    xinchContract,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBSWxDLE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXRELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLEtBQUssRUFDdEMsNkJBQW9ELEVBQ3BELFVBQWtCLEVBQ2xCLFdBQW1CLEVBQ25CLE1BQWlCLEVBQ2pCLFNBQVMsR0FBRyxLQUFLLEVBQ2pCLEVBQUU7SUFDRixNQUFNLFlBQVksR0FBRyxNQUFNLDZCQUE2QixDQUFDLFNBQVMsQ0FDaEUsVUFBVSxFQUNWLFdBQVcsRUFDWCxNQUFNLENBQ1AsQ0FBQTtJQUNELE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUE7QUFDdkQsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxFQUNwQyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFVLENBQUE7SUFDckUsTUFBTSw2QkFBNkIsR0FBRyxXQUFXLENBQy9DLHVCQUF1QixFQUN2QixRQUFRLEVBQ1IsT0FBTyxDQUNpQixDQUFBO0lBQzFCLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FDL0IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUN0QixRQUFRLEVBQ1IsT0FBTyxDQUNJLENBQUE7SUFFYixJQUNFLENBQUMsYUFBYTtRQUNkLG9DQUFvQztRQUNwQyxDQUFDLGFBQWEsRUFDZDtRQUNBLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0tBQ2xEO0lBRUQsT0FBTztRQUNMLDZCQUE2QjtRQUM3QixPQUFPO1FBQ1AsYUFBYTtRQUNiLGFBQWE7S0FDZCxDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=
