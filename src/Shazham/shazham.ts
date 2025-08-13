import { Client, Message } from "whatsapp-web.js";


export async function identifyMusic(wwclient: Client, message: Message) {

    if (!message.hasQuotedMsg) return;

    
}