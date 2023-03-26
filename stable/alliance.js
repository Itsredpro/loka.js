const axios = require("axios")

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
            data:out.data._embedded
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
        for (var i = 0; i< out.data.page.totalPages.length; i++){
            var out = []
            var error = false
            try {
                var res = await axios.get("https://testapi.lokamc.com/alliances?size=1000&page=" + i)
                for (var i2 = 0; i2< res.data._embedded.alliances.length; i2++){
                    out.push(res.data._embedded.alliances[i2])
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