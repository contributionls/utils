const Router = require("koa-router");
const router = new Router();
const { merge } = require("./controllers/merge");
const { convert } = require("./controllers/convert");
const { jsonpath } = require("./controllers/jsonpath");
router.get("/", async ctx => {
  // ctx.router available
  // TODO UI
  ctx.body = "Hello Koa";
});

router.get("/merge", merge);
router.get("/convert", convert);
router.get("/jsonpath", jsonpath);

module.exports = router;
