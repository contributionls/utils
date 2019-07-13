const Koa = require("koa");
const Router = require("koa-router");
const { merge } = require("./utils");
const port = process.env.MERGE_PORT || 3000;
const app = new Koa();
const router = new Router();

router.get("/", async ctx => {
  // ctx.router available
  // TODO UI
  ctx.body = "Hello Koa";
});

router.get("/merge", async ctx => {
  const query = ctx.query;
  let urls = query["urls[]"] || query["urls"];
  if (typeof urls === "string") {
    urls = [urls];
  }
  if (Array.isArray(urls)) {
    const options = {};
    const queryType = query.type;
    if (queryType) {
      options.type = queryType;
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
      "Query urls is invalid.The correct form is https://merge.utils.men/merge?urls[]={url}&urls[]={url2}&urls[]={url3}"
    );
    e.status = 400;
    e.expose = true;
    throw e;
  }
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(port);
console.log("listen at http://localhost:" + port);
