import { Chat, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function unmute(message : Message) : Promise<void> {
    let chat : Chat = await message.getChat()

    return await chat.unmute()
}
    
export default unmute