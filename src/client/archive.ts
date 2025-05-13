import { Chat, Client, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function archiveChat(wwclient : Client, message : Message) : Promise<void> {
        let chat : Chat = await message.getChat()

        if (chat.archived) {
            return 
        }

        chat.archive()
        return message.react("👍")
}

export default archiveChat