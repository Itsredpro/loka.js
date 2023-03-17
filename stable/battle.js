const axios = require("axios")

module.exports.get = {}

module.exports.get.battles = async function(){
    var out = {}
    try {
        out = await axios.get("https://testapi.lokamc.com/territories/search/findBattles")
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