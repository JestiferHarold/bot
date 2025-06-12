import got from "got"
import { Message } from "whatsapp-web.js";

export default async function googleSearch(message: Message) {
  const search = await got("https://www.google.com/search")
} 
