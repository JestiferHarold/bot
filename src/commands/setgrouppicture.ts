import { Chat, Client, Message, MessageMedia } from "whatsapp-web.js";

async function setGroupPicture(wwclient : Client, message : Message) : Promise<boolean | void>{
    const chat : Chat = await message.getChat()

    if (!chat.isGroup) {
        return
    }

    let target : string | Array< {link : string, isSuspicious : boolean} > | MessageMedia
    let quotedMessage : Message

    if(!message.hasMedia) {
        if (message.hasQuotedMsg){
            quotedMessage = await message.getQuotedMessage()
            if (!quotedMessage.hasMedia) {
                return 
            } else {
                target = await quotedMessage.downloadMedia()
            }
        } else {
            if (message.links.length == 0) {
                return 
            } else {
                target = message.links[0].link
                target = await MessageMedia.fromUrl(target)
            }
        }
    } else {
        target = await message.downloadMedia()
    }

    //@ts-ignore
    const updateProfile : boolean = chat.setPicture(target)

    return updateProfile
}