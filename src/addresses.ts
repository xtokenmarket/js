import {
  AAVE,
  AAVE_PROTO_GOVERNANCE,
  ETH,
  ETH_RSI_60_40,
  FEE_POOL,
  KNC,
  KYBER_DAO,
  KYBER_PROXY,
  SNX,
  SYNTHETIX_ADDRESS_RESOLVER,
  TRADE_ACCOUNTING,
  USDC,
  X_AAVE_A,
  X_AAVE_B,
  X_KNC_A,
  X_KNC_B,
  X_SNX_A,
  X_SNX_A_ADMIN,
} from './constants'

const ADDRESSES = {
  [X_KNC_A]: {
    1: '0xB088b2C7cE300f3fe679d471C2cE49dFE312Ce75',
    3: '0x1A2235890aFdA5e4E02C5E77bbCBcE2E6030fC3B',
  },
  [X_KNC_B]: {
    1: '0x0c8bCCc8eADa871656266A1f7ad37aaFFC4b20b3',
    3: '0xEF993C613DC837429C11dDB681B5Dda3506AF3Cb',
  },
  [X_SNX_A]: {
    1: '0x2367012aB9c3da91290F71590D5ce217721eEfE4', // new xSNX proxy
    42: '0x2Bf815B4bA7c70879013E559d9e02f29EBEa7acA',
  },
  [X_SNX_A_ADMIN]: {
    1: '0x7Cd5E2d0056a7A7F09CBb86e540Ef4f6dCcc97dd',
  },
  [TRADE_ACCOUNTING]: {
    1: '0x6461E964D687E7ca3082bECC595D079C6c775Ac8', // new proxy
    42: '0x6b9f858c5fea781336bb2552cf2e2d88c9508267',
  },
  [KNC]: {
    1: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
    3: '0x7B2810576aa1cce68F2B118CeF1F36467c648F92',
  },
  [SNX]: {
    1: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
    42: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  },
  [FEE_POOL]: {
    1: '0xb440DD674e1243644791a4AdfE3A2AbB0A92d309',
  },
  [SYNTHETIX_ADDRESS_RESOLVER]: {
    1: '0x61166014E3f04E40C953fe4EAb9D9E40863C83AE',
    42: '0x25ee175d78B22A55982c09e6A03D605aE5B5c17C',
  },
  [KYBER_PROXY]: {
    1: '0x9AAb3f75489902f3a48495025729a0AF77d4b11e',
    3: '0x818E6FECD516Ecc3849DAf6845e3EC868087B755',
    42: '0x692f391bCc85cefCe8C237C01e1f636BbD70EA4D',
  },
  [KYBER_DAO]: {
    1: '0x49bdd8854481005bBa4aCEbaBF6e06cD5F6312e9',
    3: '0x2Be7dC494362e4FCa2c228522047663B17aE17F9',
  },
  [ETH]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  [USDC]: {
    1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    3: '0xaD6D458402F60fD3Bd25163575031ACDce07538D',
  },
  [ETH_RSI_60_40]: {
    1: '0x93E01899c10532d76C0E864537a1D26433dBbDdB',
  },
  [AAVE]: {
    1: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
    42: '0xb597cd8d3217ea6477232f9217fa70837ff667af',
  },
  [AAVE_PROTO_GOVERNANCE]: {
    1: '0x8a2Efd9A790199F4c94c6effE210fce0B4724f52',
    42: '0x374d0940dc9a980219e0aA6566C3067159d2F442',
  },
  [X_AAVE_A]: {
    1: '0x80DC468671316E50D4E9023D3db38D3105c1C146',
    42: '0xdAaEEc7279480c7DB83D40010C8336702dE087Ed',
  },
  [X_AAVE_B]: {
    1: '0x704De5696dF237c5B9ba0De9ba7e0C63dA8eA0Df',
    42: '0xdAaEEc7279480c7DB83D40010C8336702dE087Ed',
  },
}

export default ADDRESSES
