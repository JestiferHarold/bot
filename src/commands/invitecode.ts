import { Chat, Message } from "whatsapp-web.js";

async function getInviteCode(message: Message): Promise<Message | void> { 

    let chat: Chat = await message.getChat();

    if (!chat.isGroup) return;

    //@ts-ignore getInviteCode functions on GroupChat object
    let code = await chat.getInviteCode();

    return message.reply(`Invite Code ${code}`);
}

export default {
    getInviteCode, 
    name: "",
    command: "",
    description: "",
    /**
     * You know the drill
     */
}