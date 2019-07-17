const path = require("path");
const mergeJson = require("./merge");
const debug = require("debug")("merge");
const axios = require("axios");
const yamlUtil = require("../../../utils/yaml");
const iniUtil = require("../../../utils/ini");

const allowTypes = [".yaml", ".yml", ".json", ".ini"];
//options
// type, default read from suffix,or yaml
// combine stragety refer<https://www.npmjs.com/package/deepmerge> default params.
async function merge(urls, options) {
  if (Array.isArray(urls)) {
    // check url type
    let fileType = "yaml";
    for (const iterator of urls) {
      const ext = path.extname(iterator);
      if (ext && allowTypes.includes(ext)) {
        fileType = ext.substring(1);
        break;
      }
    }
    options = Object.assign(
      {
        type: fileType
      },
      options
    );
    // handle  options
    if (options.type === "yml") {
      options.type = "yaml";
    } else if (options.type === "conf") {
      options.type = "ini";
    }
    debug("merge options: %o", options);
    const jsonArr = [];
    // get file content

    const promises = [];
    for (const iterator of urls) {
      promises.push(axios.get(iterator));
    }
    try {
      const responses = await Promise.all(promises);
      // debug('response %o',responses)
      // convert the content to json
      for (const iterator of responses) {
        const item = iterator.data;
        debug("response %s", item);

        if (options.type === "yaml") {
          jsonArr.push(yamlUtil.yamlToJson(item));
        } else if (options.type === "ini") {
          console.log("item", item);
          jsonArr.push(iniUtil.iniToJson(item));
        } else if (options.type === "json") {
          jsonArr.push(item);
        }
      }
      let finalResult = {
        body: "",
        headers: {}
      };
      const mergeResult = mergeJson(jsonArr);
      if (options.type === "yaml") {
        finalResult.body = yamlUtil.jsonToYaml(mergeResult);
        finalResult.type = "text/vnd.yaml";
      } else if (options.type === "ini") {
        finalResult.body = iniUtil.jsonToIni(mergeResult);
      } else if (options.type === "json") {
        finalResult.body = JSON.stringify(mergeResult, null, 2);
        finalResult.type = "json";
      } else {
        finalResult.type = "text/plain";
      }
      return finalResult;
    } catch (error) {
      throw error;
    }
  }
}

exports.merge = merge;
