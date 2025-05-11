import { Client, Message } from "whatsapp-web.js";

async function references(wwclient : Client, message : Message) : Promise<void>{
    wwclient.sendMessage(message.from, "https://docs.wwebjs.dev/", {linkPreview : false})
    wwclient.sendMessage(message.from, "https://wwebjs.dev/", {linkPreview : false})
    wwclient.sendMessage(message.from, "https://github.com/pedroslopez/whatsapp-web.js/blob/main/example.js", {linkPreview : false})
    wwclient.sendMessage(message.from, "https://github.com/jestiferharold/bot", {linkPreview : false})
}

export default references