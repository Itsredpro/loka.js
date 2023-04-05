const events = require(__dirname + "/../events.js")

const event = events.registerEvent('ontownappend', async function(town){
    console.log(`[${(new Date).toString().split(" (")[0]}] ${town.id}`)

    //events.disconnectLisener(event.id)
})

/*
--- Events class ---

events.registerEvent(String eventType, Function callback)
returns > Event object

events.disconnectLisener(String id)
returns {error:Boolean}

events.fireEvents(String eventType, Any args)
returns void

--- Object types ---

Event object
{
    id:String,
    error:Boolean
}

--- Valid Event Types ---
check readme.md

*/