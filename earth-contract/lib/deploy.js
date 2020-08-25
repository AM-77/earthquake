#!/usr/bin/env node

const Web3 = require('web3')
const web3 = new Web3("http://localhost:8545")
const fs = require('fs')

const abi = JSON.parse(fs.readFileSync('smart-contract/dist/smart-contract_Earthquake_sol_Earthquake.abi').toString())
const bin = fs.readFileSync('smart-contract/dist/smart-contract_Earthquake_sol_Earthquake.bin').toString()

const contract2deploy = new web3.eth.Contract(abi)

web3.eth.getAccounts().then(accounts => {
  
  const varsFile = fs.readFileSync('lib/vars.js', 'utf8').toString().split("\n")

  contract2deploy.deploy({ data: bin, arguments: [accounts[1], accounts[2], accounts[3]] })
    .send({ from: accounts[0], gas: 1500000, gasPrice: web3.utils.toWei('0.00003', 'ether') })
    .then((newContractInstance) => {

      const smartContractAddress = newContractInstance.options.address
      contract2deploy.options.address = smartContractAddress
      console.log("[+] The smart contract address: " + smartContractAddress)
      varsFile[1] = `const smartContractAddress = "${smartContractAddress}"`
      varsFile[2] = `const centerAddress = "${accounts[0]}"`
      varsFile[3] = `const mediaAddress = "${accounts[1]}"`
      varsFile[4] = `const lawAddress = "${accounts[2]}"`
      varsFile[5] = `const civilAddress = "${accounts[3]}"`
      
      varsFile[6] = `module.exports = { smartContractAddress, centerAddress, mediaAddress, lawAddress, civilAddress }`
      fs.writeFileSync('lib/vars.js', varsFile.join("\n"))
    })

})