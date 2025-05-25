import { Client, Message } from "whatsapp-web.js";

export async function kanyeSpeaks(wwclient: Client, message: Message) {
    const URL = "https://api.kanye.rest"

    const response = await (await fetch(URL)).json()

    if (response == undefined) {
        return
    }

    return await wwclient.sendMessage(message.from, response.quote + `\n\n\`\`\` ~Kanye West \`\`\``)
}