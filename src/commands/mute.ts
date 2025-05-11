import { Chat, Message } from "whatsapp-web.js";

async function muteChat(message : Message) : Promise<void> {
    let chat : Chat = await message.getChat()

    return chat.mute()
}

export default muteChat