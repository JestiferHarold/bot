import { Chat, Client, Contact, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function leaveGroupChat(wwclient : Client, message : Message) {
    let chat : Chat = await message.getChat()
    let contact : Contact = await message.getContact()

    if (!chat.isGroup) {
        return false
    }

    // return await 
}

export default leaveGroupChat