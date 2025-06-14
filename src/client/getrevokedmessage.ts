import { Chat, Message } from "whatsapp-web.js";
import { RevokedMessage } from "../classes/RevokedMessage";
import { deletedMessage } from "../../main";

export async function getDeletedMessage(message : Message, chats : Array<RevokedMessage>) : Promise<void>{
    const thischat : Chat = await message.getChat()

    for(let chat of chats) {
        if (chat.chat == thischat.id._serialized) {
            await chat.getDeletedMessage(message)
        }
    }
    //Don't drink while you do this or don't do this while you are drunk plz
    return
}

export async function setMessageEdited(message: Message, before: string, after: string) {
    for (let chat of deletedMessage) {
        if ((await message.getChat()).id._serialized == chat.chat) {
            return chat.setEditedMessage(before, after, (await message.getContact()).id._serialized)
        }
    }
}
