import { Chat, Client, Contact, Message } from "whatsapp-web.js";

async function groupName(wwclient : Client, message : Message) : Promise<boolean | void> {

    const split : Array<string> = message.body.split(" ")

    if (split.length < 2) {
        return
    }

    //delete line 12 
    const contact : Contact = await message.getContact()
    const chat : Chat = await message.getChat()

    //@ts-ignore
    const description : boolean = await chat.setSubject(split.slice(1))

    return description
}