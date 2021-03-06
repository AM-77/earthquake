const fs = require('fs')
const Web3 = require('web3')
const web3 = new Web3("http://localhost:8545")
const vars = require("../../../earth-contract/lib/vars")

const loadAbi = () => JSON.parse(fs.readFileSync('../earth-contract/smart-contract/dist/smart-contract_Earthquake_sol_Earthquake.abi').toString())
const contract = new web3.eth.Contract(loadAbi(), vars.smartContractAddress)

const sendInfos = async (req, res, next) => {
  const { city, latitude, longitude, time, range, strength, description } = req.body
  let result = {}

  if (!city || !latitude || !longitude || !time || !range || !strength || !description) {
    console.log('[!] Please make sure to provide all parameters.')
    result = { code: 500, sent: false }
  } else {
    try {
      const contract_result = await contract.methods
        .setInfo( city, latitude, longitude, time, new Date().toUTCString(), range, strength, description )
        .send({ from: vars.centerAddress, value: '1000000000000000000', gas: 3000000 })
      
      if ( contract_result.transactionHash ){
        console.log('[+] Your infos were published.')
        result = { code: 200, sent: true }
      }
    }
    catch(err) {
      console.log(`[!] Error: ${err}`)
      result = { code: 500, sent: false }
    }
  }

  res.json({ ...result })
}

module.exports = { sendInfos }