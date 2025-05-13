import { Chat, Client, Contact, Message, MessageMedia } from "whatsapp-web.js";
import {Jimp} from "jimp";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function fisheye(wwclient : Client, message : Message) {
    let chat : Chat = await message.getChat()
    let mentions : Array<Contact> = await message.getMentions()
    let link : Array<{
        link : string
        isSuspicious : boolean 
    }>, url : string, name : string 

    if (mentions.length == 0) {
        link = message.links
        if (link.length == 0) {
            return 
        } else {
            url = link[0].link
            name = "url"
        }
    } else {
        url = await mentions[0].getProfilePicUrl()
        name = mentions[0].pushname
    }

    const Image = await Jimp.read(url) //what is the type of read???//
    Image.fisheye()

    const base64 : string = await Image.getBase64("image/png")
    const media : MessageMedia = new MessageMedia('image/png', base64, "circle.png")

    return await message.reply(media)
    
}

export default fisheye