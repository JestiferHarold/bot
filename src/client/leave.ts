import { Chat, Client, Contact, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function leaveGroupChat(wwclient : Client, message : Message) {
    let chat : Chat = await message.getChat()
    let contact : Contact = await message.getContact()

    if (!chat.isGroup) {
        return 
    }

    //@ts-ignore
    return await chat.leave()
}

export default leaveGroupChat