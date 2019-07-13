const Koa = require("koa");
const router = require("./router");
const port = process.env.UTILS_PORT || 4000;
const app = new Koa();
app.use(router.routes()).use(router.allowedMethods());
app.listen(port);
console.log("listen at http://localhost:" + port);
