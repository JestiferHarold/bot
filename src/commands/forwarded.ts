import { Message, MessageMedia } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function timesForwarded(message : Message) : Promise<void> {
    
    if (!message.hasQuotedMsg) {
        return
    }

    let targetMessage : Message = await message.getQuotedMessage()

    if ((targetMessage.isForwarded).valueOf()) {
        let times = targetMessage.forwardingScore
        message.reply(`The Message has been forwarded ${times} ${times == 1 ? "time" : "times"}`)
    }

    return
} 

export default timesForwarded