import { Client, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function destroyClient(wwclient : Client, message : Message) : Promise<void> {
    wwclient.sendMessage(message.from, "Client Destroyed")

    return await wwclient.destroy()
}

export default destroyClient