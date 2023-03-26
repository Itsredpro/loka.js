const axios = require("axios")

//Log errors to file.
var olderr = console.error; console.error = async function(msg){await require("fs").appendFileSync(__dirname + "/../log.txt",msg);olderr(msg)}


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

module.exports.custom = {}

module.exports.custom.onBattle = async function(func, CheckInterval){
    if (func && func instanceof Function){

        if (CheckInterval != undefined){
            if (!(CheckInterval instanceof Number)){
                throw new Error("Invalid argument type")
            }
        }

        const previousBattles = []

        var loop = setTimeout(async ()=>{
            var results

            try {
                results = axios.get("https://testapi.lokamc.com/territories/search/findBattles")
            } catch (e){

            }

            if (results.data._embedded){
                var territories = results.data._embedded.territories
                
                if (territories.length > 0){
                    var deletearray = previousBattles
                    //Check for new battles
                    for (var i = 0; i < territories.length; i++){
                        if (previousBattles.indexOf(territories[i].id) == -1){
                            //new battle, call lisener
                            func(territories[i])
                            previousBattles.push(territories[i].id)
                        } else {
                            //Get the fresh battles out of the gulac
                            deletearray.splice(deletearray.indexOf(territories[i].id),1)
                        }
                    }
                    //Clean old battles
                    for (var i2 = 0; i2< deletearray.length; i2++){
                        previousBattles.splice(previousBattles.indexOf(deletearray[i2],1))
                    }
                }
            } else {
                console.error(`[Loka.js][${(new Date).toString().split(" (")[0]}] - Could not fetch data due to an axios error.`)
            }

        },CheckInterval || 20000)

        return {
            error:false,
            disconnect:function(){
                clearInterval(loop)
            }
        }
    } else {
        throw new Error("Invalid argument type")
    }
}