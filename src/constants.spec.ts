import * as dotenv from 'dotenv'
import { ethers } from 'ethers'

dotenv.config()

export const testAddress = process.env.TEST_ADDRESS as string

export const provider = new ethers.providers.InfuraProvider(
  'homestead',
  '01a0666704244d44812fc70d214a913b'
)

export const ropstenProvider = new ethers.providers.InfuraProvider(
  'ropsten',
  '01a0666704244d44812fc70d214a913b'
)
