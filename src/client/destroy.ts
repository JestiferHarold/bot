import { Client, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function destroyClient(wwclient : Client, message : Message) : Promise<void> {
    //@ts-expect-error
    wwclient.sendMessage(process.env.PHONE_NUMBER, "Client Destroyed")

    return await wwclient.destroy()
}

export default destroyClient