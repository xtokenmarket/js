'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const ava_1 = __importDefault(require('ava'))
const constants_spec_1 = require('../../constants.spec')
const comptroller_1 = require('./comptroller')
ava_1.default('Check borrowing capacity for unowned address', async (t) => {
  const borrowingCapacity = await comptroller_1.getBorrowingCapacity(
    constants_spec_1.oneAddress,
    constants_spec_1.provider
  )
  console.log(
    '[Lending] Borrowing capacity for unowned address:',
    borrowingCapacity
  )
  t.true(Number(borrowingCapacity) === 0)
})
ava_1.default('Check health ratio for unowned address', async (t) => {
  const healthRatio = await comptroller_1.getHealthRatio(
    constants_spec_1.oneAddress,
    constants_spec_1.provider
  )
  console.log('[Lending] Health ratio for unowned address:', healthRatio)
  t.true(Number(healthRatio) === 1)
})
ava_1.default('Check all markets', async (t) => {
  const markets = await comptroller_1.getAllMarkets(constants_spec_1.provider)
  console.log('[Lending] All markets for Comptroller:', markets)
  const expectedMarkets = [
    '0x652cC6Ed5b308A8D92f85D4707d84785D66F437D',
    '0x5191F60315DA4E1F8e4dF3825801576B71Ac22db',
    '0x1C6b58C03880F952c91c3628AEc63a48A8422b70',
    '0x56F9261EcA26d055A2ca5aa5a6D25A8648C96801',
    '0xf0cB06e260AeE7b9d75F2950E1dc83e94e89fCbD',
    '0xbC0D79a2697271f793d082aBED8de5E248c5228B',
  ]
  t.deepEqual(markets, expectedMarkets)
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHRyb2xsZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ibG9ja2NoYWluL2xlbmRpbmcvY29tcHRyb2xsZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhDQUFzQjtBQUV0Qix5REFBMkQ7QUFFM0QsK0NBSXNCO0FBRXRCLGFBQUksQ0FBQyw4Q0FBOEMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0QsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLGtDQUFvQixDQUFDLDJCQUFVLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQzFFLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbURBQW1ELEVBQ25ELGlCQUFpQixDQUNsQixDQUFBO0lBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUMsQ0FBQTtBQUVGLGFBQUksQ0FBQyx3Q0FBd0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDekQsTUFBTSxXQUFXLEdBQUcsTUFBTSw0QkFBYyxDQUFDLDJCQUFVLEVBQUUseUJBQVEsQ0FBQyxDQUFBO0lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdkUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3BDLE1BQU0sT0FBTyxHQUFHLE1BQU0sMkJBQWEsQ0FBQyx5QkFBUSxDQUFDLENBQUE7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUM5RCxNQUFNLGVBQWUsR0FBRztRQUN0Qiw0Q0FBNEM7UUFDNUMsNENBQTRDO1FBQzVDLDRDQUE0QztRQUM1Qyw0Q0FBNEM7UUFDNUMsNENBQTRDO1FBQzVDLDRDQUE0QztLQUM3QyxDQUFBO0lBQ0QsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUE7QUFDdkMsQ0FBQyxDQUFDLENBQUEifQ==
