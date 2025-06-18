import dotenv from "dotenv";
import { Context, Telegraf } from "telegraf";
import { recognizeCommand, recognizeReaction } from "./commands";
import { about } from "./commands/about";

dotenv.config();
const token = process.env.TELEGRAM_BOT_TOKEN;

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
    const msgId = ctx.message?.message_id;
    if (command.reply && msgId) {
      await ctx.reply(command.text, {
        reply_parameters: { message_id: msgId },
      });
      return;
    }
    await ctx.reply(command.text);
    return;
  }
});

bot.launch(() => {
  console.log("Bot is running!");
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
