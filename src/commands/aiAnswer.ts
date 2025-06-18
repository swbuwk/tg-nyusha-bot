import { Context } from "telegraf";

export const aiAnswer = async (ctx: Context, prompt: string) => {
  console.log(`Staring AI answer for "${prompt}"`);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat:free",
      messages: [
        {
          role: "user",
          content: `${prompt}. Отвечай как ОЧЕНЬ глупая кошка. Не пытайся быть милой, просто глупой кошкой. отвечай короткими предложениями, передающими твои эмоции или мысли. Не забывай о теме разговора, просто обсуждай её как глупая кошка.`,
        },
      ],
    }),
  }).then((res) => res.json());

  console.log(`AI answer: ${res?.choices?.[0]?.message}`);

  const answer = res?.choices?.[0]?.message?.content || "бабубэээ :D";

  return answer;
};
