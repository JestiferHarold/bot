import { Chat, Client, Contact, Message } from "whatsapp-web.js";

async function leaveGroupChat(wwclient : Client, message : Message) {
    let chat : Chat = await message.getChat()
    let contact : Contact = await message.getContact()

    if (!chat.isGroup) {
        return false
    }

    // return await 
}

export default leaveGroupChat