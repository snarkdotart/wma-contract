require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  compilers: {
    solc: {
      version: '0.5.12' // ex:  "0.4.20". (Default: Truffle's installed solc)
    }
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
      gasPrice: '5000000000'
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.SECRET_KEY, `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      gasPrice: 8000000000,// 8 gwei (in wei) (default: 100 gwei)
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.SECRET_KEY, "https://rinkeby.infura.io/v3/" + process.env.PROJECT_ID),
      gas: 6900000,
      gasPrice: 7000000000, // 7 Gwei
      network_id: 4,
      confirmations: 2,
      skipDryRun: true,
    },
    mainnet: {
      provider: new HDWalletProvider(process.env.SECRET_KEY, "https://mainnet.infura.io/v3/" + process.env.PROJECT_ID),
      // provider: new HDWalletProvider(process.env.SECRET_KEY, "wss://10.11.0.11:8545"),
      gas: 300000,
      gasPrice: 30000000000, // 30 Gwei
      network_id: 1,
      confirmations: 2,
      skipDryRun: true,
    }
  },
};
