import { Chat, Client, Contact, Message } from "whatsapp-web.js";

async function changeMessageSettings(wwclient : Client, message : Message, booleanValue : boolean) {
    const chat : Chat = await message.getChat()
    //@ts-ignore
    const settings : boolean = await chat.setMessagesAdminsOnly(booleanValue)

    if (settings) {
         return wwclient.sendMessage(message.from, booleanValue ? "Settings changed to admins only" : "Settings changed to all")
    }

    return wwclient.sendMessage(message.from, "not enough permissions")
}