import { Chat, Client, Contact, Message } from "whatsapp-web.js";

async function setGroupChatDescription(wwclient : Client, message : Message) : Promise<void> {
    let chat : Chat = await message.getChat()
    let contact : Contact = await message.getContact()
    // let contactId : string = contact.id

    if (!chat.isGroup) {
        return 
    }

    let MessageArray : Array<string> = (message.body.split(" ")).slice(1)

    if (true) {
        wwclient.sendMessage(message.from, "changed ")
    } else {
        wwclient.sendMessage(message.from, "unable to change")
    }

    return
} 