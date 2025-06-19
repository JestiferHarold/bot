import { Jimp } from "jimp";
import { Chat, Contact, Message, MessageMedia } from "whatsapp-web.js";

export async function suiiiiii(message: Message) {
  const chat: Chat = await message.getChat()
  const mentions: Array<Contact> = await message.getMentions()
  let profileOpacity: number
  let ronaldoOpacity: number

  if (mentions.length == 0) {
    return 
  }

  const userProfilePictureURL: string = await mentions[0].getProfilePicUrl()
  const ronaldoURL: string = "https://static0.givemesportimages.com/wordpress/wp-content/uploads/2022/05/GettyImages-81191334.jpg"

  if (userProfilePictureURL == null) {
    return message.react("❌")
  }

  if (message.body.split(" ").length >= 3) {
    try {
      profileOpacity = parseFloat(message.body.split(" ")[1])
      ronaldoOpacity = parseFloat(message.body.split(" ")[2])
    } catch (error) {}
  }

  const ronaldo = await Jimp.read(ronaldoURL)
  const poorSoul = await Jimp.read(userProfilePictureURL)

  poorSoul.autocrop()
  ronaldo.crop(
    {
      h: poorSoul.height,
      w: poorSoul.width,
      x: 100,
      y: 100
    }
  )

  //@ts-ignore
  poorSoul.opacity((profileOpacity == undefined ? 0.8 : profileOpacity))
  //@ts-ignore
  ronaldo.opacity((ronaldoOpacity == undefined ? 0.4 : ronaldoOpacity))

  poorSoul.composite(ronaldo, 0, 0)

  const base64: string = (await poorSoul.getBase64("image/png")).split(",")[1]
  const media: MessageMedia = new MessageMedia("image/png", base64, "ronado.png")

  return await message.reply(media)
}
