/* -!- DONT UPDATE THIS FILE MANUALY -!- */
const fs = require("fs")

// const abi = JSON.parse(fs.readFileSync(process.cwd() + '/smart-contract/dist/smart-contract_Earthquake_sol_Earthquake.abi').toString())
// const bin = fs.readFileSync(process.cwd() + '/smart-contract/dist/smart-contract_Earthquake_sol_Earthquake.bin').toString()

const smartContractAddress = "0x4a7b2caBAa4d5711596e9923B828fF9c855d821D"
const centerAddress = "0xdF14479712d0BE2BCA209bca3631A37D5f78a217"
const mediaAddress = "0x5A3951d8e62E8d2c29e89d6253c2386153194713"

module.exports = { mediaAddress, centerAddress, smartContractAddress }