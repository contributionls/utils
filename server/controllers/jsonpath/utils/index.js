const path = require("path");
const debug = require("debug")("jsonpath");
const axios = require("axios");
const yamlUtil = require("../../../utils/yaml");
const iniUtil = require("../../../utils/ini");
const jsonpathUtil = require("../../../utils/jsonpath");
const allowTypes = [".yaml", ".yml", ".json", ".ini", ".conf", ".txt"];
//options
// type, default read from suffix,or yaml
// combine stragety refer<https://www.npmjs.com/package/deepmerge> default params.
async function jsonpath(url, options) {
  if (
    url &&
    typeof url === "string" &&
    options &&
    options.jsonpath &&
    typeof options.jsonpath === "string"
  ) {
    const jsonpath = options.jsonpath;
    // check url type
    let fileType = "yaml";
    const ext = path.extname(url);
    if (ext && allowTypes.includes(ext)) {
      fileType = ext.substring(1);
    }

    options = Object.assign(
      {
        source: fileType
      },
      options
    );
    // handle  options
    if (options.source === "yml") {
      options.source = "yaml";
    } else if (options.source === "conf" || options.source === "txt") {
      options.source = "ini";
    }
    debug("convert options: %o", options);
    // get file content
    let jsonResult = "";
    try {
      const responses = await axios.get(url);
      debug("response %o", responses);
      // convert the content to json
      const item = responses.data;
      debug("response %s", item);
      if (options.source === "yaml") {
        jsonResult = yamlUtil.yamlToJson(item);
      } else if (options.source === "ini") {
        jsonResult = iniUtil.iniToJson(item);
      } else if (options.source === "json") {
        jsonResult = item;
      }
      console.log("jsonResult, jsonpath", jsonResult, jsonpath);
      // jsonpath
      const jsonpathResult = jsonpathUtil.query(jsonResult, jsonpath);
      let finalResult = {
        headers: {}
      };
      console.log("jsonpathResult", jsonpathResult);
      if (jsonpathResult && jsonpathResult.length > 0) {
        finalResult.type = "text/plain";
        finalResult.body = jsonpathResult[0];
      } else {
        finalResult.type = "text/plain";
        finalResult.body = "";
      }
      return finalResult;
    } catch (error) {
      throw error;
    }
  } else {
    const error = new Error("invalid url params");
    error.expose = true;
    throw error;
  }
}

exports.jsonpath = jsonpath;

// jsonpath(
//   "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.json",
//   {
//     jsonpath: "$.foo.bar"
//   }
// )
//   .then(data => {
//     console.log("data", data);
//   })
//   .catch(e => {
//     console.log("e", e);
//   });
