#!/usr/bin/env node
const Web3 = require('web3')
const web3 = new Web3("http://localhost:8545")
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const vars = require("../lib/vars")

const contract = new web3.eth.Contract(vars.abi, vars.smartContractAddress)

rl.question("[*] Enter infos: ", (infos) => {
  try {
    contract.methods.setInfo(infos)
      .send({ from: vars.centerAddress, value: '1000000000000000000', gas: 3000000 })
      .then(res => {
        console.log('[+] Your infos were published.')
        process.exit(0)
      })
      .catch(err => console.log(`[!] Error: ${err}`))
  } catch (e) {
    console.log("[!] An error occured: ", e)
    process.exit(1)
  }
})

rl.on("close", () => { process.exit(0) })