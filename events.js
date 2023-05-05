const main = require(__dirname + "/index.js")
const register = {
    events:[
        {
            cb:function(){return},
            type:"test",
            id:"424583233839"
        }
    ]
}

const eventTypes = main.programSettings.eventSettings.eventTypes


module.exports.registerEvent = async function(eventType, callBack){
    if (eventType == undefined || typeof eventType != 'string'){
        throw new Error("eventType must be a string!")
    }
    if (callBack == undefined || typeof callBack != 'function'){
        throw new Error("callBack must be a function!")
    }
    if (eventTypes.indexOf(eventType.toLowerCase()) == -1){
        throw new Error("Invalid event type")
    }
    const newId = (Math.random() * 1000).toFixed(0).toString() + (Math.random() * 1000).toFixed(0).toString() + (Math.random() * 1000).toFixed(0).toString() + (Math.random() * 1000).toFixed(0).toString()

    register.events.push({
        id:newId,
        type:eventType,
        cb:callBack
    })

    return {
        error:false,
        id:newId
    }
}

module.exports.fireEvents = async function(eventType,args){ // void function
    if (eventType == undefined || typeof eventType != 'string'){
        throw new Error("eventType must be a string!")
    }
    if (eventTypes.indexOf(eventType.toLowerCase()) == -1){
        throw new Error("Invalid event type")
    }

    register.events.forEach((v)=>{
        if (v.type == eventType.toLocaleLowerCase()){
            v.cb(args)
        }
    })
}

module.exports.disconnectLisener = async function(id){
    if (id == undefined || typeof id != 'string'){
        throw new Error("callBack must be a function!")
    }
    var found = false

    for (var i = 0; i < register.events.length; i++){
        if (register.events[i].id == id){
            found = true
            register.events[i] = undefined
        }
    }
    if (found == false){
        return {
            error:true
        }
    } else {
        return {
            error:false
        }
    }
}