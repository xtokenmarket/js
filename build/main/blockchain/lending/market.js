'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.withdrawCollateral = exports.supplyCollateral = exports.getLendingMarkets = exports.getCollateral = exports.getBorrowingLimit = void 0
const units_1 = require('@ethersproject/units')
const abis_1 = require('@xtoken/abis')
const constants_1 = require('../../constants')
const utils_1 = require('../utils')
const helper_1 = require('./helper')
/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName Name of the market
 * @param address
 * @param provider
 * @returns
 */
const getBorrowingLimit = async (marketName, address, provider) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const borrowingLimit = await marketContract.borrowingLimit(address)
  return units_1.formatEther(borrowingLimit)
}
exports.getBorrowingLimit = getBorrowingLimit
/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName Name of the market
 * @param address
 * @param provider
 * @returns
 */
const getCollateral = async (marketName, address, provider) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const collateral = await marketContract.collateral(address)
  return units_1.formatEther(collateral)
}
exports.getCollateral = getCollateral
const getLendingMarkets = async (address, provider) => {
  try {
    const [
      // xaaveaPrices,
      // xaavebPrices,
      xinchaLendingCollateral,
    ] = await Promise.all([
      // getXAavePrices(xaaveaContract, kyberProxyContract, chainId),
      // getXAavePrices(xaavebContract, kyberProxyContract, chainId),
      exports.getCollateral(abis_1.LENDING_X_INCH_A_MARKET, address, provider),
    ])
    const [
      // xaaveaLendingCollateral,
      // xaavebLendingCollateral,
      xinchaBorrowingLimit,
    ] = await Promise.all([
      /* getTokenBalance(
              X_AAVE_A,
              ADDRESSES[LENDING_X_AAVE_A_MARKET][chainId],
              provider
            ),
            getTokenBalance(
              X_AAVE_B,
              ADDRESSES[LENDING_X_AAVE_B_MARKET][chainId],
              provider
            ),*/
      exports.getBorrowingLimit(
        abis_1.LENDING_X_INCH_A_MARKET,
        address,
        provider
      ),
    ])
    return [
      /*{
              name: LENDING_X_AAVE_A_MARKET,
              xAsset: X_AAVE_A,
              collateral: xaaveaLendingCollateral,
              value: formatEther(
                parseEther(xaaveaLendingCollateral)
                  .mul(parseEther(xaaveaPrices.priceUsd.toString()))
                  .div(DEC_18)
              ),
            },
            {
              name: LENDING_X_AAVE_B_MARKET,
              xAsset: X_AAVE_B,
              collateral: xaavebLendingCollateral,
              value: formatEther(
                parseEther(xaavebLendingCollateral)
                  .mul(parseEther(xaavebPrices.priceUsd.toString()))
                  .div(DEC_18)
              ),
            },*/
      {
        name: abis_1.LENDING_X_INCH_A_MARKET,
        xAsset: abis_1.X_INCH_A,
        collateral: xinchaLendingCollateral,
        value: xinchaBorrowingLimit,
      },
    ]
  } catch (e) {
    console.warn('Error while fetching lending markets', e)
    return Promise.reject(new Error('Error while fetching lending markets'))
  }
}
exports.getLendingMarkets = getLendingMarkets
/**
 * Add xAsset collateral to a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
const supplyCollateral = async (marketName, amount, provider) => {
  const [address, marketContracts] = await Promise.all([
    utils_1.getSignerAddress(provider),
    helper_1.getMarketContracts(provider),
  ])
  const marketContract = marketContracts[marketName]
  const approvedAmount = await _getApprovedAmount(marketName, address, provider)
  if (approvedAmount.lt(amount)) {
    return Promise.reject(
      new Error('Please approve the tokens before adding collateral')
    )
  }
  return marketContract.collateralize(amount)
}
exports.supplyCollateral = supplyCollateral
/**
 * Withdraw xAsset collateral from a Lending Market
 * @param marketName name of the market
 * @param amount amount without decimals
 * @param provider
 * @returns
 */
const withdrawCollateral = async (marketName, amount, provider) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  return marketContract.withdraw(amount)
}
exports.withdrawCollateral = withdrawCollateral
const _getApprovedAmount = async (marketName, address, provider) => {
  const network = await provider.getNetwork()
  let xTokenContract
  switch (marketName) {
    /*case LENDING_X_AAVE_A_MARKET:
          xTokenContract = getContract(X_AAVE_A, provider, network)
          break
        case LENDING_X_AAVE_B_MARKET:
          xTokenContract = getContract(X_AAVE_B, provider, network)
          break*/
    case abis_1.LENDING_X_INCH_A_MARKET:
      xTokenContract = utils_1.getContract(abis_1.X_INCH_A, provider, network)
      break
    /*case LENDING_X_INCH_B_MARKET:
          xTokenContract = getContract(X_INCH_B, provider, network)
          break
        case LENDING_X_KNC_A_MARKET:
          xTokenContract = getContract(X_KNC_A, provider, network)
          break
        case LENDING_X_KNC_B_MARKET:
          xTokenContract = getContract(X_KNC_B, provider, network)*/
  }
  if (!xTokenContract) {
    return Promise.reject(
      new Error(constants_1.Errors.CONTRACT_INITIALIZATION_FAILED)
    )
  }
  return xTokenContract.allowance(
    address,
    abis_1.ADDRESSES[marketName][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQWtEO0FBQ2xELHVDQWNxQjtBQUdyQiwrQ0FBd0M7QUFFeEMsb0NBQXdEO0FBRXhELHFDQUE2QztBQUU3Qzs7Ozs7O0dBTUc7QUFDSSxNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsVUFBMEIsRUFDMUIsT0FBZSxFQUNmLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLGVBQWUsR0FBRyxNQUFNLDJCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsRCxNQUFNLGNBQWMsR0FBRyxNQUFNLGNBQWMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbkUsT0FBTyxtQkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBQ3BDLENBQUMsQ0FBQTtBQVRZLFFBQUEsaUJBQWlCLHFCQVM3QjtBQUVEOzs7Ozs7R0FNRztBQUNJLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsVUFBMEIsRUFDMUIsT0FBZSxFQUNmLFFBQXNCLEVBQ3RCLEVBQUU7SUFDRixNQUFNLGVBQWUsR0FBRyxNQUFNLDJCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFELE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsRCxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDM0QsT0FBTyxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLENBQUMsQ0FBQTtBQVRZLFFBQUEsYUFBYSxpQkFTekI7QUFFTSxNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsT0FBZSxFQUNmLFFBQXNCLEVBQ2tCLEVBQUU7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
