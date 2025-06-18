import { Context } from "telegraf";

import { author, name, version } from "../../package.json";

export const about = () => async (ctx: Context) => {
  const message = `*${name} ${version}*\nBy: ${author}`;
  await ctx.replyWithMarkdownV2(message, { parse_mode: "Markdown" });
};
