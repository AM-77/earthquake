#!/usr/bin/env node
const Web3 = require('web3')
const web3 = new Web3("http://localhost:8545")
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const vars = require("../lib/vars")

const address = "0x287016a3e1f742bA7089525733fD79F349adBE2a"
const contract = new web3.eth.Contract(vars.abi, address)

rl.question("[*] Enter infos: ", (infos) => {
  try {
    contract.methods.setInfo(infos)
      .send({from: "0x260B16E543d6E7372aB62a8bd87c54752870AAfF" /*vars.smartContractAddress */ }).then((err, res) => {
        console.log('[+] Your infos were published.')
        process.exit(0)
      })
  } catch (e) {
    console.log("[-] An error occured: ", e)
    process.exit(1)
  }
})

rl.on("close", () => { process.exit(0) })