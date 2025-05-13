import { Chat, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function muteChat(message : Message) : Promise<void> {
    let chat : Chat = await message.getChat()

    return chat.mute()
}

export default muteChat