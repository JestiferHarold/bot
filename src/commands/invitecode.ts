import { Chat, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function getInviteCode(message : Message) : Promise<Message> {
    let chat : Chat = await message.getChat()
    //@ts-ignore
    let code = await chat.getInviteCode()
    return message.reply(`Invite Code ${code}`)
}

export default getInviteCode