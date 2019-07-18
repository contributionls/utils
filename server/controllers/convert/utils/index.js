const path = require("path");
const debug = require("debug")("convert");
const axios = require("axios");
const yamlUtil = require("../../../utils/yaml");
const iniUtil = require("../../../utils/ini");

const allowTypes = [".yaml", ".yml", ".json", ".ini", ".txt", ".conf"];
//options
// type, default read from suffix,or yaml
// combine stragety refer<https://www.npmjs.com/package/deepmerge> default params.
async function convert(url, options) {
  if (
    url &&
    typeof url === "string" &&
    options &&
    options.dest &&
    typeof options.dest === "string" &&
    allowTypes.includes(`.${options.dest}`)
  ) {
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
      // debug('response %o',responses)
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

      let finalResult = {
        body: "For some reason,the convert failed!",
        headers: {}
      };
      if (options.dest === "yaml") {
        finalResult.body = yamlUtil.jsonToYaml(jsonResult);
        finalResult.source = "text/vnd.yaml";
      } else if (options.dest === "ini") {
        finalResult.body = iniUtil.jsonToIni(jsonResult);
      } else if (options.dest === "json") {
        finalResult.body = JSON.stringify(jsonResult, null, 2);
        finalResult.type = "json";
      } else {
        finalResult.type = "text/plain";
      }
      return finalResult;
    } catch (error) {
      console.log("err", error);
      throw error;
    }
  } else {
    const error = new Error("invalid url params");
    error.expose = true;
    throw error;
  }
}

exports.convert = convert;
