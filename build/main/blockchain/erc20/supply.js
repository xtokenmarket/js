"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenSupply = void 0;
const abis_1 = require("@xtoken/abis");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const getTokenSupply = async (symbol, provider) => {
    const { chainId } = await provider.getNetwork();
    const tokenAddress = abis_1.ADDRESSES[symbol][chainId];
    const contract = new ethers_1.ethers.Contract(tokenAddress, abis_1.Abi.ERC20, provider);
    const [totalSupply, decimals] = await Promise.all([
        contract.totalSupply(),
        contract.decimals(),
    ]);
    return utils_1.formatUnits(totalSupply, decimals);
};
exports.getTokenSupply = getTokenSupply;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwcGx5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXJjMjAvc3VwcGx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUEwRDtBQUMxRCxtQ0FBK0I7QUFDL0IsNENBQThDO0FBS3ZDLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFDakMsTUFBMEUsRUFDMUUsUUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUMvQyxNQUFNLFlBQVksR0FBRyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQy9DLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FDbEMsWUFBWSxFQUNaLFVBQUcsQ0FBQyxLQUFLLEVBQ1QsUUFBUSxDQUNBLENBQUE7SUFDVixNQUFNLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNoRCxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3RCLFFBQVEsQ0FBQyxRQUFRLEVBQUU7S0FDcEIsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxtQkFBVyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQUE7QUFoQlksUUFBQSxjQUFjLGtCQWdCMUIifQ==