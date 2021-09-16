'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getTokenSupply = void 0
const abis_1 = require('@xtoken/abis')
const ethers_1 = require('ethers')
const utils_1 = require('ethers/lib/utils')
const getTokenSupply = async (symbol, provider) => {
  const { chainId } = await provider.getNetwork()
  const tokenAddress = abis_1.ADDRESSES[symbol][chainId]
  const contract = new ethers_1.ethers.Contract(
    tokenAddress,
    abis_1.Abi.ERC20,
    provider
  )
  const totalSupply = await contract.totalSupply()
  return utils_1.formatEther(totalSupply)
}
exports.getTokenSupply = getTokenSupply
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwcGx5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXJjMjAvc3VwcGx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUEwRDtBQUMxRCxtQ0FBK0I7QUFDL0IsNENBQThDO0FBS3ZDLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFDakMsTUFBMEUsRUFDMUUsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMvQyxNQUFNLFlBQVksR0FBRyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQy9DLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FDbEMsWUFBWSxFQUNaLFVBQUcsQ0FBQyxLQUFLLEVBQ1QsUUFBUSxDQUNBLENBQUE7SUFDVixNQUFNLFdBQVcsR0FBRyxNQUFNLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNoRCxPQUFPLG1CQUFXLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFBO0FBYlksUUFBQSxjQUFjLGtCQWExQiJ9
