#!/usr/bin/env node
const fs = require('fs')
const Web3 = require('web3')
const infosController = require("./app/controllers")
const vars = require("../earth-contract/lib/vars")
const web3 = new Web3()
const providerUrl = 'ws://localhost:8545'
const provider = new Web3.providers.WebsocketProvider(providerUrl)
web3.setProvider(provider)

const abi = JSON.parse(fs.readFileSync('../earth-contract/smart-contract/dist/smart-contract_Earthquake_sol_Earthquake.abi').toString())

// const getBalance = async () => {
//   const balance = await web3.eth.getBalance(vars.mediaAddress)
//   console.log('[+] Your balance is: ' + Web3.utils.fromWei(balance, 'ether'))
// }
// getBalance()

web3.eth.net.getId()
  .then(networkId => {
    console.log(`[+] media smart-connect is listening to ${vars.smartContractAddress} events.`)

    const contract = new web3.eth.Contract(abi, vars.smartContractAddress)
    contract.events
      .infoEvent({ fromBlock: 0 }, (err, event) => { 
        if ( err ) console.log(`[!] ${err}`) 
        else console.log(`[+] new info event.`)
      })
      .on('data', log => {
          console.log("[*] A new report is available.")
          contract.methods.getInfo(vars.mediaAddress)
            .call()
            .then(info => { 
              console.log('[+] report recieved.')
              const { city, latitude, time, published, longitude, range, strength, description } = info
              const res = infosController.saveInfo(JSON.stringify({ city, latitude, time, published, longitude, range, strength, description }))
              if ( res ) {
                console.log('[+] report saved.')
              }
              else {
                console.log('[!] database error.')
              }
            })
            .catch(err => console.log(`[!] ${err}`))
      })
      .on('error', log => console.log(`[!] ${log}`) )
  })