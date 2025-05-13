import { Client, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function references(wwclient : Client, message : Message) : Promise<void>{
    wwclient.sendMessage(message.from, "https://docs.wwebjs.dev/", {linkPreview : false})
    wwclient.sendMessage(message.from, "https://wwebjs.dev/", {linkPreview : false})
    wwclient.sendMessage(message.from, "https://github.com/pedroslopez/whatsapp-web.js/blob/main/example.js", {linkPreview : false})
    wwclient.sendMessage(message.from, "https://github.com/jestiferharold/bot", {linkPreview : false})
}

export default references