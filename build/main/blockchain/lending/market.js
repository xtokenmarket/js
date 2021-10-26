'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.withdrawCollateral = exports.supplyCollateral = exports.getLendingMarkets = exports.getCollateral = exports.getBorrowingLimit = void 0
const units_1 = require('@ethersproject/units')
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const erc20_1 = require('../erc20')
const utils_2 = require('../utils')
// import { getXAavePrices } from '../xaave'
const xinch_1 = require('../xinch')
// import { getXKncPrices } from '../xknc'
const helper_1 = require('./helper')
/**
 * Get borrowing limit for an address in a Lending Market
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
const getBorrowingLimit = async (marketName, provider, address) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  if (!address) {
    address = await utils_2.getSignerAddress(provider)
  }
  const borrowingLimit = await marketContract.borrowingLimit(address)
  return units_1.formatEther(borrowingLimit)
}
exports.getBorrowingLimit = getBorrowingLimit
/**
 * Get xAsset collateral deposited in a Lending Market for an address
 * @param marketName name of the market
 * @param provider
 * @param address optional address - checks current signer if not provided
 * @returns
 */
const getCollateral = async (marketName, provider, address) => {
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const collateral = await marketContract.collateral(address)
  return units_1.formatEther(collateral)
}
exports.getCollateral = getCollateral
// TODO: Refactor to leverage `getXAssetPrices()` utils method
const getLendingMarkets = async (provider) => {
  const network = await provider.getNetwork()
  const { chainId } = network
  // const kncContract = getContract(KNC, provider, network) as Contract
  const kyberProxyContract = utils_2.getContract(
    abis_1.KYBER_PROXY,
    provider,
    network
  )
  // xAAVE
  // const xaaveaContract = getContract(X_AAVE_A, provider, network) as XAAVE
  // const xaavebContract = getContract(X_AAVE_B, provider, network) as XAAVE
  // xINCH
  const xinchaContract = utils_2.getContract(abis_1.X_INCH_A, provider, network)
  // const xinchbContract = getContract(X_INCH_B, provider, network) as XINCH
  // xKNC
  // const xkncaContract = getContract(X_KNC_A, provider, network) as XKNC
  // const xkncbContract = getContract(X_KNC_B, provider, network) as XKNC
  try {
    const [
      // xaaveaPrices,
      // xaavebPrices,
      xinchaPrices,
    ] = await Promise.all([
      // getXAavePrices(xaaveaContract, kyberProxyContract, chainId),
      // getXAavePrices(xaavebContract, kyberProxyContract, chainId),
      xinch_1.getXInchPrices(xinchaContract, kyberProxyContract, chainId),
    ])
    const [
      // xaaveaLendingCollateral,
      // xaavebLendingCollateral,
      xinchaLendingCollateral,
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
      erc20_1.getTokenBalance(
        abis_1.X_INCH_A,
        abis_1.ADDRESSES[abis_1.LENDING_X_INCH_A_MARKET][chainId],
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
        value: units_1.formatEther(
          utils_1
            .parseEther(xinchaLendingCollateral)
            .mul(utils_1.parseEther(xinchaPrices.priceUsd.toString()))
            .div(constants_1.DEC_18)
        ),
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
  const marketContracts = await helper_1.getMarketContracts(provider)
  const marketContract = marketContracts[marketName]
  const address = await utils_2.getSignerAddress(provider)
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
      xTokenContract = utils_2.getContract(abis_1.X_INCH_A, provider, network)
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
    abis_1.ADDRESSES[abis_1.LENDING_LIQUIDITY_POOL][network.chainId]
  )
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQWtEO0FBQ2xELHVDQWlCcUI7QUFFckIsNENBQTZDO0FBRTdDLCtDQUFnRDtBQUdoRCxvQ0FBMEM7QUFDMUMsb0NBQXdEO0FBQ3hELDRDQUE0QztBQUM1QyxvQ0FBeUM7QUFDekMsMENBQTBDO0FBRTFDLHFDQUE2QztBQUU3Qzs7Ozs7O0dBTUc7QUFDSSxNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsVUFBMEIsRUFDMUIsUUFBc0IsRUFDdEIsT0FBZ0IsRUFDaEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixPQUFPLEdBQUcsTUFBTSx3QkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUMzQztJQUNELE1BQU0sY0FBYyxHQUFHLE1BQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuRSxPQUFPLG1CQUFXLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBWlksUUFBQSxpQkFBaUIscUJBWTdCO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxVQUEwQixFQUMxQixRQUFzQixFQUN0QixPQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFP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
