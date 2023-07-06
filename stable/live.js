const axios = require("axios")
const fs = require("fs");
const events = require(__dirname + "/../events.js")
const main = require(__dirname + "/../index.js")

//Log errors to file.
var olderr = console.error; console.error = async function (msg) { await require("fs").appendFileSync(__dirname + "/../log.txt", msg); olderr(msg) }



module.exports.start = async function (){
    var fileTarget = main.programSettings.settings.live.log_events_path
    
    events.registerEvent('ontownappend', async function (town) {
        fs.appendFileSync(fileTarget, `\nTOWN APPEND - ${town.name} - ${new Date().toString().split(" (")[0]}`)
    })
    events.registerEvent('ontownremove', function (town) {
        fs.appendFileSync(fileTarget, `\nTOWN FALL - ${town.name} - ${new Date().toString().split(" (")[0]}`)
    })
    events.registerEvent('onbattle', function (battle) {
        fs.appendFileSync(fileTarget, `\nBATTLE APPEND - ${battle.id} - ${new Date().toString().split(" (")[0]}`)
    })
    events.registerEvent('ontransaction', function (transaction) {
        fs.appendFileSync(fileTarget, `\nTRANSACTION APPEND - ${transaction.id} - ${transaction.name} - ${transaction.unix} - ${new Date().toString().split(" (")[0]}`)
    })
    events.registerEvent('onallianceappend', function (alliance) {
        fs.appendFileSync(fileTarget, `\nALLIANCE APPEND - ${alliance.name} - ${new Date().toString().split(" (")[0]}`)
    })
    events.registerEvent('onallianceremove', function (alliance) {
        fs.appendFileSync(fileTarget, `\nALLIANCE REMOVE - ${alliance.name} - ${new Date().toString().split(" (")[0]}`)
    })
}