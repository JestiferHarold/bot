import { Chat, Client, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function revokeGroupInvites(wwclient : Client, message : Message) : Promise<void | boolean>{
    let chat : Chat = await message.getChat()

    if (!chat.isGroup) {
        return
    }

    //@ts-ignore
    if (await chat.revokeInvite()) {
        wwclient.sendMessage(message.from, "Invite links revoked")
        return true
    }

    return false

}

export default revokeGroupInvites