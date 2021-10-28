'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getXBntAsset = void 0
const helper_1 = require('./helper')
const prices_1 = require('./prices')
const getXBntAsset = async (symbol, provider) => {
  const { kyberProxyContract, xbntContract } = await helper_1.getXBntContracts(
    symbol,
    provider
  )
  const { aum, priceEth, priceUsd } = await prices_1.getXBntPrices(
    xbntContract,
    kyberProxyContract
  )
  return {
    aum,
    mandate: 'Dynamic Allocator; Buchanan Mandate',
    order: 8,
    price: priceUsd,
    priceEth,
    symbol,
  }
}
exports.getXBntAsset = getXBntAsset
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi94Ym50L2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHFDQUEyQztBQUMzQyxxQ0FBd0M7QUFFakMsTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUMvQixNQUFzQixFQUN0QixRQUFzQixFQUNMLEVBQUU7SUFDbkIsTUFBTSxFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0seUJBQWdCLENBQ2pFLE1BQU0sRUFDTixRQUFRLENBQ1QsQ0FBQTtJQUVELE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sc0JBQWEsQ0FDckQsWUFBWSxFQUNaLGtCQUFrQixDQUNuQixDQUFBO0lBRUQsT0FBTztRQUNMLEdBQUc7UUFDSCxPQUFPLEVBQUUscUNBQXFDO1FBQzlDLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxFQUFFLFFBQVE7UUFDZixRQUFRO1FBQ1IsTUFBTTtLQUNQLENBQUE7QUFDSCxDQUFDLENBQUE7QUF0QlksUUFBQSxZQUFZLGdCQXNCeEIifQ==
