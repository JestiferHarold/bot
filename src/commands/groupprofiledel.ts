import { Chat, Client, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function deleteProfilePicture(wwclient : Client, message : Message) : Promise<void | boolean>{
    const chat : Chat = await message.getChat()

    if (!chat.isGroup) {
        return
    }

    //@ts-ignore
    const deletion : boolean = await chat.deletePicture()
    return deletion
}
