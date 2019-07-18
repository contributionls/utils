const utils = require("./utils");
const jsonpathUtils = utils.jsonpath;

exports.jsonpath = async function(ctx) {
  const query = ctx.query;
  let url = query["url"];
  if (url && typeof url === "string") {
    const options = {};
    const source = query.source;
    const jsonpath = query.jsonpath;
    if (source) {
      options.source = source;
    }
    if (jsonpath) {
      options.jsonpath = jsonpath;
    }
    try {
      const { body, type } = await jsonpathUtils(url, options);
      ctx.type = type;
      ctx.body = body;
    } catch (error) {
      error.status = 500;
      error.expose = true;
      throw error;
    }
  } else {
    const e = new Error(
      "Query url is invalid.The correct form is https://api.utils.men/convert?url={url}&jsonpath=%24.foo"
    );
    e.status = 400;
    e.expose = true;
    throw e;
  }
};
