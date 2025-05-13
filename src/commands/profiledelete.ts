import { Chat, Client, GroupChat, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function deleteGroupProfilePicture(wwclient : Client, message : Message) : Promise<void | boolean>{
    let chat : GroupChat | Chat = await message.getChat()

    if (!chat.isGroup) {
        return
    }

    chat = chat as GroupChat

    // @ts-ignore
    return await chat.deletePicture()
}

export default deleteGroupProfilePicture