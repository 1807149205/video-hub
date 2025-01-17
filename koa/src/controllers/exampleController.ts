import { Context } from "koa";

export const getExample = async (ctx: Context) => {
  ctx.body = { message: "GET request successful" };
};

export const postExample = async (ctx: Context) => {
  const body = ctx.request.body;
  ctx.body = { message: `POST request received with name: ${body}` };
};
