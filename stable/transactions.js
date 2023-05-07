const axios = require("axios")
const fs = require("fs");
const events = require(__dirname + "/../events.js")
const main = require(__dirname + "/../index.js")

//Log errors to file.
var olderr = console.error; console.error = async function (msg) { await require("fs").appendFileSync(__dirname + "/../log.txt", msg); olderr(msg) }

module.exports.get = {}

module.exports.get.byName = async function (exactName) {
    var out = {}
    try {
        out = await axios.get("http://testapi.lokamc.com/completed_market_orders/search/findByName?name=" + exactName)
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

module.exports.get.byOwnerUuid = async function (uuid) {
    var out = {}
    try {
        out = await axios.get("http://testapi.lokamc.com/completed_market_orders/search/findByOwnerId?uuid=" + uuid)
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


module.exports.get.byBuyerUuid = async function (uuid) {
    var out = {}
    try {
        out = await axios.get("http://testapi.lokamc.com/completed_market_orders/search/findByBuyerId?uuid=" + uuid)
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

module.exports.get.byType = async function (type) {
    var out = {}
    try {
        out = await axios.get("http://testapi.lokamc.com/completed_market_orders/search/findByType?type=" + type)
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

module.exports.get.latest = async function () {
    var out = {}
    try {
        out = await axios.get("https://testapi.lokamc.com/completed_market_orders/latest")
    } catch (e) {

    }

    if (out.data) {
        return {
            error: false,
            data: out.data._embedded.completed_market_orders
        }
    } else {
        return {
            error: true
        }
    }
}


//=========== Transaction event ==============

async function transactionChecker() {
    var latest

    if (main.programSettings.logs.transaction.preserveLogs) {
        latest = await JSON.parse(await fs.readFileSync(main.programSettings.logs.transaction.filePath).toLocaleString())
    } else {
        if (main.programSettings.logs.transaction.useNewAsLatest) {
            latest = []
        } else {
            latest = await module.exports.get.latest().data
        }
    }


    setInterval(async function () {
        const data = await module.exports.get.latest()
        if (data.error) { await fs.appendFileSync(__dirname + "/../log.txt", "Error at fetching transaction latest list"); return }

        var tableA = latest
        var tableB = data.data


        const newItems = tableB.filter((itemB) => !tableA.find((itemA) => itemA.id === itemB.id));
        if (newItems.length > 0) {
            //console.log(newItems)
            for (var i = 0; i < newItems.length; i++) {
                var c = newItems[i]
                var unixTime = await getTime(c.id)
                c.unix = unixTime

                events.fireEvents('ontransaction', c)
            }
        }


        await fs.writeFileSync(main.programSettings.logs.transaction.filePath, JSON.stringify(tableB))
        latest = tableB
    }, main.programSettings.settings.events.transaction.checkInterval)
}




module.exports.start = function () {
    if (main.programSettings.settings.events.transaction.enabled) {
        transactionChecker()
    }
}





async function getTime(id) {
    var date = new Date(parseInt(id.substring(0, 8), 16) * 1000);
    const unixTransactionTime = await Date.parse(date)
    return unixTransactionTime
}

