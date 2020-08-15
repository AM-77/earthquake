#!/usr/bin/env node

const Web3 = require('web3') // Works with web3 1.0.0-beta27
const vars = require("../lib/vars")

const web3 = new Web3()
const providerUrl = 'ws://localhost:8545' // requires # https://github.com/trufflesuite/ganache-cli/releases/tag/v7.0.0-beta.0 or https://github.com/trufflesuite/ganache/releases/tag/v1.1.0-beta.0
const provider = new Web3.providers.WebsocketProvider(providerUrl)
web3.setProvider(provider)

web3.eth.net.getId()
  .then(networkId => {
    
    const contractAddr = "0x287016a3e1f742bA7089525733fD79F349adBE2a" //vars.smartContractAddress
    const TutorialToken = new web3.eth.Contract(vars.abi, contractAddr)

    TutorialToken.events.infoEvent({ fromBlock: 0 }, function(error, event){ 
        if ( error ) console.log(error)
      })
      .on('data', (log) => {
        const date = log.returnValues.date

        if ( new Date().toDateString() === new Date(date * 1000).toDateString()) 
          console.log("a new report is available")
        
      })
      .on('error', (log) => { console.log(`error:  ${log}`) })
  })