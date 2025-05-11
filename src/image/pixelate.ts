import { Chat, Client, Contact, Message, MessageMedia } from "whatsapp-web.js";
import {Jimp} from "jimp";

async function ditherEffect(wwclient : Client, message : Message) {
    let chat : Chat = await message.getChat()
    let mentions : Array<Contact> = await message.getMentions()
    let pixelateIndex : number = 10
    let link : Array<{
        link : string
        isSuspicious : boolean 
    }>, url : string, name : string, flags : Array<string> 

    if (mentions.length == 0) {
        link = message.links
        flags = message.body.split(" ")

        if (link.length == 0) {
            return 
        } else {
            url = link[0].link
            name = "pixelate"
            pixelateIndex = flags.length == 3 ? parseInt(flags[1].slice(2)) : pixelateIndex

        }
    } else {
        url = await mentions[0].getProfilePicUrl()
        name = mentions[0].pushname
        pixelateIndex = message.body.split(" ").length == 3 ? parseInt(message.body.split(" ")[1].slice(2)) : pixelateIndex

    }

    const Image = await Jimp.read(url) //what is the type of read???//
    Image.pixelate(pixelateIndex)

    const base64 : string = await Image.getBase64("image/png")
    const media : MessageMedia = new MessageMedia('image/png', base64, "circle.png")

    return await message.reply(media)
    
}

export default ditherEffect