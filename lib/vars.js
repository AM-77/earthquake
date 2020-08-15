const fs = require("fs")

const abi = JSON.parse(fs.readFileSync('smart-contract/dist/smart-contract_Earthquake_sol_Earthquake.abi').toString())
const bin = fs.readFileSync('smart-contract/dist/smart-contract_Earthquake_sol_Earthquake.bin').toString()

module.exports = { abi, bin }