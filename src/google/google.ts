import { Message } from "whatsapp-web.js";
// import got from "got"

export default async function googleSearch(message: Message) {
  let prompt: string = message.body.split(" ").slice(1).join(" ")
  if (prompt.length == 0) return await message.reply("irregular google search")

  const url = new URL("https://www.google.com/search")
  const urlSearchParams = new URLSearchParams()
} 
