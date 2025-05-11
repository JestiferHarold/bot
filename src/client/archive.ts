import { Chat, Client, Message } from "whatsapp-web.js";

async function archiveChat(wwclient : Client, message : Message) : Promise<void> {
        let chat : Chat = await message.getChat()

        if (chat.archived) {
            return 
        }

        chat.archive()
        return message.react("👍")
}

export default archiveChat