const axios = require("axios")
const events = require(__dirname + "/../events.js")
const main = require(__dirname + "/../index.js")
const fs = require("fs")

//Log errors to file.
var olderr = console.error; console.error = async function (msg) { await require("fs").appendFileSync(__dirname + "/../log.txt", msg); olderr(msg) }


module.exports.get = {}

module.exports.get.battles = async function () {
  var out = {}
  try {
    out = await axios.get("https://testapi.lokamc.com/territories/search/findBattles")
  } catch (e) {

  }

  if (out.data) {
    return {
      error: false,
      data: out.data._embedded.territories
    }
  } else {
    return {
      error: true
    }
  }
}





async function battleChecker() {
  var tableA = []


  if (main.programSettings.logs.battle.preserveLogs){
    tableA = await JSON.parse(await fs.readFileSync(main.programSettings.logs.battle.filePath).toLocaleString())
  } else {
      if (main.programSettings.logs.battle.useNewAsLatest){
        tableA = []
      } else {
        tableA = await module.exports.get.battles().data
      }
  }


  var loop = setInterval(async () => {
    var results = {};

    try {
      results = await axios.get(
        "https://testapi.lokamc.com/territories/search/findBattles"
      );
    } catch (e) { }

    if (results.data != undefined && results.data._embedded != undefined) {
      var territories = results.data._embedded.territories;

      if (territories.length > 0) {
        // TODO: Check for new battles
        var tableB = territories

        //if (tableA != ''){

          const newItems = tableB.filter((itemB) => !tableA.find((itemA) => itemA.id === itemB.id));
          if (newItems.length > 0){
            //console.log(newItems)
          }
          //console.log('New items:', newItems);

          for (var i = 0; i < newItems.length; i++){
            var c = newItems[i]

            events.fireEvents('onbattle', c)
          }
          
          const removedItems = tableA.filter((itemA) => !tableB.find((itemB) => itemB.id === itemA.id));
          //console.log('Removed items:', removedItems);

          if (removedItems.length > 0){
            //console.log(removedItems)
          }

          if (removedItems.length == 0 && newItems.length == 0){
            //console.log("[Loka.js][LOG] - no changes found.")
            //console.log(Object.keys(tableB))
          }
        //}
        

        await fs.writeFileSync(main.programSettings.logs.battle.filePath,JSON.stringify(tableB))
        tableA = tableB

      }
    } else {
      console.error(
        `[Loka.js][${new Date().toString().split(" (")[0]}] - Could not fetch data due to an axios error.`
      );
    }
  },  main.programSettings.logs.battle.checkInterval);
};

module.exports.start = function(){
  battleChecker()
}