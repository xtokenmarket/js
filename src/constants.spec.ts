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
