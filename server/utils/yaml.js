const yaml = require("js-yaml");
function jsonToYaml(source) {
  try {
    return yaml.safeDump(source);
  } catch (e) {
    throw e;
  }
}

function yamlToJson(source) {
  try {
    var doc = yaml.safeLoad(source);
    return doc;
  } catch (e) {
    throw e;
  }
}
exports.jsonToYaml = jsonToYaml;
exports.yamlToJson = yamlToJson;
