import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config'
require('dotenv').config()


const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: process.env.URL,
      // @ts-ignore
      accounts: [process.env.ACCOUNTS],
    },
  },

  etherscan: {
    // Your APIKey from Etherscan
    // Obtain one at https://Etherscan.io
    apiKey: process.env.APIKEY, 
  }
};

export default config;
