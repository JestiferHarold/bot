import { Chat, Client, Message } from "whatsapp-web.js";

async function deleteProfilePicture(wwclient : Client, message : Message) : Promise<void | boolean>{
    const chat : Chat = await message.getChat()

    if (!chat.isGroup) {
        return
    }

    //@ts-ignore
    const deletion : boolean = await chat.deletePicture()
    return deletion
}
