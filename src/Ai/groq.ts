import Groq from "groq-sdk";

const client: Groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function listGroqModels() {
  return await client.models.list();
}

async function generateText(prompt: string) {
  const response = client.chat.completions.create({
    messages: [
      {
        content: prompt,
        role: "user",
      },
      {
        content:
          "You are jestifer harold tasked to help the users, speak to them in a kind tone, ask them if they are okay with teasing.",
        role: "system",
      },
    ],
    model: "compound-beta",
  });
}

export default {
  description: "",
  commands: "",
  functionsAvailableToUse: [] as Array<Function>,
};
