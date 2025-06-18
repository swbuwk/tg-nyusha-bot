import dotenv from "dotenv";
import createDebug from "debug";
import { Context, Telegraf } from "telegraf";
import { recognizeCommand, recognizeReaction } from "./commands";
import { about } from "./commands/about";

dotenv.config();
const token = process.env.TELEGRAM_BOT_TOKEN;

const debug = createDebug("bot:dev");

if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is missing in .env file");
}

const bot = new Telegraf(token);

bot.command("about", about());
bot.on("message", async (ctx: Context) => {
  const reaction = recognizeReaction(ctx);
  if (reaction) {
    await ctx.react(reaction);
    return;
  }
  const command = await recognizeCommand(ctx);
  if (command) {
    await ctx.reply(command);
    return;
  }
});

bot.launch(() => {
  debug("Bot started!");
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
