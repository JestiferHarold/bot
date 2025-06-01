import { Client, Message, MessageTypes } from "whatsapp-web.js";
import { MessageEvent } from "../Events/messageevent";
import { wwclient } from "../../main";

export async function clientShutdown(wwclient: Client, message: Message) {
    
    wwclient.removeListener("message", MessageEvent)

    wwclient.addListener("message", shutdownState)
    await wwclient.sendMessage(message.from, "Client has shutdown")
}


const shutdownState = async (message: Message) => {
    let contact = await message.getContact()
    if (message.body == ",restart" && contact.id._serialized == process.env.PHONE_NUMBER_SERIALIZED) {
        wwclient.removeListener("message", shutdownState)
        wwclient.addListener("message", MessageEvent)
        await wwclient.sendMessage(message.from, "Restarted")
    }
}
