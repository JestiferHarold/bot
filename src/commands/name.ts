import { Chat, Client, Message } from "whatsapp-web.js";

async function getChatName(wwclient : Client, message : Message) : Promise<void | Message>{
    const chat : Chat = await message.getChat()

    if (!chat.isGroup) {
        return
    }

    return wwclient.sendMessage(message.from, chat.name)

}

export default getChatName