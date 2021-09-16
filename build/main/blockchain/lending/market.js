'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.withdrawCollateral = exports.supplyCollateral = exports.getLendingMarkets = exports.getCollateral = exports.getBorrowingLimit = void 0
const units_1 = require('@ethersproject/units')
const abis_1 = require('@xtoken/abis')
const utils_1 = require('ethers/lib/utils')
const constants_1 = require('../../constants')
const erc20_1 = require('../erc20')
const utils_2 = require('../utils')
const xaave_1 = require('../xaave')
const xinch_1 = require('../xinch')
const xknc_1 = require('../xknc')
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
  const kncContract = utils_2.getContract(abis_1.KNC, provider, network)
  const kyberProxyContract = utils_2.getContract(
    abis_1.KYBER_PROXY,
    provider,
    network
  )
  // xAAVE
  const xaaveaContract = utils_2.getContract(abis_1.X_AAVE_A, provider, network)
  const xaavebContract = utils_2.getContract(abis_1.X_AAVE_B, provider, network)
  // xINCH
  const xinchaContract = utils_2.getContract(abis_1.X_INCH_A, provider, network)
  const xinchbContract = utils_2.getContract(abis_1.X_INCH_B, provider, network)
  // xKNC
  const xkncaContract = utils_2.getContract(abis_1.X_KNC_A, provider, network)
  const xkncbContract = utils_2.getContract(abis_1.X_KNC_B, provider, network)
  try {
    const [
      xaaveaPrices,
      xaavebPrices,
      xinchaPrices,
      xinchbPrices,
      xkncaPrices,
      xkncbPrices,
    ] = await Promise.all([
      xaave_1.getXAavePrices(xaaveaContract, kyberProxyContract, chainId),
      xaave_1.getXAavePrices(xaavebContract, kyberProxyContract, chainId),
      xinch_1.getXInchPrices(xinchaContract, kyberProxyContract, chainId),
      xinch_1.getXInchPrices(xinchbContract, kyberProxyContract, chainId),
      xknc_1.getXKncPrices(xkncaContract, kncContract, kyberProxyContract),
      xknc_1.getXKncPrices(xkncbContract, kncContract, kyberProxyContract),
    ])
    const [
      xaaveaLendingCollateral,
      xaavebLendingCollateral,
      xinchaLendingCollateral,
      xinchbLendingCollateral,
      xkncaLendingCollateral,
      xkncbLendingCollateral,
    ] = await Promise.all([
      erc20_1.getTokenBalance(
        abis_1.X_AAVE_A,
        abis_1.ADDRESSES[abis_1.LENDING_X_AAVE_A_MARKET][chainId],
        provider
      ),
      erc20_1.getTokenBalance(
        abis_1.X_AAVE_B,
        abis_1.ADDRESSES[abis_1.LENDING_X_AAVE_B_MARKET][chainId],
        provider
      ),
      erc20_1.getTokenBalance(
        abis_1.X_INCH_A,
        abis_1.ADDRESSES[abis_1.LENDING_X_INCH_A_MARKET][chainId],
        provider
      ),
      erc20_1.getTokenBalance(
        abis_1.X_INCH_B,
        abis_1.ADDRESSES[abis_1.LENDING_X_INCH_B_MARKET][chainId],
        provider
      ),
      erc20_1.getTokenBalance(
        abis_1.X_KNC_A,
        abis_1.ADDRESSES[abis_1.LENDING_X_KNC_A_MARKET][chainId],
        provider
      ),
      erc20_1.getTokenBalance(
        abis_1.X_KNC_B,
        abis_1.ADDRESSES[abis_1.LENDING_X_KNC_B_MARKET][chainId],
        provider
      ),
    ])
    return [
      {
        name: abis_1.LENDING_X_AAVE_A_MARKET,
        xAsset: abis_1.X_AAVE_A,
        collateral: xaaveaLendingCollateral,
        value: units_1.formatEther(
          utils_1
            .parseEther(xaaveaLendingCollateral)
            .mul(utils_1.parseEther(xaaveaPrices.priceUsd.toString()))
            .div(constants_1.DEC_18)
        ),
      },
      {
        name: abis_1.LENDING_X_AAVE_B_MARKET,
        xAsset: abis_1.X_AAVE_B,
        collateral: xaavebLendingCollateral,
        value: units_1.formatEther(
          utils_1
            .parseEther(xaavebLendingCollateral)
            .mul(utils_1.parseEther(xaavebPrices.priceUsd.toString()))
            .div(constants_1.DEC_18)
        ),
      },
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
      {
        name: abis_1.LENDING_X_INCH_B_MARKET,
        xAsset: abis_1.X_INCH_B,
        collateral: xinchbLendingCollateral,
        value: units_1.formatEther(
          utils_1
            .parseEther(xinchbLendingCollateral)
            .mul(utils_1.parseEther(xinchbPrices.priceUsd.toString()))
            .div(constants_1.DEC_18)
        ),
      },
      {
        name: abis_1.LENDING_X_KNC_A_MARKET,
        xAsset: abis_1.X_KNC_A,
        collateral: xkncaLendingCollateral,
        value: units_1.formatEther(
          utils_1
            .parseEther(xkncaLendingCollateral)
            .mul(utils_1.parseEther(xkncaPrices.priceUsd.toString()))
            .div(constants_1.DEC_18)
        ),
      },
      {
        name: abis_1.LENDING_X_KNC_B_MARKET,
        xAsset: abis_1.X_KNC_B,
        collateral: xkncbLendingCollateral,
        value: units_1.formatEther(
          utils_1
            .parseEther(xkncbLendingCollateral)
            .mul(utils_1.parseEther(xkncbPrices.priceUsd.toString()))
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
    case abis_1.LENDING_X_AAVE_A_MARKET:
      xTokenContract = utils_2.getContract(abis_1.X_AAVE_A, provider, network)
      break
    case abis_1.LENDING_X_AAVE_B_MARKET:
      xTokenContract = utils_2.getContract(abis_1.X_AAVE_B, provider, network)
      break
    case abis_1.LENDING_X_INCH_A_MARKET:
      xTokenContract = utils_2.getContract(abis_1.X_INCH_A, provider, network)
      break
    case abis_1.LENDING_X_INCH_B_MARKET:
      xTokenContract = utils_2.getContract(abis_1.X_INCH_B, provider, network)
      break
    case abis_1.LENDING_X_KNC_A_MARKET:
      xTokenContract = utils_2.getContract(abis_1.X_KNC_A, provider, network)
      break
    case abis_1.LENDING_X_KNC_B_MARKET:
      xTokenContract = utils_2.getContract(abis_1.X_KNC_B, provider, network)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vbGVuZGluZy9tYXJrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQWtEO0FBQ2xELHVDQWlCcUI7QUFFckIsNENBQTZDO0FBRTdDLCtDQUFnRDtBQUdoRCxvQ0FBMEM7QUFDMUMsb0NBQXdEO0FBQ3hELG9DQUF5QztBQUN6QyxvQ0FBeUM7QUFDekMsa0NBQXVDO0FBRXZDLHFDQUE2QztBQUU3Qzs7Ozs7O0dBTUc7QUFDSSxNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsVUFBMEIsRUFDMUIsUUFBc0IsRUFDdEIsT0FBZ0IsRUFDaEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixPQUFPLEdBQUcsTUFBTSx3QkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUMzQztJQUNELE1BQU0sY0FBYyxHQUFHLE1BQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuRSxPQUFPLG1CQUFXLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBWlksUUFBQSxpQkFBaUIscUJBWTdCO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxVQUEwQixFQUMxQixRQUFzQixFQUN0QixPQUFlLEVBQ2YsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFP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
