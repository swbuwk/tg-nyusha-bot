import { Context } from "telegraf";
import { MaybeArray } from "telegraf/typings/core/helpers/util";
import {
  ReactionType,
  TelegramEmoji,
} from "telegraf/typings/core/types/typegram";
import { Digit } from "telegraf/typings/reactions";
import { aiAnswer } from "./aiAnswer";

const rudeWords = ["туп", "идиот", "глуп"];
const niceWords = ["умн", "мудр"];

export function recognizeReaction(
  ctx: Context
): MaybeArray<TelegramEmoji | `${Digit}${string}` | ReactionType> | null {
  if (ctx.text?.includes("нюш")) {
    console.log(`command(reaction): "${ctx.text}"`);

    let isRude = rudeWords.some((word) => ctx?.text?.includes(word));
    let isNice = niceWords.some((word) => ctx?.text?.includes(word));

    if (isRude && isNice) {
      return "🦄";
    }
    if (isRude) {
      return "💊";
    }
    if (isNice) {
      return "❤";
    }
  }
  return null;
}

export async function recognizeCommand(ctx: Context): Promise<string | null> {
  const groupFixedText = ctx.text?.[0] === "/" ? ctx.text?.slice(1) : ctx.text;
  const firstWord = groupFixedText?.split(" ")[0];

  if (!firstWord?.startsWith("нюш")) return null;

  const text = groupFixedText?.slice(firstWord?.length + 1) || "";

  if (text.replace(/\s/g, "").length === 0) {
    return null;
  }

  console.log(`command(text): "${text}"`);

  if (text === "привет") {
    return "мяу";
  }

  return await aiAnswer(ctx, text);
}
