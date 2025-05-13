import { Chat, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function getInviteCode(message : Message) : Promise<Message> {
    let chat : Chat = await message.getChat()
    // let code = await message.invite
    let code : string = "invite code"
    return message.reply(`Invite Code ${code}`)
}

export default getInviteCode