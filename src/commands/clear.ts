import { Chat, Client, Message } from "whatsapp-web.js";

async function clearMessagesFromClient(wwclient : Client, message : Message): Promise<Message> {
    let id : string = message.from;
    let chat : Chat = await message.getChat();

    if (await chat.clearMessages()) {
        return wwclient.sendMessage(id, "Client chat cleared");
    }

    return wwclient.sendMessage(id, "Client chat not cleared");
}

export default {
    clearMessagesFromClient,
    name: "",
    command: "",
    description: "",
    adminOnly: true
};