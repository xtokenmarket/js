import * as dotenv from 'dotenv'
import { ethers } from 'ethers'

dotenv.config()

export const testAddress = process.env.TEST_ADDRESS as string

export const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '20a1be3a49a94ad09b18d51d3a25ad84'
)

export const kovanProvider = new ethers.providers.InfuraProvider(
  'kovan',
  '01a0666704244d44812fc70d214a913b'
)

export const ropstenProvider = new ethers.providers.InfuraProvider(
  'ropsten',
  '01a0666704244d44812fc70d214a913b'
)
