import { Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function unpin(message : Message) : Promise<boolean> {
    return await message.unpin()
}

export default unpin