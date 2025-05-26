import { Client, Message } from "whatsapp-web.js";

export async function recieveAdvice(wwclient: Client, message: Message) {
    
    let URL : string = "https://api.adviceslip.com/advice"
    let response = await (await fetch(URL)).json()

    if (response == undefined) {
        return
    }

    return await wwclient.sendMessage(message.from, response.slip.advice)
}