import { BaseProvider } from '@ethersproject/providers'
import { ETH } from '@xtoken/abis'
import { BigNumber } from 'ethers'
import { ITokenSymbols, ITradeType } from '../../types/xToken'
export declare const getUniswapV3EstimatedQty: (
  tokenIn: typeof ETH | ITokenSymbols,
  symbol: ITokenSymbols,
  amount: string,
  tradeType: ITradeType,
  fees: BigNumber | undefined,
  provider: BaseProvider
) => Promise<string>
