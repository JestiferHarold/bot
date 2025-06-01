import { Client, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function destroyClient(wwclient : Client, message : Message) : Promise<void> {
    //@ts-expect-error
    await wwclient.sendMessage(process.env.PHONE_NUMBER_SERIALIZED, "Client Destroyed")

    return await wwclient.logout()
}

export default destroyClient
