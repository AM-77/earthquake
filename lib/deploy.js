#!/usr/bin/env node

const Web3 = require('web3')
const web3 = new Web3("http://localhost:8545")
const vars = require("./vars")
const fs = require('fs')

const contract2deploy = new web3.eth.Contract(vars.abi)

web3.eth.getAccounts().then(accounts => {
  
  const varsFile = fs.readFileSync('lib/vars.js', 'utf8').toString().split("\n")

  contract2deploy.deploy({ data: vars.bin, arguments: [accounts[1]] })
    .send({ from: accounts[0], gas: 1500000, gasPrice: web3.utils.toWei('0.00003', 'ether') })
    .then((newContractInstance) => {

      const smartContractAddress = newContractInstance.options.address
      contract2deploy.options.address = smartContractAddress
      console.log("[+] The smart contract address: " + smartContractAddress)
      varsFile[6] = `const smartContractAddress = "${smartContractAddress}"`
      varsFile[7] = `const centerAddress = "${accounts[0]}"`
      varsFile[8] = `const mediaAddress = "${accounts[1]}"`
      fs.writeFileSync('lib/vars.js', varsFile.join("\n"))

    })

})