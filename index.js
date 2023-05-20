console.log("[Loka.js] - AUTHOR: itsredstonepro#0979 [=] Running version " + require(__dirname + "/package.json").version)
const fs = require("fs")


//--------------------------------------------------------------------------------------------------------------------|
//-----------------------------                 Settings               -----------------------------------------------|
//--------------------------------------------------------------------------------------------------------------------|
const setfile = process.env.PWD + "/lokasettings.js"   //Modify this to your settings file

    /*
    {
    "logs": { //=========LOG SETTINGS==========
        "town": {
            "preserveLogs": true, // Generate up-to-date logs with:    node node_modules/loka.js --noRun --loadNewLogs
            "useNewAsLatest": false, // only modify if preserverlogs=false
            "filePath": __dirname + "/saves/town.txt"
        },
        "alliance": { 
            "preserveLogs": true,
            "useNewAsLatest": false, // only modify if preserverlogs=false
            "filePath": __dirname + "/saves/alliance.txt"
        },
        "battle": {  
            "preserveLogs": true,
            "useNewAsLatest": false, // only modify if preserverlogs=false
            "filePath": __dirname + "/saves/battle.txt"
        },
        "transaction": {  
            "preserveLogs": true,
            "useNewAsLatest": false, // only modify if preserverlogs=false
            "filePath": __dirname + "/saves/transaction.txt"
        }
    },//======================================
    "settings":{//========SETTINGS============
        "events":{
            "town":{
                "enabled":true,
                "checkInterval": 120000, // time in ms
            },
            "alliance":{
                "enabled":true,
                "checkInterval": 120000, // time in ms 
            },
            "battle":{
                "enabled":true,
                "checkInterval": 20000, // time in ms
            },
            "transaction":{
                "enabled":true,
                "checkInterval": 20000, // time in ms
            }
        }
    },









    //==========CORE==============
    //Do not modify unless you know what you are doing.
    "eventSettings": { 
        "eventTypes": ['test', 'onbattle', "ontownappend", "ontownremove", "onallianceappend", "onallianceremove","ontransaction"]
    }
    //============================
}
    */
//=======================================================================================================================



async function processArgs() {
    


    if (process.argv.indexOf("--noRun") == -1) {

        //LOAD SETTINGS
        if (!fs.existsSync(setfile)){
            throw new Error("[Loka.js] - " + setfile + " is not a valid file! [INVALID_SETTINGS_FILE]")
        }
        module.exports.programSettings = require(setfile)



        //LOAD CONSTANTS
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




        console.log("[Loka.js] - Running Event handlers.")
        //START EVENT HANDLERS
        battle.start()
        alliances.start()
        towns.start()
        transactions.start()


    } else {
        //STARTING WITHOUT RUNNING
        console.log("[Loka.js] - Started with --noRun")




        //GEN SETTINGS
        if (process.argv.indexOf("--genSettings") != -1){
            console.log("[Loka.js] - generating settings into current navigation directory.")

            var templateData = await fs.readFileSync(__dirname + "/template.txt")
            await fs.writeFileSync(setfile,await templateData.toString())

            console.log("[Loka.js] - generated settings succesfully")
        }

        //LOAD SETTINGS
        if (!fs.existsSync(setfile)){
            throw new Error("[Loka.js] - " + setfile + " is not a valid file! [INVALID_SETTINGS_FILE]")
        }
        //WAIT 2S
        await new Promise(r=>{setTimeout(()=>{r()},2000)})
        //CONTINUE LOADING
        module.exports.programSettings = await require(setfile)



        //LOAD CONSTANTS
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


        //GET UP TO DATE LOGS
        if (process.argv.indexOf("--loadNewLogs") != -1) {
            console.log("[Loka.js] - Loading new logs into saves")
            var Result1 = await towns.get.fullList()

            if (Result1.error) {
                console.log("[Loka.js] - Error at loading logs [TOWNLOG]")
                process.exit()
            }

            await fs.writeFileSync(module.exports.programSettings.logs.town.filePath, await JSON.stringify(Result1.data))


            var Result2 = await alliances.get.fullList()

            if (Result2.error) {
                console.log("[Loka.js] - Error at loading logs [ALLIANCELOG]")
                process.exit()
            }

            await fs.writeFileSync(module.exports.programSettings.logs.alliance.filePath, await JSON.stringify(Result2.data))


            var Result3 = await battle.get.battles()

            if (Result3.error) {
                console.log("[Loka.js] - Error at loading logs [BATTLELOG]")
                process.exit()
            }

            await fs.writeFileSync(module.exports.programSettings.logs.battle.filePath, await JSON.stringify(Result3.data))


            var Result4 = await transactions.get.latest("?size=120")

            if (Result4.error) {
                console.log("[Loka.js] - Error at loading logs [TRANSACTIONLOG]")
                process.exit()
            }

            await fs.writeFileSync(module.exports.programSettings.logs.transaction.filePath, await JSON.stringify(Result4.data))

            console.log("[Loka.js] - Loaded new logs successfully!")
        }

        
    }




    console.log("[Loka.js] - Started succesfully.")
}


processArgs() //Args handling call [Do not modify]