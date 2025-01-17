import Koa from "koa";
import bodyParser from "koa-bodyparser";
// import cors from "./middlewares/cors";
import router from "./routes";
import cors from "koa2-cors";

const app = new Koa();
app.use(
    cors({
      origin: "*", // 可设置为特定域名
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
  );
// Middleware
// app.use(cors);

app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

export default app;
