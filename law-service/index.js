const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const fs = require('fs')
const Web3 = require('web3')
const vars = require("../earth-contract/lib/vars")
const web3 = new Web3()
const providerUrl = 'ws://localhost:8545'
const provider = new Web3.providers.WebsocketProvider(providerUrl)
web3.setProvider(provider)

const abi = JSON.parse(fs.readFileSync('../earth-contract/smart-contract/dist/smart-contract_Earthquake_sol_Earthquake.abi').toString())

web3.eth.net.getId()
  .then(networkId => {
    console.log(`[+] listening to ${vars.smartContractAddress} events.`)

    const contract = new web3.eth.Contract(abi, vars.smartContractAddress)
    contract.events
      .infoEvent({ fromBlock: 0 }, (err, event) => { 
        if ( err ) console.log(`[!] ${err}`) 
      })
      .on('data', log => {
          console.log("[*] A new report is available.")
          contract.methods.getInfo(vars.lawAddress)
            .call()
            .then(infos => { 
              const info = {
                city: infos[0],
                latitude: infos[1],
                longitude: infos[2],
                time: infos[3],
                published: infos[4],
                range: infos[5],
                strength: infos[6],
                description: infos[7]
              }

              console.log('[+] report recieved: \n')   
              console.log(info)
              console.log("\n")

              io.emit('infos', info)
            })
            .catch(err => console.log(`[!] ${err}`))
      })
      .on('error', log => console.log(`[!] ${log}`) )
  })

const PORT = process.env.PORT || 3006
http.listen(PORT, () => console.log(`The law service is 🏃🏃🏃 on 🚪:${PORT}`))
