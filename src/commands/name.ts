import { Chat, Client, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function getChatName(wwclient : Client, message : Message) : Promise<void | Message>{
    const chat : Chat = await message.getChat()

    if (!chat.isGroup) {
        return
    }

    return wwclient.sendMessage(message.from, chat.name)

}

export default getChatName