import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { InchLiquidityProtocol } from '../InchLiquidityProtocol';
export declare class InchLiquidityProtocol__factory {
    static connect(address: string, signerOrProvider: Signer | Provider): InchLiquidityProtocol;
}
