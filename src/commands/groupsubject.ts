import { Chat, Client, Contact, Message } from "whatsapp-web.js";

export async function groupName(wwclient : Client, message : Message) : Promise<boolean | void> {

    const split : Array<string> = message.body.split(" ");

    if (split.length < 2) {
        return;
    }

    const chat : Chat = await message.getChat();

    //@ts-ignore function belongs to GroupChat not Chat, but works
    const description : boolean = await chat.setSubject(split.slice(1).join(" "));

    if (description) {
        return await message.react("✅");
    }
    
    return await message.react("❌");
}

export default {
    groupName,
    name: "",
    command: "",
    description: "",
    /**
     * the remaining here
     */
}