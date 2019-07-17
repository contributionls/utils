var ini = require("ini");
function jsonToIni(source) {
  try {
    return ini.stringify(source);
  } catch (e) {
    throw e;
  }
}

function iniToJson(source) {
  try {
    var doc = ini.parse(source);
    return doc;
  } catch (e) {
    throw e;
  }
}
exports.jsonToIni = jsonToIni;
exports.iniToJson = iniToJson;

var x = iniToJson(`
array[]={"does":"work","too":[1,2,3]}

[foo]
bar=3`);
console.log("x", x);
