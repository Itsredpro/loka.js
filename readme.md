
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
test         (for testing)\
onbattle     (fires when new battle appendes)



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