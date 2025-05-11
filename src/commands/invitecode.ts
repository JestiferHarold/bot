import { Chat, Message } from "whatsapp-web.js";

async function getInviteCode(message : Message) : Promise<Message> {
    let chat : Chat = await message.getChat()
    // let code = await message.invite
    let code : string = "invite code"
    return message.reply(`Invite Code ${code}`)
}

export default getInviteCode