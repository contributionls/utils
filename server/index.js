const Koa = require("koa");
const cors = require("@koa/cors");
const router = require("./router");
const port = process.env.UTILS_PORT || 4000;
const app = new Koa();
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.listen(port);
