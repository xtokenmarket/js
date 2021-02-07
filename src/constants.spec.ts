import * as dotenv from 'dotenv'
import { ethers } from 'ethers'

dotenv.config()

export const testAddress = process.env.TEST_ADDRESS as string

export const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '645c2c65dd8f4be18a50a0bf011bab85'
)

export const ropstenProvider = new ethers.providers.InfuraProvider(
  'ropsten',
  '645c2c65dd8f4be18a50a0bf011bab85'
)
