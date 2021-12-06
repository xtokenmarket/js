import { Contract } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { XBNT } from '../../types';
import { ITokenSymbols } from '../../types/xToken';
export declare const getXBntContracts: (symbol: ITokenSymbols, provider: BaseProvider) => Promise<{
    network: import("@ethersproject/providers").Network;
    tokenContract: Contract;
    xbntContract: XBNT;
}>;
