const alliances = require(__dirname + "/stable/alliance.js")
const towns = require(__dirname + "/stable/town.js")
const territory = require(__dirname + "/stable/territory.js")
const players = require(__dirname + "/stable/player.js")
const market_buy = require(__dirname + "/stable/market-buy.js")
const sales = require(__dirname + "/stable/market-sales.js")
const battle = require(__dirname + "/stable/battle.js")
const transactions = require(__dirname + "/stable/transactions.js")

module.exports = {
    "alliance":alliances,
    "town":towns,
    "territory":territory,
    "player":players,
    "market_sales":sales,
    "market_buy":market_buy,
    "battle":battle,
    "transaction":transactions
}