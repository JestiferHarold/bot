import { Chat, Client, Contact, Message, MessageMedia } from "whatsapp-web.js";
import {Jimp} from "jimp";

async function flip(wwclient : Client, message : Message) {
    let chat : Chat = await message.getChat()
    let mentions : Array<Contact> = await message.getMentions()
    let verticalv : boolean = true
    let horizontalv : boolean = false
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

    let flags : string = message.body.split(" ")[1].slice(2).toLowerCase()

    horizontalv = flags[0] === "t" ? true : false
    verticalv = flags[1] == "t" ? true : false

    const Image = await Jimp.read(url) //what is the type of read???//
    Image.flip(
        {
            horizontal:horizontalv,
            vertical: verticalv
        }
    )

    const base64 : string = await Image.getBase64("image/png")
    const media : MessageMedia = new MessageMedia('image/png', base64, "circle.png")

    return await message.reply(media)
    
}

export default flip