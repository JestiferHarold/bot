import { Chat, Client, Contact, Message } from "whatsapp-web.js";

async function groupDescription(wwclient: Client, message: Message): Promise<boolean | void> {

    const split: Array<string> = message.body.split(" ");

    if (split.length < 2) {
        return;
    }

    const chat: Chat = await message.getChat();

    if (!chat.isGroup) return;

    //@ts-ignore
    const description: boolean = await chat.setDescription(split.slice(1))

    if (description) {
        return await message.react("✅");
    }

    return await message.react("❌");
}

export default {
    groupDescription,
    name: "",
    command: "",
    description: "",
    adminOnly: true
}