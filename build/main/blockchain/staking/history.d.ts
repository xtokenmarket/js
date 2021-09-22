import { BaseProvider } from '@ethersproject/providers'
import { IHistoryType, IStakeHistory } from '../../types/xToken'
export declare const getXtkHistory: (
  type: IHistoryType,
  account: string,
  provider: BaseProvider
) => Promise<readonly IStakeHistory[]>
