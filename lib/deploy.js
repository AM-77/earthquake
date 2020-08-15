#!/usr/bin/env node

const Web3 = require('web3')
const web3 = new Web3("http://localhost:8545")
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const vars = require("./vars")

const contract2deploy = new web3.eth.Contract(vars.abi)

// get the deployer address
rl.question("[*] Enter your account address: ", (address) => { 

  if (address.length === 42 ){
    // data: the compiled bytecode to deploy to the blockchain.
    // arguments: the arguments passed to the contract's constructor.
    // from: address of who deployed the contract.
    // gas: money you are willing to pay to get your code included in the blockchain.
    // gasPrice: the price of a unit of gas.

    contract2deploy.deploy({ data: vars.bin })
      .send({ from: address, gas: 1500000, gasPrice: web3.utils.toWei('0.00003', 'ether') })
      .then((newContractInstance) => {
        contract2deploy.options.address = newContractInstance.options.address
        console.log("[+] The smart contract address: " + newContractInstance.options.address)
        process.exit(0)
      })
  } else {
    console.log("[!] Unvalid address.") 
    process.exit(1)
  }
})

rl.on("close", () => { process.exit(0) })
