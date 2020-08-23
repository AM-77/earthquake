/* -!- DONT UPDATE THIS FILE MANUALY NO MATTER WAHT -!- */
const fs = require("fs")

// const abi = JSON.parse(fs.readFileSync(process.cwd() + '/smart-contract/dist/smart-contract_Earthquake_sol_Earthquake.abi').toString())
// const bin = fs.readFileSync(process.cwd() + '/smart-contract/dist/smart-contract_Earthquake_sol_Earthquake.bin').toString()

const smartContractAddress = "0x3862b532AC2e2F6cDa90cdbb8D23A139d73A4aeB"
const centerAddress = "0x38AfBC176b72fD70087544C28b00ff070969e22F"
const mediaAddress = "0x5164198c49d6ec8DE88Ea5687D6015124B1A2306"

module.exports = { mediaAddress, centerAddress, smartContractAddress }