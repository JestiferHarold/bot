import { Client, Message } from "whatsapp-web.js";

async function susLinks(wwclient: Client, message: Message): Promise<void> {
    let links: Array<
        {
            link: string,
            isSuspicious: boolean
        }
    > = message.links;

    for (const link of links) {
        if (link.isSuspicious) {
            await wwclient.sendMessage(
                message.from, 
                `${link.link} is not safe` 
            );
        }
    }
}

export default {
    susLinks,
    name: "",
    command: "",
    description: "",
    /**
     * remainign
     */
}