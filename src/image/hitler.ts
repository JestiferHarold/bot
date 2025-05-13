import { Jimp } from "jimp";
import { Chat, Client, Contact, Message, MessageMedia } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function HitlerlifyAvatar(wwclient : Client, message : Message) {
    const chat : Chat = await message.getChat()
    const mentions : Array<Contact> = await message.getMentions()

    if (mentions.length == 0) {
        return
    }

    let ProfilePictureUrl : string = await mentions[0].getProfilePicUrl()

    if (ProfilePictureUrl == null) {
        return message.react("❌")
    }

    let hitler : string = "https://m.media-amazon.com/images/M/MV5BMGFmZjBiYTQtMDY5Ni00ZDViLTgxODctZmVlZjU3YzI2YWMxXkEyXkFqcGc@._V1_.jpg"

    const contactImage = await Jimp.read(ProfilePictureUrl)
    const hitlerImage = await Jimp.read(hitler)

    contactImage.autocrop()
    hitlerImage.crop(
        {
            w : contactImage.width,
            h : contactImage.height,
            x : 100,
            y : 100
        }
    )

    contactImage.opacity(0.8)
    contactImage.opacity(0.4)

    contactImage.composite(hitlerImage, 0, 0)

    const base64 : string = await contactImage.getBase64("image/png")
    const media : MessageMedia = new MessageMedia('image/png', base64, "circle.png")
    
    return await message.reply(media)
}

export default HitlerlifyAvatar