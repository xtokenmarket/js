"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenAllowance = void 0;
const utils_1 = require("ethers/lib/utils");
const utils_2 = require("../utils");
const getTokenAllowance = async (symbol, address, spenderAddress, provider) => {
    const network = await provider.getNetwork();
    const tokenContract = utils_2.getContract(symbol, provider, network);
    const [tokenAllowance, decimals] = await Promise.all([
        tokenContract.allowance(address, spenderAddress),
        tokenContract.decimals(),
    ]);
    return utils_1.formatUnits(tokenAllowance, decimals);
};
exports.getTokenAllowance = getTokenAllowance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsb3dhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXJjMjAvYWxsb3dhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDRDQUE4QztBQVM5QyxvQ0FBc0M7QUFFL0IsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQ3BDLE1BS3NCLEVBQ3RCLE9BQWUsRUFDZixjQUFzQixFQUN0QixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDM0MsTUFBTSxhQUFhLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBVSxDQUFBO0lBQ3JFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ25ELGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQztRQUNoRCxhQUFhLENBQUMsUUFBUSxFQUFFO0tBQ3pCLENBQUMsQ0FBQTtJQUNGLE9BQU8sbUJBQVcsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDOUMsQ0FBQyxDQUFBO0FBbEJZLFFBQUEsaUJBQWlCLHFCQWtCN0IifQ==