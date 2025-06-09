import { Message } from "whatsapp-web.js";

export default async function websiteRank(message: Message) {

  if (message.links.length == 0) {
    return await message.react("❌") 
  }
 
  const links: Array<{
            link: string,
            isSuspicious: boolean
        }> = message.links
  
  if (links[0].isSuspicious) {
    return await message.react("❌") 
  }

  const URL: string = "https://api.codetabs.com/v1/alexa" + "?web=" + links[0].link
  const response = await fetch(URL)
  const responseJson = await response.json()

  if (responseJson.Error != undefined) {
    return await message.reply(responseJson.Error)
  }

  return await message.reply(`\`\`\`Website: ${responseJson.web}\n\nRank: ${responseJson.rank}\`\`\``)
}
