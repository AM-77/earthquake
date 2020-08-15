#!/usr/bin/env node
const Web3 = require('web3')
const web3 = new Web3("http://localhost:8545")
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const vars = require("../lib/vars")

const contract = new web3.eth.Contract(vars.abi, "0x7820238168fa0459Da23df1660B48Db8E33664Bf")

rl.question("[*] Enter infos: ", (infos) => {
  try {
    contract.methods.setInfo(infos)
      .send({from: "0xF9D253Ede2295e2D7944921816dE9A094e6bEce6" /*vars.smartContractAddress */ }).then((err, res) => {
        console.log('[+] Your infos were published.')
        process.exit(0)
      })
  } catch (e) {
    console.log("[-] An error occured: ", e)
    process.exit(1)
  }
})

rl.on("close", () => { process.exit(0) })