import { Message } from "whatsapp-web.js";
import { Groups } from "../../main";

export async function deleteBlockedUsersMessage(message: Message) {
    let contact = await message.getContact()
    let chat = await message.getChat()
    for (let Group of Groups) {
        if (Group.blockedUsers.length == 0) {
            continue
        }

        if (Group.blockedUsers.includes(contact.id._serialized) && Group.chat_serialized == chat.id._serialized) {
            await message.delete(true)
            return true
        }
    }

    return false
}
