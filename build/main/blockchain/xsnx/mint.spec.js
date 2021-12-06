"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const mint_1 = require("./mint");
ava_1.default('Calculate xSNXa expected quantity on mint with ETH', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXSnx(true, '1', constants_spec_1.provider);
    console.log('Expected xSNXa qty for 1 ETH:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
ava_1.default('Calculate xSNXa expected quantity on mint with SNX', async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXSnx(false, '1', constants_spec_1.provider);
    console.log('Expected xSNXa qty for 1 SNX:', expectedQty);
    t.true(Number(expectedQty) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veHNueC9taW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBc0I7QUFFdEIseURBQStDO0FBRS9DLGlDQUFzRDtBQUV0RCxhQUFJLENBQUMsb0RBQW9ELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sV0FBVyxHQUFHLE1BQU0sb0NBQTZCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSx5QkFBUSxDQUFDLENBQUE7SUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyxvREFBb0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckUsTUFBTSxXQUFXLEdBQUcsTUFBTSxvQ0FBNkIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLHlCQUFRLENBQUMsQ0FBQTtJQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBIn0=