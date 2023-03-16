module.exports.get = {}


module.exports.get.byName = async function (exactName) {
    var out = {}
    try {
        out = await axios.get("http://testapi.lokamc.com/players/search/findByName?name=" + exactName)
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
        out = await axios.get("http://testapi.lokamc.com/players/search/findByUuid?uuid=" + uuid)
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
