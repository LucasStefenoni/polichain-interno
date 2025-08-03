import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import dotenv from 'dotenv'
dotenv.config()
console.log("SEPOLIA_RPC_URL:", process.env.SEPOLIA_RPC_URL)
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY)

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || '',
      accounts: [process.env.PRIVATE_KEY || '']
    }
  }
}

export default config
