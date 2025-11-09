import { Message } from "whatsapp-web.js";

async function timesForwarded(message: Message): Promise<void> {
    
    if (!message.hasQuotedMsg) {
        return;
    }

    let targetMessage : Message = await message.getQuotedMessage();

    if (targetMessage.isForwarded) {
        let times = targetMessage.forwardingScore;
        await message.reply(`The Message has been forwarded ${times} ${times == 1 ? "time" : "times"}`)
    }
} 

export default {
    timesForwarded,
    name: "",
    command: "",
    description: "",
    adminOnly: false
}