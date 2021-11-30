"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ropstenProvider = exports.provider = exports.kovanProvider = exports.arbitrumRinkebyProvider = exports.arbitrumProvider = exports.oneAddress = exports.testAddress = exports.infuraApiKey = void 0;
const dotenv = __importStar(require("dotenv"));
const ethers_1 = require("ethers");
const constants_1 = require("./constants");
dotenv.config();
// ENV variables
exports.infuraApiKey = process.env.INFURA_API_KEY;
exports.testAddress = process.env.TEST_ADDRESS;
exports.oneAddress = '0x0000000000000000000000000000000000000001';
exports.arbitrumProvider = new ethers_1.ethers.providers.JsonRpcProvider(constants_1.ARBITRUM_URL);
exports.arbitrumRinkebyProvider = new ethers_1.ethers.providers.JsonRpcProvider(constants_1.ARBITRUM_RINKEBY_URL);
exports.kovanProvider = new ethers_1.ethers.providers.InfuraProvider('kovan', exports.infuraApiKey);
exports.provider = new ethers_1.ethers.providers.InfuraProvider('homestead', exports.infuraApiKey);
exports.ropstenProvider = new ethers_1.ethers.providers.InfuraProvider('ropsten', exports.infuraApiKey);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc3RhbnRzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFnQztBQUNoQyxtQ0FBK0I7QUFFL0IsMkNBQWdFO0FBRWhFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUVmLGdCQUFnQjtBQUNILFFBQUEsWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBd0IsQ0FBQTtBQUNuRCxRQUFBLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQXNCLENBQUE7QUFFaEQsUUFBQSxVQUFVLEdBQUcsNENBQTRDLENBQUE7QUFFekQsUUFBQSxnQkFBZ0IsR0FBRyxJQUFJLGVBQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUNsRSx3QkFBWSxDQUNiLENBQUE7QUFFWSxRQUFBLHVCQUF1QixHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQ3pFLGdDQUFvQixDQUNyQixDQUFBO0FBRVksUUFBQSxhQUFhLEdBQUcsSUFBSSxlQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FDOUQsT0FBTyxFQUNQLG9CQUFZLENBQ2IsQ0FBQTtBQUVZLFFBQUEsUUFBUSxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQ3pELFdBQVcsRUFDWCxvQkFBWSxDQUNiLENBQUE7QUFFWSxRQUFBLGVBQWUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUNoRSxTQUFTLEVBQ1Qsb0JBQVksQ0FDYixDQUFBIn0=