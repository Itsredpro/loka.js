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


module.exports.get.fullList = async function(){
    var out = {}
    try {
        out = await axios.get("https://testapi.lokamc.com/towns?size=1000")
    } catch(e){

    }

    if (out.data){
        for (var i = 0; i< out.data.page.totalPages.length; i++){
            var out = []
            var error = false
            try {
                var res = await axios.get("https://testapi.lokamc.com/towns?size=1000&page=" + i)
                for (var i2 = 0; i2< res.data._embedded.towns.length; i2++){
                    out.push(res.data._embedded.towns[i2])
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



module.exports.custom = {}

module.exports.custom.userTownSearch = async function(searchQuery){ // Primairly used for user interaction. Town searching, use it like you do with google.
    var out = {}
    try {
        out = await axios.get("https://testapi.lokamc.com/towns?size=1000")
    } catch(e){

    }

    if (out.data){
        var hits = []

        for (var i = 0; i <  out.data._embedded.towns.length; i++){
            if (out.data._embedded.towns[i].name.toLowerCase().includes(searchQuery.toLowerCase())){
                hits.push(out.data._embedded.towns[i].name)
            }
        }

        return {
            error:false,
            hits:hits,
            selectoption:(option)=>{  //Option must be an int
                if (hits[option]){

                    return {
                        error:false,
                        data:hits[option] //Sucess
                    }

                } else {
                    return {
                        error:true  //Invalid option
                    }
                }
            }
        }


    } else {
        return {
            error:true
        }
    }
}