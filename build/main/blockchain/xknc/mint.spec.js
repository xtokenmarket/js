'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const abis_1 = require('@xtoken/abis')
const ava_1 = __importDefault(require('ava'))
const constants_spec_1 = require('../../constants.spec')
const mint_1 = require('./mint')
/*test('Calculate xKNCa expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    X_KNC_A,
    true,
    '1',
    provider
  )
  console.log('Expected xKNCa qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
ava_1.default(
  'Calculate xKNCa expected quantity on mint with KNC',
  async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXKnc(
      abis_1.X_KNC_A,
      false,
      '1',
      constants_spec_1.provider
    )
    console.log('Expected xKNCa qty for 1 KNC:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
/*test('Calculate xKNCb expected quantity on mint with ETH', async (t) => {
  const expectedQty = await getExpectedQuantityOnMintXKnc(
    X_KNC_B,
    true,
    '1',
    provider
  )
  console.log('Expected xKNCb qty for 1 ETH:', expectedQty)
  t.true(Number(expectedQty) > 0)
})*/
ava_1.default(
  'Calculate xKNCb expected quantity on mint with KNC',
  async (t) => {
    const expectedQty = await mint_1.getExpectedQuantityOnMintXKnc(
      abis_1.X_KNC_B,
      false,
      '1',
      constants_spec_1.provider
    )
    console.log('Expected xKNCb qty for 1 KNC:', expectedQty)
    t.true(Number(expectedQty) > 0)
  }
)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGtuYy9taW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBK0M7QUFDL0MsOENBQXNCO0FBRXRCLHlEQUErQztBQUUvQyxpQ0FBc0Q7QUFFdEQ7Ozs7Ozs7OztJQVNJO0FBRUosYUFBSSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRSxNQUFNLFdBQVcsR0FBRyxNQUFNLG9DQUE2QixDQUNyRCxjQUFPLEVBQ1AsS0FBSyxFQUNMLEdBQUcsRUFDSCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUY7Ozs7Ozs7OztJQVNJO0FBRUosYUFBSSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyRSxNQUFNLFdBQVcsR0FBRyxNQUFNLG9DQUE2QixDQUNyRCxjQUFPLEVBQ1AsS0FBSyxFQUNMLEdBQUcsRUFDSCx5QkFBUSxDQUNULENBQUE7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FBQyxDQUFBIn0=
