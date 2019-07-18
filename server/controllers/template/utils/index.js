const path = require("path");
const debug = require("debug")("template");
const axios = require("axios");
const yamlUtil = require("../../../utils/yaml");
const iniUtil = require("../../../utils/ini");
const templateUtil = require("../../../utils/template");
const allowTypes = [".yaml", ".yml", ".json", ".ini", ".conf", ".txt"];
//options
// type, default read from suffix,or yaml
// combine stragety refer<https://www.npmjs.com/package/deepmerge> default params.
async function template(url, options) {
  if (
    url &&
    typeof url === "string" &&
    options &&
    options.template &&
    typeof options.template === "string"
  ) {
    const template = options.template;
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
      // template
      const templateResult = templateUtil.template(template, jsonResult);
      let finalResult = {
        headers: {}
      };
      finalResult.type = "text/plain";
      finalResult.body = templateResult;
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

exports.template = template;
