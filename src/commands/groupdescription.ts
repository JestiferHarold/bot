import { Chat, Client, Contact, Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function groupDescription(wwclient : Client, message : Message) : Promise<boolean | void> {

    const split : Array<string> = message.body.split(" ")

    if (split.length < 2) {
        return
    }

    //delete line 12 
    const contact : Contact = await message.getContact()
    const chat : Chat = await message.getChat()

    //@ts-ignore
    const description : boolean = await chat.setDescription(split.slice(1))

    return description
}