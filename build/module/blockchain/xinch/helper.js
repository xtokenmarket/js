import { INCH_LIQUIDITY_PROTOCOL, KYBER_PROXY } from '@xtoken/abis'
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
  const kyberProxyContract = getContract(KYBER_PROXY, provider, network)
  const tokenContract = getContract(getTokenSymbol(symbol), provider, network)
  if (
    !xinchContract ||
    !inchLiquidityProtocolContract ||
    !kyberProxyContract ||
    !tokenContract
  ) {
    return Promise.reject(new Error('Unknown error'))
  }
  return {
    inchLiquidityProtocolContract,
    kyberProxyContract,
    network,
    tokenContract,
    xinchContract,
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGluY2gvaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUlsQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV0RCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxLQUFLLEVBQ3RDLDZCQUFvRCxFQUNwRCxVQUFrQixFQUNsQixXQUFtQixFQUNuQixNQUFpQixFQUNqQixTQUFTLEdBQUcsS0FBSyxFQUNqQixFQUFFO0lBQ0YsTUFBTSxZQUFZLEdBQUcsTUFBTSw2QkFBNkIsQ0FBQyxTQUFTLENBQ2hFLFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxDQUNQLENBQUE7SUFDRCxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFBO0FBQ3ZELENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsTUFBcUIsRUFDckIsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBRTNDLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBVSxDQUFBO0lBQ3JFLE1BQU0sNkJBQTZCLEdBQUcsV0FBVyxDQUMvQyx1QkFBdUIsRUFDdkIsUUFBUSxFQUNSLE9BQU8sQ0FDaUIsQ0FBQTtJQUMxQixNQUFNLGtCQUFrQixHQUFHLFdBQVcsQ0FDcEMsV0FBVyxFQUNYLFFBQVEsRUFDUixPQUFPLENBQ00sQ0FBQTtJQUNmLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FDL0IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUN0QixRQUFRLEVBQ1IsT0FBTyxDQUNJLENBQUE7SUFFYixJQUNFLENBQUMsYUFBYTtRQUNkLENBQUMsNkJBQTZCO1FBQzlCLENBQUMsa0JBQWtCO1FBQ25CLENBQUMsYUFBYSxFQUNkO1FBQ0EsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7S0FDbEQ7SUFFRCxPQUFPO1FBQ0wsNkJBQTZCO1FBQzdCLGtCQUFrQjtRQUNsQixPQUFPO1FBQ1AsYUFBYTtRQUNiLGFBQWE7S0FDZCxDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=
