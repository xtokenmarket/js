import { getContract, getTokenSymbol } from '../utils';
export const getXBntContracts = async (symbol, provider) => {
    const network = await provider.getNetwork();
    const xbntContract = getContract(symbol, provider, network);
    const tokenContract = getContract(getTokenSymbol(symbol), provider, network);
    if (!xbntContract || !tokenContract) {
        return Promise.reject(new Error('Unknown error'));
    }
    return {
        network,
        tokenContract,
        xbntContract,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Jsb2NrY2hhaW4veGJudC9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdEQsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUNuQyxNQUFxQixFQUNyQixRQUFzQixFQUN0QixFQUFFO0lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFM0MsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFTLENBQUE7SUFDbkUsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUMvQixjQUFjLENBQUMsTUFBTSxDQUFDLEVBQ3RCLFFBQVEsRUFDUixPQUFPLENBQ0ksQ0FBQTtJQUViLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDbkMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7S0FDbEQ7SUFFRCxPQUFPO1FBQ0wsT0FBTztRQUNQLGFBQWE7UUFDYixZQUFZO0tBQ2IsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9