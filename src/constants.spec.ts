import * as dotenv from 'dotenv'
import { ethers } from 'ethers'

dotenv.config()

export const infuraApiKey = process.env.INFURA_API_KEY as string
export const testAddress = process.env.TEST_ADDRESS as string

export const provider = new ethers.providers.InfuraProvider(
  'homestead',
  infuraApiKey
)

export const ropstenProvider = new ethers.providers.InfuraProvider(
  'ropsten',
  infuraApiKey
)

export const arbitrumProvider = new ethers.providers.JsonRpcProvider(
  // 'https://arb1.arbitrum.io/rpc'
  // 'https://arbitrum-mainnet.infura.io/v3/70c60a289bcf412ba4ac856777ce3ef1'
  'https://arb-mainnet.g.alchemy.com/v2/asY2H6QpivyJ_yM9bZQfFFW8JjFoREGA'
)
