const axios = require("axios")
const events = require(__dirname + "/../events.js")
const main = require(__dirname + "/../index.js")
const fs = require("fs")

//Log errors to file.
var olderr = console.error; console.error = async function(msg){await require("fs").appendFileSync(__dirname + "/../log.txt",msg);olderr(msg)}

module.exports.get = {}

module.exports.get.byName = async function(exactName){
    var out = {}
    try {
        out = await axios.get("http://testapi.lokamc.com/alliances/search/findByName?name=" + exactName)
    } catch(e){

    }

    if (out.data){
        return {
            error:false,
            data:out.data
        }
    } else {
        return {
            error:true
        }
    }
}

module.exports.get.fullList = async function(){
    var out = {}
    try {
        out = await axios.get("https://testapi.lokamc.com/alliances?size=1000")
    } catch(e){

    }

    if (out.data){
        return {
            error:false,
            data: out.data._embedded.alliances
        }
    } else {
        return {
            error:true
        }
    }
}

async function allianceChecker(){
    var latest

    if (main.programSettings.logs.town.preserveLogs){
        latest = await JSON.parse(await fs.readFileSync(main.programSettings.logs.alliance.filePath).toLocaleString())
    } else {
        if (main.programSettings.logs.alliance.useNewAsLatest){
            latest = []
        } else {
            latest = await module.exports.get.fullList().data
        }
    }

    setInterval(async () => {
        const data = await module.exports.get.fullList()
        if (data.error) { await fs.appendFileSync(__dirname + "/../log.txt", "Error at fetching alliance full list"); return }

        var tableA = latest
        var tableB = data.data

        

        //A is old
        //B is new
        const newItems = tableB.filter((itemB) => !tableA.find((itemA) => itemA.id === itemB.id));
        if (newItems.length > 0) {
            //console.log(newItems)
            for (var i = 0; i < newItems.length; i++) {
                var c = newItems[i]
        
                events.fireEvents('onallianceappend', c)
            }
        }

        const removedItems = tableA.filter((itemA) => !tableB.find((itemB) => itemB.id === itemA.id));

        if (removedItems.length > 0) {
            //console.log(removedItems)
            for (var i = 0; i < removedItems.length; i++) {
                var c = removedItems[i]
        
                events.fireEvents('onallianceremove', c)
            }
        }


        await fs.writeFileSync(main.programSettings.logs.alliance.filePath,JSON.stringify(tableB))
        latest = tableB
    },  main.programSettings.settings.events.alliance.checkInterval)
}

module.exports.start = function(){
    if (main.programSettings.settings.events.alliance.enabled){
        allianceChecker()
    }
}