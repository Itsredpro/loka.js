const axios = require("axios")

//Log errors to file.
var olderr = console.error; console.error = async function(msg){await require("fs").appendFileSync(__dirname + "/../log.txt",msg);olderr(msg)}


const baseUrl = main.programSettings.settings.baseUrl || "https://www.api.lokamc.com"


module.exports.get = {}

module.exports.get.byId = async function(Id){
    var out = {}
    try {
        out = await axios.get(baseUrl + "/territories/search/findById?id=" + Id)
    } catch(e){

    }

    if (out.data){
        return {
            error:false,
            data:out.data._embedded
        }
    } else {
        return {
            error:true
        }
    }
    
}

module.exports.get.byNumb = async function(Numb){
    var out = {}
    try {
        out = await axios.get(baseUrl + "/territories/search/findByNum?num=" + Numb)
    } catch(e){

    }

    if (out.data){
        return {
            error:false,
            data:out.data._embedded
        }
    } else {
        return {
            error:true
        }
    }
}

module.exports.get.byWorldAndNumb = async function (world, numb){
    var out = {}
    try {
        out = await axios.get(baseUrl + "/territories/search/findByNum?num=" + numb + "&world=" + world)
    } catch(e){

    }

    if (out.data){
        return {
            error:false,
            data:out.data._embedded
        }
    } else {
        return {
            error:true
        }
    }
}
module.exports.custom = {}

module.exports.custom.byTown = async function(townId){
    var out = {}
    try {
        out = await axios.get(baseUrl + "/territories?size=1000")
    } catch(e){

    }

    if (out.data){
        var retData = []

        for (var i = 0;i < out.data._embedded.territories_pts.length; i++){
            if (out.data._embedded.territories_pts[i].tg.townId != null && out.data._embedded.territories_pts[i].tg.townId == townId){
                retData.push(out.data._embedded.territories_pts[i])
            }
        }

        if (retData.length > 0){
            return {
                error:false,
                data:retData
            }
        } else {
            return {
                noTerritories:true,
                error:false
            }
        }

    } else {
        return {
            error:true
        }
    }

}