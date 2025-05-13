import { Chat, Client, Contact, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

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