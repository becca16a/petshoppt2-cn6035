module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 6721975, // Added gas limit to prevent deployment failures
      gasPrice: 20000000000 // Added gas price (20 gwei)
    },
    develop: {
      host: "127.0.0.1", // Added missing host definition
      port: 8545,
      network_id: "*", // Added missing network_id
      gas: 6721975 // Added gas limit
    }
  },
  compilers: {
    solc: {
      version: "0.8.0", // Matches your pragma solidity ^0.8.0
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  mocha: {
    timeout: 10000 // Added test timeout (10 seconds)
  }
};