#!/usr/bin/env node

const Web3 = require('web3')
const vars = require("../lib/vars")

const web3 = new Web3()
const providerUrl = 'ws://localhost:8545'
const provider = new Web3.providers.WebsocketProvider(providerUrl)
web3.setProvider(provider)

const getBalance = async () => {
  const balance = await web3.eth.getBalance(vars.mediaAddress)
  console.log('[+] Your balance is: ' + Web3.utils.fromWei(balance, 'ether'))
}
getBalance()

web3.eth.net.getId()
  .then(networkId => {
    const contract = new web3.eth.Contract(vars.abi, vars.smartContractAddress)

    contract.events
      .infoEvent({ fromBlock: 0 }, (err, event) => { if ( err ) console.log(`[!] ${err}`) })
      .on('data', log => {
          console.log("[*] A new report is available.")
          contract.methods.getInfo(vars.mediaAddress)
            .call()
            .then(data => { 
              console.log('[+] report recieved: ' + data) 
              getBalance()
            })
            .catch(err => console.log(`[!] ${err}`))
      })
      .on('error', log => console.log(`[!] ${log}`) )
  })