module.exports.get = {}

module.exports.get.byName = async function(exactName){
    var out = {}
    try {
        out = await axios.get("http://testapi.lokamc.com/towns/search/findByName?name=" + exactName)
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

module.exports.get.byArea = async function(area){
    // area = north, east, south, west (STRING)
    var out = {}
    try {
        out = await axios.get("https://testapi.lokamc.com/towns/search/findByWorld?world=" + area)
    } catch(e){

    }

    if (out.data){
        return {
            error:false,
            data:out.data //(Returns multiple towns!)
        }
    } else {
        return {
            error:true
        }
    }
}


module.exports.custom = {}

module.exports.custom.userSearch = async function(searchQuery){
    var out = {}
    try {
        out = await axios.get("https://testapi.lokamc.com/towns?size=1000")
    } catch(e){

    }

    if (out.data){
        

        


    } else {
        return {
            error:true
        }
    }
}