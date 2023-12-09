var entries = require("./entries.json");
var categories = require("./categories.json");
var entry = require("./entry.json");
// var thirdRoute  = require('./jsonfile3.json');
// var fourthRoute = require('./jsonfile4.json');
// and so on

module.exports = function () {
  return {
    categories: categories,
    entries: entries,
    entry: entry,

    // thirdRoute  : thirdRoute,
    // fourthRoute : fourthRoute
    // and so on
  };
};
