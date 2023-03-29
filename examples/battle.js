const events = require(__dirname + "/../events.js")

const event = events.registerEvent('onbattle', async function(){
    console.log(`[${(new Date).toString().split(" (")[0]}] ${battle.id}`)

    //events.disconnectLisener(event.id)
})

/*
--- Events class ---

events.registerEvent(String eventType, Function callback)
returns > Event object

events.disconnectLisener(String id)
returns {error:Boolean}

events.fireEvents(String eventType, Any args)
returns

--- Object types ---

Event object
{
    id:String,
    error:Boolean
}

--- Valid Event Types ---
test         (for testing)
onbattle     (fires when new battle appendes)


*/