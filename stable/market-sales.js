module.exports.get = {}

module.exports.get.byType = async function(Type){
    var out = {}
    try {
        out = await axios.get("http://testapi.lokamc.com/market_sales/search/findByType?type=" + Type)
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

module.exports.get.fullList = async function(){
    var out = {}
    try {
        out = await axios.get("http://testapi.lokamc.com/market_sales?size=1000")
    } catch(e){

    }

    if (out.data){
        for (var i = 0; i< out.data.page.totalPages.length; i++){
            var out = []
            var error = false
            try {
                var res = await axios.get("http://testapi.lokamc.com/market_sales?size=1000&page=" + i)
                for (var i2 = 0; i2< res.data._embedded.market_sales.length; i2++){
                    out.push(res.data._embedded.market_sales[i2])
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