const Router = require("koa-router");
const router = new Router();
const { merge } = require("./controllers/merge");
router.get("/", async ctx => {
  // ctx.router available
  // TODO UI
  ctx.body = "Hello Koa";
});

router.get("/merge", merge);

module.exports = router;
