import * as dotenv from 'dotenv'
import { ethers } from 'ethers'

dotenv.config()

// ENV variables
export const infuraApiKey = process.env.INFURA_API_KEY as string
export const testAddress = process.env.TEST_ADDRESS as string

export const oneAddress = '0x0000000000000000000000000000000000000001'

export const arbitrumRinkebyProvider = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.arbitrum.io/rpc'
)

export const kovanProvider = new ethers.providers.InfuraProvider(
  'kovan',
  infuraApiKey
)

export const provider = new ethers.providers.InfuraProvider(
  'homestead',
  infuraApiKey
)

export const ropstenProvider = new ethers.providers.InfuraProvider(
  'ropsten',
  infuraApiKey
)

export const arbitrumProvider = new ethers.providers.JsonRpcProvider(
  'https://arb1.arbitrum.io/rpc'
)
