import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // Local development
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    // Cosmos EVM chains
    evmos: {
      url: process.env.EVMOS_RPC || "https://eth.bd.evmos.org:8545",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 9001
    },
    evmosTestnet: {
      url: "https://eth.bd.evmos.dev:8545",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 9000
    },
    // Canto (Cosmos EVM)
    canto: {
      url: "https://canto.gravitychain.io",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 7700
    }
  },
  etherscan: {
    apiKey: {
      evmos: process.env.EVMOS_API_KEY || "",
      canto: process.env.CANTO_API_KEY || ""
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD"
  }
};

export default config;
