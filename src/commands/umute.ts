import { Chat, Message } from "whatsapp-web.js";

async function unmute(message: Message) {
    let chat: Chat = await message.getChat();

    return await chat.unmute();
}
    
export default {
    unmute,
    name: "",
    command: "",
    description: ""
}