import { Chat, Client, Message } from "whatsapp-web.js";

async function deleteGroupProfilePicture(wwclient: Client, message: Message): Promise<void | boolean>{
    const chat: Chat = await message.getChat();

    if (!chat.isGroup) {
        return;
    }

    //@ts-ignore deletePicture uses GroupChat object instead of Chat object.
    const deletion : boolean = await chat.deletePicture();
    
    if (deletion) {
        return await message.react("✅");
    }

    return await message.react("❌");
}

export default {
    deleteGroupProfilePicture,
    name: "",
    command: "",
    description: "",
    /**
     * the other two
     */
}