import { Chat, Client, Contact, Message } from "whatsapp-web.js";

async function changeMessageSettings(wwclient: Client, message: Message, booleanValue: boolean) {
    const chat: Chat = await message.getChat();

    if (!chat.isGroup) return;

    //@ts-ignore
    const settings: boolean = await chat.setMessagesAdminOnly(booleanValue);
    
    if (settings) {
        return await wwclient.sendMessage(
            message.from,
            booleanValue ? "Settings changed to admins only" : "Settings changed to all"
        );
    }

    return wwclient.sendMessage(
        message.from,
        "Insufficient permissions to continue the action"
    );
}

export default {
    changeMessageSettings,
    name: "",
    command: "",
    description: "",
    adminOnly: true
}