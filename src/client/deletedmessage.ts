import { Chat, Message } from "whatsapp-web.js";
import { RevokedMessage } from "../base/RevokedMessage";

export async function getDeletedMessage(message : Message, chats : Array<RevokedMessage>) : Promise<void>{
    const thischat : Chat = await message.getChat()

    for(let chat of chats) {
        if (chat.chat == thischat.id._serialized) {
            await chat.deletedMessage(message)
        }
    }
    
    return
}