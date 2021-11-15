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
      // xinchaLendingCollateral,
      // xinchbPrices,
      // xkncaPrices,
      // xkncbPrices,
      wbtcLendingCollateral,
      wethLendingCollateral,
    ] = await Promise.all([
      // getXAavePrices(xaaveaContract, kyberProxyContract, chainId),
      // getXAavePrices(xaavebContract, kyberProxyContract, chainId),
      // getCollateral(LENDING_X_INCH_A_MARKET, address, provider),
      // getXInchPrices(xinchbContract, kyberProxyContract, chainId),
      // getXKncPrices(xkncaContract, kncContract, kyberProxyContract),
      // getXKncPrices(xkncbContract, kncContract, kyberProxyContract),
      exports.getCollateral(abis_1.LENDING_WBTC_MARKET, address, provider),
      exports.getCollateral(abis_1.LENDING_WETH_MARKET, address, provider),
    ])
    const [
      // xaaveaLendingCollateral,
      // xaavebLendingCollateral,
      // xinchaBorrowingLimit,
      // xinchbLendingCollateral,
      // xkncaLendingCollateral,
      // xkncbLendingCollateral,
      wbtcBorrowingLimit,
      wethBorrowingLimit,
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
      // getBorrowingLimit(LENDING_X_INCH_A_MARKET, address, provider),
      /*getTokenBalance(
              X_INCH_B,
              ADDRESSES[LENDING_X_INCH_B_MARKET][chainId],
              provider
            ),
            getTokenBalance(
              X_KNC_A,
              ADDRESSES[LENDING_X_KNC_A_MARKET][chainId],
              provider
            ),
            getTokenBalance(
              X_KNC_B,
              ADDRESSES[LENDING_X_KNC_B_MARKET][chainId],
              provider
            ),*/
      exports.getBorrowingLimit(abis_1.LENDING_WBTC_MARKET, address, provider),
      exports.getBorrowingLimit(abis_1.LENDING_WETH_MARKET, address, provider),
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
            },
            {
              name: LENDING_X_INCH_A_MARKET,
              xAsset: X_INCH_A,
              collateral: xinchaLendingCollateral,
              value: xinchaBorrowingLimit,
            },
            {
              name: LENDING_X_INCH_B_MARKET,
              xAsset: X_INCH_B,
              collateral: xinchbLendingCollateral,
              value: formatEther(
                parseEther(xinchbLendingCollateral)
                  .mul(parseEther(xinchbPrices.priceUsd.toString()))
                  .div(DEC_18)
              ),
            },
            {
              name: LENDING_X_KNC_A_MARKET,
              xAsset: X_KNC_A,
              collateral: xkncaLendingCollateral,
              value: formatEther(
                parseEther(xkncaLendingCollateral)
                  .mul(parseEther(xkncaPrices.priceUsd.toString()))
                  .div(DEC_18)
              ),
            },
            {
              name: LENDING_X_KNC_B_MARKET,
              xAsset: X_KNC_B,
              collateral: xkncbLendingCollateral,
              value: formatEther(
                parseEther(xkncbLendingCollateral)
                  .mul(parseEther(xkncbPrices.priceUsd.toString()))
                  .div(DEC_18)
              ),
            },*/
      {
        asset: abis_1.WBTC,
        name: abis_1.LENDING_WBTC_MARKET,
        collateral: wbtcLendingCollateral,
        value: wbtcBorrowingLimit,
      },
      {
        asset: abis_1.WETH,
        name: abis_1.LENDING_WETH_MARKET,
        collateral: wethLendingCollateral,
        value: wethBorrowingLimit,
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
  let tokenContract
  switch (marketName) {
    /*case LENDING_X_AAVE_A_MARKET:
          tokenContract = getContract(X_AAVE_A, provider, network)
          break
        case LENDING_X_AAVE_B_MARKET:
          tokenContract = getContract(X_AAVE_B, provider, network)
          break
        case LENDING_X_INCH_A_MARKET:
          tokenContract = getContract(X_INCH_A, provider, network)
          break
        case LENDING_X_INCH_B_MARKET:
          tokenContract = getContract(X_INCH_B, provider, network)
          break
        case LENDING_X_KNC_A_MARKET:
          tokenContract = getContract(X_KNC_A, provider, network)
          break
        case LENDING_X_KNC_B_MARKET:
          tokenContract = getContract(X_KNC_B, provider, network)*/
    case abis_1.LENDING_WBTC_MARKET:
      tokenContract = utils_1.getContract(abis_1.WBTC, provider, network)
      break
    case abis_1.LENDING_WETH_MARKET:
      tokenContract = utils_1.getContract(abis_1.WETH, provider, network)
      break
  }
  if (!tokenContract) {
    return Promise.reject(
      new Error(constants_1.Errors.CONTRACT_INITIALIZATION_FAILED)
    )
  }
  return tokenContract.allowance(
    address,
    abis_1.ADDRESSES[marketName][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQWtEO0FBQ2xELHVDQWtCcUI7QUFHckIsK0NBQXdDO0FBRXhDLG9DQUF3RDtBQUV4RCxxQ0FBNkM7QUFFN0M7Ozs7OztHQU1HO0FBQ0ksTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLFVBQTBCLEVBQzFCLE9BQWUsRUFDZixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxlQUFlLEdBQUcsTUFBTSwyQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbEQsTUFBTSxjQUFjLEdBQUcsTUFBTSxjQUFjLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ25FLE9BQU8sbUJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUE7QUFUWSxRQUFBLGlCQUFpQixxQkFTN0I7QUFFRDs7Ozs7O0dBTUc7QUFDSSxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLFVBQTBCLEVBQzFCLE9BQWUsRUFDZixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxlQUFlLEdBQUcsTUFBTSwyQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxRCxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzNELE9BQU8sbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNoQyxDQUFDLENBQUE7QUFUWSxRQUFBLGFBQWEsaUJBU3pCO0FBRU0sTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLE9BQWUsRUFDZixRQUFzQixFQUNrQixFQUFF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
