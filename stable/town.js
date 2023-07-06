const axios = require("axios");
const events = require(__dirname + "/../events.js")
const main = require(__dirname + "/../index.js")
const fs = require("fs");

const baseUrl = main.programSettings.settings.baseUrl || "https://www.api.lokamc.com"

//Log errors to file.
var olderr = console.error; console.error = async function (msg) { await require("fs").appendFileSync(__dirname + "/../log.txt", msg); olderr(msg) }

module.exports.get = {}

module.exports.get.byName = async function (exactName) {
    var out = {}
    try {
        out = await axios.get(baseUrl + "/towns/search/findByName?name=" + exactName)
    } catch (e) {

    }

    if (out.data) {
        return {
            error: false,
            data: out.data._embedded
        }
    } else {
        return {
            error: true
        }
    }
}

module.exports.get.byArea = async function (area) {
    // area = north, east, south, west (STRING)
    var out = {}
    try {
        out = await axios.get(baseUrl + "/towns/search/findByWorld?world=" + area)
    } catch (e) {

    }

    if (out.data) {
        return {
            error: false,
            data: out.data._embedded //(Returns multiple towns!)
        }
    } else {
        return {
            error: true
        }
    }
}


module.exports.get.fullList = async function () {
    var out = {}
    try {
        out = await axios.get(baseUrl  + "/towns?size=1000")
    } catch (e) {

    }

    if (out.data) {
        for (var i = 0; i < out.data.page.totalPages; i++) {
            var out = []
            var error = false
            try {
                var res = await axios.get(baseUrl + "/towns?size=1000&page=" + i)
                for (var i2 = 0; i2 < res.data._embedded.towns.length; i2++) {
                    out.push(res.data._embedded.towns[i2])
                }
            } catch (e) {
                error = true
            }

            if (error) {
                return {
                    error: true
                }
            } else {
                return {
                    error: false,
                    data: out
                }
            }
        }
    } else {
        return {
            error: true
        }
    }
}



module.exports.custom = {}

module.exports.custom.userTownSearch = async function (searchQuery) { // Primairly used for user interaction. Town searching, use it like you do with google.
    var out = {}
    try {
        out = await axios.get(baseUrl + "/towns?size=1000")
    } catch (e) {

    }

    if (out.data) {
        var hits = []

        for (var i = 0; i < out.data._embedded.towns.length; i++) {
            if (out.data._embedded.towns[i].name.toLowerCase().includes(searchQuery.toLowerCase())) {
                hits.push(out.data._embedded.towns[i].name)
            }
        }

        return {
            error: false,
            hits: hits,
            selectoption: (option) => {  //Option must be an int
                if (hits[option]) {

                    return {
                        error: false,
                        data: hits[option] //Sucess
                    }

                } else {
                    return {
                        error: true  //Invalid option
                    }
                }
            }
        }


    } else {
        return {
            error: true
        }
    }
}

async function townChecker(){
    var latest

    if (main.programSettings.logs.town.preserveLogs){
        latest = await JSON.parse(await fs.readFileSync(main.programSettings.logs.town.filePath).toLocaleString())
    } else {
        if (main.programSettings.logs.town.useNewAsLatest){
            latest = []
        } else {
            latest = await module.exports.get.fullList().data
        }
    }



    setInterval(async () => {
        const data = await module.exports.get.fullList()
        if (data.error) { await fs.appendFileSync(__dirname + "/../log.txt", "Error at fetching town full list"); return }

        

        var tableA = latest
        var tableB = data.data
        //A is old
        //B is new
        const newItems = tableB.filter((itemB) => !tableA.find((itemA) => itemA.id === itemB.id));
        if (newItems.length > 0) {
            //console.log(newItems)
            for (var i = 0; i < newItems.length; i++) {
                var c = newItems[i]
        
                events.fireEvents('ontownappend', c)
            }
        }

        const removedItems = tableA.filter((itemA) => !tableB.find((itemB) => itemB.id === itemA.id));

        if (removedItems.length > 0) {
            //console.log(removedItems)
            for (var i = 0; i < removedItems.length; i++) {
                var c = removedItems[i]
        
                events.fireEvents('ontownremove', c)
            }
        }


        await fs.writeFileSync(main.programSettings.logs.town.filePath,JSON.stringify(tableB))
        latest = tableB

    }, main.programSettings.settings.events.town.checkInterval)
}

module.exports.start = function(){
    if (main.programSettings.settings.events.town.enabled){
       townChecker() 
    }
}