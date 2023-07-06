//const axios = require("axios")
const fs = require("fs");
const packageData = require(__dirname + "/package.json")
//const events = require(__dirname + "/../events.js")
//const main = require(__dirname + "/../index.js")



async function preparePublish(){
    var version = packageData.version
    var readed = await fs.readFileSync(__dirname + "/package.json").toString()
    var pkg = await JSON.parse(readed)

    console.log("[UPDATER] - Doing prepublish preps")

    var small = 1
    var mid = 10
    var huge = 100

    var intVersion = await parseInt(await pkg.version.split(".").join(""))
    var newVersion = intVersion + small

    var restringed = await newVersion.toString().split("").join(".")

    console.log("[UPDATER] - Updating from " + version + " to " + restringed)

    pkg.version = restringed

    await fs.writeFileSync(__dirname + "/package.json", await JSON.stringify(pkg))

    console.log("[UPDATER] - Done packaging")
}


if (process.argv.indexOf("--pkg") != -1){
    console.log("[UPDATER] - pkg")
    preparePublish()
}

