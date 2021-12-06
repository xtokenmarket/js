"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abis_1 = require("@xtoken/abis");
const ava_1 = __importDefault(require("ava"));
const constants_spec_1 = require("../../constants.spec");
const portfolio_1 = require("./portfolio");
ava_1.default('Get xALPHAa portfolio balance', async (t) => {
    const portfolioItem = await portfolio_1.getPortfolioItemXAlpha(abis_1.X_ALPHA_A, constants_spec_1.testAddress, constants_spec_1.provider);
    console.log('Portfolio balance xALPHAa: ', portfolioItem.quantity);
    t.true(Number(portfolioItem.quantity) > 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGZvbGlvLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94YWxwaGEvcG9ydGZvbGlvLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBd0M7QUFDeEMsOENBQXNCO0FBRXRCLHlEQUE0RDtBQUU1RCwyQ0FBb0Q7QUFFcEQsYUFBSSxDQUFDLCtCQUErQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNoRCxNQUFNLGFBQWEsR0FBRyxNQUFNLGtDQUFzQixDQUNoRCxnQkFBUyxFQUNULDRCQUFXLEVBQ1gseUJBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQyxDQUFBIn0=