import { Context, Next } from "koa";

export default async function cors(ctx: Context, next: Next) {
  ctx.set("Access-Control-Allow-Origin", "*"); // 允许所有域名访问
  ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // 允许的 HTTP 方法
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With" // 允许的请求头
  );
  ctx.set("Access-Control-Allow-Credentials", "true"); // 允许发送 Cookie（如果需要）
  if (ctx.method === "OPTIONS") {
    ctx.status = 204; // 处理预检请求
    return;
  }
  await next();
}
