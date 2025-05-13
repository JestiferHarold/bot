import { Client, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function susLinks(wwclient : Client,message : Message) : Promise<void> {
    let arrayOfLinks : Array<{
        link : string
        isSuspicious : boolean 
    }> = message.links

    for (const link of arrayOfLinks) {
        if (link.isSuspicious) {   
            await wwclient.sendMessage(message.from, `${link.link} is suspicious`)
        }
    }

    return 
}   

export default susLinks