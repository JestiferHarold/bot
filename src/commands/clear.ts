import { Chat, Client, Message } from "whatsapp-web.js";

async function clearMessagesFromClient(wwclient : Client, message : Message) : Promise<Message> {
    let id : string = message.from;
    let chat : Chat = await message.getChat()

    if ((await chat.clearMessages()).valueOf()) {
        return wwclient.sendMessage(id, "Messages Clearaed")
    }

    return wwclient.sendMessage(id, "Unable to clear messages")
}

export default clearMessagesFromClient