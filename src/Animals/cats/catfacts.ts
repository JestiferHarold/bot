import { Client, Message } from "whatsapp-web.js";

/* 
 * Does not work
*/

export async function catFacts(wwclient: Client, message: Message) {
    const URL: string = "https://cat-fact.herokuapp.com/facts/random?"

    let response = await fetch(URL).then(async json => await json.json()).catch(err => err)

    return await message.reply(response[0].text)
}