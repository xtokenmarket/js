"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const burn_1 = require("./burn");
ava_1.default('Calculate ETH expected quantity on burn of xSNXa', async (t) => {
    const expectedQty = await burn_1.getExpectedQuantityOnBurnXSnx('1', constants_spec_1.provider);
    console.log('Expected ETH qty for 1 xSNXa:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9idXJuLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLGlDQUFzRDtBQUV0RCxhQUFJLENBQUMsa0RBQWtELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ25FLE1BQU0sV0FBVyxHQUFHLE1BQU0sb0NBQTZCLENBQUMsR0FBRyxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBIn0=