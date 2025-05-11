import { Client, Message } from "whatsapp-web.js";

async function destroyClient(wwclient : Client, message : Message) : Promise<void> {
    wwclient.sendMessage(message.from, "Client Destroyed")

    return await wwclient.destroy()
}

export default destroyClient