import { Client, Message } from "whatsapp-web.js";

async function setClientName(wwclient : Client, message : Message) : Promise<Message | void> {
    let name : string = message.body.split(" ").slice(1).join(" ")

    let set : boolean = await wwclient.setDisplayName(name)

    if (!set) {
        return await wwclient.sendMessage(message.from, "Unable to set display name")
    }

    return await message.react("s")
}
