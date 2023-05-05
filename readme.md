
# Loka.js
#### The first (un)official loka api!


Welcome to the loka.js api!\
by itsredstonepro#0979

## Installation:
Installation requires nodejs >= 1.12\
`npm i loka.js axios`


more docs coming soon

## Events.js usage

#### --- Events class ---
const events = require("loka.js").events\
\
events.registerEvent(String eventType, Function callback)\
returns > Event object\
\
events.disconnectLisener(String id)\
returns {error:Boolean}\
\
events.fireEvents(String eventType, Any args)\
returns void

#### --- Object types ---
\
Event object\
{\
    id:String,\
    error:Boolean\
}

#### --- Valid Event Types ---
test             (for testing)\
onbattle         (fires when new battle appendes)\
ontownappend     (fires when new town appendes)\
ontownremove     (fires when town is destoyed/fallen)\
onallianceappend (fires when new alliance appendes)\
onallianceremove (fires when alliance is destroyed/fallen)

#### --- Preserved event logs ---

Event logs can be preserved between multiple runs/program starts. The settings are located in the top section of the loka.js's index.js.\
You can generate new logs by running:  node node_modules/loka.js --noRun --loadNewLogs    , this will generate up-to-date logs into the saves.\
If preservedLogs equals true then the latest data will be get from the save files on program startup, this can be handy if your program crashes a lot.\
If preservedLogs equals false then there are 2 options, useNewAsLatest can be true or false, if true then an empty table will be used as the latest and all events will rapidly fire (because it things there are lots of changes). Or useNewAsLatest can be false, then the current "situation" will be used as the latest.\
You can also change the log save locations as you like by adjusting the filePath parameter.

## Api Tree

- territory
    - get
        - byId
        - byNumb
        - byWorldAndNumb
    - custom
        - byTown
- town
    - get
        - byName
        - byArea
        - byTown
    - custom
        - userTownSearch (for user interaction)
- alliance
    - get
        - byName
        - fullList
- player
    - get
        - byName
        - byUuid
        - fullList
- market_buy
    - get
        - byType
        - fullList
- market_sales
    - get
        - byType
        - fullList
- battle
    - get
        - battles
- transaction
    - get
        - byName
        - byType
        - byOwnerUuid
        - byBuyerUuid