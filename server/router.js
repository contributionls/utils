const Router = require("koa-router");
const router = new Router();
const { merge } = require("./controllers/merge");
const { convert } = require("./controllers/convert");
const { jsonpath } = require("./controllers/jsonpath");
const { template } = require("./controllers/template");
router.get("/", async ctx => {
  // ctx.router available
  // TODO UI
  ctx.body = "Hello Koa";
});

router.get("/merge", merge);
router.get("/convert", convert);
router.get("/jsonpath", jsonpath);
router.get("/template", template);

module.exports = router;
