const { convert } = require("./utils");

exports.convert = async function(ctx) {
  const query = ctx.query;
  let url = query["url"];
  if (url && typeof url === "string") {
    const options = {};
    const source = query.source;
    const dest = query.dest;
    if (source) {
      options.source = source;
    }
    if (dest) {
      options.dest = dest;
    }
    try {
      const { body, type } = await convert(url, options);
      ctx.type = type;
      ctx.body = body;
    } catch (error) {
      error.status = 500;
      error.expose = true;
      throw error;
    }
  } else {
    const e = new Error(
      "Query url is invalid.The correct form is https://api.utils.men/convert?url={url}&dest=yaml"
    );
    e.status = 400;
    e.expose = true;
    throw e;
  }
};
