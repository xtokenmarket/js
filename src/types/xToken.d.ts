import {
  AAVE,
  AAVE_PROTO_GOVERNANCE,
  KNC,
  KYBER_PROXY,
  SNX,
  TRADE_ACCOUNTING,
  X_AAVE_A,
  X_AAVE_B,
  X_KNC_A,
  X_KNC_B,
  X_SNX_A,
} from '../constants'

export type IContracts =
  | typeof AAVE
  | typeof AAVE_PROTO_GOVERNANCE
  | typeof KNC
  | typeof KYBER_PROXY
  | typeof SNX
  | typeof TRADE_ACCOUNTING
  | ITokenSymbols

export type ITokenSymbols =
  | typeof X_AAVE_A
  | typeof X_AAVE_B
  | typeof X_KNC_A
  | typeof X_KNC_B
  | typeof X_SNX_A
