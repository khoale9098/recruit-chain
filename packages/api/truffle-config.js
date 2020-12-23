module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '4447', // Match any network id
    },
  },
  migrations_directory: './migrations',
  solc: { version: '^0.5.16', optimizer: { enabled: true, runs: 200 } },
  coverage: {
    host: 'localhost',
    network_id: '*',
    port: 8555, // <-- If you change this, also set the port option in .solcover.js.
    gas: 0xfffffffffff, // <-- Use this high gas value
    gasPrice: 0x01, // <-- Use this low gas price
  },
};
