import { Chat, Client, Contact, Message } from "whatsapp-web.js";

async function deleteUserMessage(wwclient : Client, message : Message) {
    const chat : Chat = await message.getChat()
    
    if (!chat.isGroup) {
        return
    }

    const mentions : Array<Contact>  = await message.getMentions()

    if (mentions.length == 0) {
        return
    }

    let contactIDs : Array<string> = new Array()

    for (let mention of mentions) {
        contactIDs.push(mention.id._serialized)
    }

    
} 