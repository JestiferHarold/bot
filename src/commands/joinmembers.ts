import { Chat, Client, Contact, Message } from "whatsapp-web.js";

async function changeMessageSettings(wwclient : Client, message : Message, booleanValue : boolean) {

    const chat : Chat = await message.getChat();

    //@ts-ignore
    const settings : boolean = await chat.setAddMembersAdminsOnly(booleanValue);

    if (settings) {
        return await wwclient.sendMessage(message.from, booleanValue ? "Changed to allow only admins to change the group settings" : "changed to allow all to change group settings");
    }

    return await wwclient.sendMessage(message.from, "not enough permissions");
}

export default {
    changeMessageSettings,
    name: "",
    command: "",
    description: "",
    /**
     * remaining
     */
}