import { Chat, Message } from "whatsapp-web.js";

//try completeing return
async function muteChat(message: Message){
    let chat: Chat = await message.getChat();

    return chat.mute();
}

export default {
    muteChat,
    name: "",
    command: "",
    description: "",
    /**do the remaining */
}