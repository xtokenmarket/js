import { Contract } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { KyberProxy, XAAVE } from '../../types';
import { ITokenSymbols } from '../../types/xToken';
export declare const getXAaveContracts: (symbol: ITokenSymbols, provider: BaseProvider) => Promise<{
    kyberProxyContract: KyberProxy;
    network: import("@ethersproject/providers").Network;
    tokenContract: Contract;
    xaaveContract: XAAVE;
}>;
