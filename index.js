console.log("[Loka.js] - AUTHOR: itsredstonepro#0979 [=] Running version " + require(__dirname + "/package.json").version)

const fs = require("fs")


//--------------------------------------------------------------------------------------------------------------------|
//-----------------------------                 Settings               -----------------------------------------------|
//--------------------------------------------------------------------------------------------------------------------|


module.exports.programSettings = {
        "eventSettings":{
            "eventTypes":['test','onbattle',"ontownappend","ontownremove","onallianceappend","onallianceremove"] //Do not modify unless you know what you are doing.
        },
        "logs":{
            "town":{//USABLE
                "preserveLogs":true, // Generate up-to-date logs with:    node node_modules/loka.js --noRun --loadNewLogs
                "useNewAsLatest":false, // only modify if preserverlogs=false
                "filePath":__dirname + "/saves/town.txt"
            },
            "alliance":{ //USABLE
                "preserveLogs":true,
                "useNewAsLatest":false, // only modify if preserverlogs=false
                "filePath":__dirname + "/saves/alliance.txt"
            },
            "battle":{ //WIP, NOT USABLE YET
                "preserveLogs":true,
                "useNewAsLatest":false, // only modify if preserverlogs=false
                "filePath":__dirname + "/saves/battle.txt"
            }
        }
}
//=======================================================================================================================




const alliances = require(__dirname + "/stable/alliance.js")
const towns = require(__dirname + "/stable/town.js")
const territory = require(__dirname + "/stable/territory.js")
const players = require(__dirname + "/stable/player.js")
const market_buy = require(__dirname + "/stable/market-buy.js")
const sales = require(__dirname + "/stable/market-sales.js")
const battle = require(__dirname + "/stable/battle.js")
const transactions = require(__dirname + "/stable/transactions.js")
const events = require(__dirname + "/events.js")


console.log("[Loka.js] - Exporting functions.")


module.exports["alliance"] = alliances
module.exports["town"] = towns   
module.exports["territory"] = territory
module.exports["player"] = players
module.exports["market_sales"] = sales
module.exports["market_buy"] = market_buy
module.exports["battle"] = battle
module.exports["transaction"] = transactions
module.exports["events"] = events



async function processArgs(){
    if (process.argv.indexOf("--noRun") == -1){
        console.log("[Loka.js] - Running Event handlers.")
        battle.start()
        alliances.start()
        towns.start()
    } else {
        console.log("[Loka.js] - Started with --noRun")

        if (process.argv.indexOf("--loadNewLogs") != -1){
            console.log("[Loka.js] - Loading new logs into saves")  //Battle system uses the current data as the "latest" on startup.

            var Result1 = await towns.get.fullList()

            if (Result1.error){
                console.log("[Loka.js] - Error at loading logs [TOWNLOG]")
                process.exit()
            }

            await fs.writeFileSync(module.exports.programSettings.logs.town.filePath, await JSON.stringify(Result1.data))


            var Result2 = await alliances.get.fullList()

            if (Result2.error){
                console.log("[Loka.js] - Error at loading logs [ALLIANCELOG]")
                process.exit()
            }

            await fs.writeFileSync(module.exports.programSettings.logs.alliance.filePath, await JSON.stringify(Result2.data))

            console.log("[Loka.js] - Loaded new logs successfully!")
        }
    }




    console.log("[Loka.js] - Started succesfully.")
}


processArgs() //Args handling call [Do not modify]