import { Message, MessageMedia } from "whatsapp-web.js";

//One news article per message :: This can throw timeout error
let newsArticles = new Array();

export default async function getNews(message: Message) {
  let URL: string = "https://api.currentsapi.services/v1";

  if (newsArticles.length > 0 && (message.body.split("--").length == 1)) {
    let latest = newsArticles.pop()
  let body: string = `Title: ${latest.title}\n
Description: ${latest.description}\n
Author: ${latest.author}\n
Article URL: ${latest.url}\n
Category: ${latest.category.join("")}`

  return (latest.image == "None" ? await message.reply(body) : await message.reply(await MessageMedia.fromUrl(latest.image), undefined, {caption: body}))
  }

  if (
    (message.body.toLowerCase().split(" ").includes("--cat") ||
      message.body.toLowerCase().split(" ").includes("-c")) &&
    message.body.split(" ").length > 1
  ) {
    URL += "/available/categories";
    const response = await fetch(URL);
    const responseJson = await response.json();
    if (responseJson.status == "ok") {
      return await message.reply(
        `Available Categories : ${responseJson.categories.join(", ")}`
      );
    } else {
      return await message.reply("Error with news api");
    }
  }

  URL += `/latest-news?apiKey=${process.env.NIRANJANAS_NEWS_API_KEY_LOL}${
    message.body.split(" ").length > 1
      ? "&category=" + message.body.split(" ").slice(1).join("")
      : ""
  }`;

  const response = await fetch(URL);
  const responseJson = await response.json();
  if (responseJson.status != "ok") {
    return await message.reply("API ERROR");
  }

  newsArticles = responseJson.news;
  
  if (newsArticles.length == 0) {
    return 
  }

  let latest = newsArticles.pop()
  let body: string = `Title: ${latest.title}\n
Description: ${latest.description}\n
Author: ${latest.author}\n
Article URL: ${latest.url}\n
Category: ${latest.category.join("")}`

  return (latest.image == "None" ? await message.reply(body) : await message.reply(await MessageMedia.fromUrl(latest.image), undefined, {caption: body}))
}
