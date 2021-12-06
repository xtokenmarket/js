import { Contract } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { KyberProxy, TradeAccounting, XSNX } from '../../types';
export declare const getXSnxContracts: (provider: BaseProvider) => Promise<{
    kyberProxyContract: KyberProxy;
    network: import("@ethersproject/providers").Network;
    snxContract: Contract;
    tradeAccountingContract: TradeAccounting;
    xsnxContract: XSNX;
}>;
