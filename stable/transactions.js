const axios = require("axios")
module.exports.get = {}

module.exports.get.byName = async function(exactName){
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

module.exports.get.byOwnerUuid = async function(uuid){
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


module.exports.get.byBuyerUuid = async function(uuid){
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

module.exports.get.byType = async function(type){
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