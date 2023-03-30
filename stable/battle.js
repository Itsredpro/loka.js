const axios = require("axios")
const events = require(__dirname + "/../events.js")

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
      data: out.data._embedded
    }
  } else {
    return {
      error: true
    }
  }
}



var tableA = ''

function battleChecker(CheckInterval) {
  console.log("[Loka.js][LOG] - Running battle checker")

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

        if (tableA != ''){

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
        }

        tableA = tableB

      }
    } else {
      console.error(
        `[Loka.js][${new Date().toString().split(" (")[0]}] - Could not fetch data due to an axios error.`
      );
    }
  }, CheckInterval || 20000);
};

module.exports.start = function(){
  battleChecker()
}