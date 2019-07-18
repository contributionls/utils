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
