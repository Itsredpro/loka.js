const axios = require("axios")
const main = require(__dirname + "/../index.js")
//Log errors to file.
var olderr = console.error; console.error = async function(msg){await require("fs").appendFileSync(__dirname + "/../log.txt",msg);olderr(msg)}



const baseUrl = main.programSettings.settings.baseUrl || "https://www.api.lokamc.com"




module.exports.get = {}


module.exports.get.byName = async function (exactName) {
    var out = {}
    try {
        out = await axios.get(baseUrl + "/players/search/findByName?name=" + exactName)
    } catch (e) {

    }

    if (out.data) {
        return {
            error: false,
            data: out.data
        }
    } else {
        return {
            error: true
        }
    }
}


module.exports.get.byUuid = async function (uuid) {
    var out = {}
    try {
        out = await axios.get(baseUrl + "/players/search/findByUuid?uuid=" + uuid)
    } catch (e) {

    }

    if (out.data) {
        return {
            error: false,
            data: out.data
        }
    } else {
        return {
            error: true
        }
    }
}

module.exports.get.fullList = async function(){
    var out = {}
    try {
        out = await axios.get(baseUrl + "/players?size=1000")
    } catch(e){

    }

    if (out.data){
        for (var i = 0; i< out.data.page.totalPages; i++){
            var out = []
            var error = false
            try {
                var res = await axios.get(baseUrl + "/players?size=1000&page=" + i)
                for (var i2 = 0; i2< res.data._embedded.players.length; i2++){
                    out.push(res.data._embedded.players[i2])
                }
            } catch(e){
                error = true
            }

            if (error){
                return {
                    error:true
                }
            } else {
                return {
                    error:false,
                    data:out
                }
            }
        }
    } else {
        return {
            error:true
        }
    }
}