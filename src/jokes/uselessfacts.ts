import { Client, Message } from "whatsapp-web.js";

export async function facts(wwclient: Client, message: Message) {
    let URL: string = "https://uselessfacts.jsph.pl/api/v2/facts"

    if (message.body.toLowerCase().split(" ").includes("--today") || message.body.toLowerCase().split(" ").includes("-t")) {
        URL += "/today"
    } else {
        URL += "/random"
    }

    let response = await fetch(
        URL,
        {
            headers : {
                "Accept": "application/json"
            }
        }
    ).then(async json => await json.json()).catch(err => err)

    return await wwclient.sendMessage(message.from, response.text)
}
