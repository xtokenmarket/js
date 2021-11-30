import { formatEther } from 'ethers/lib/utils';
import { getPricingContracts } from './helper';
/**
 * Get xAsset Price
 * @param priceName Pricing contract name
 * @param provider
 * @returns
 */
export const getLendingPrice = async (priceName, provider) => {
    const pricingContracts = await getPricingContracts(provider);
    const pricingContract = pricingContracts[priceName];
    const lendingPrice = await pricingContract.getPrice();
    return formatEther(lendingPrice);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmxvY2tjaGFpbi9sZW5kaW5nL3ByaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUk5QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFOUM7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUNsQyxTQUEwQixFQUMxQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzVELE1BQU0sZUFBZSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ25ELE1BQU0sWUFBWSxHQUFHLE1BQU0sZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ3JELE9BQU8sV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQ2xDLENBQUMsQ0FBQSJ9