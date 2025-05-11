import { Message } from "whatsapp-web.js";

async function unpin(message : Message) : Promise<boolean> {
    return await message.unpin()
}

export default unpin