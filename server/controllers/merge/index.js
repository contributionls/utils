const { merge } = require("./utils");

exports.merge = async function(ctx) {
  const query = ctx.query;
  let urls = query["urls[]"] || query["urls"];
  if (typeof urls === "string") {
    urls = urls.split(",");
  }
  if (Array.isArray(urls)) {
    const options = {};
    const queryType = query.source;
    if (queryType) {
      options.source = queryType;
    }
    try {
      const { body, type } = await merge(urls, options);
      ctx.type = type;
      ctx.body = body;
    } catch (error) {
      error.status = 500;
      error.expose = true;
      throw error;
    }
  } else {
    const e = new Error(
      "Query urls is invalid.The correct form is https://api.utils.men/merge?urls[]={url}&urls[]={url2}&urls[]={url3}"
    );
    e.status = 400;
    e.expose = true;
    throw e;
  }
};
