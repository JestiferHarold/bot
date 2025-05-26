import { Client, Message } from "whatsapp-web.js";

// ,lyrics --<name of the band> --<name of the song>

export async function getLyrics(wwclient: Client, message: Message) {
    let URL : string = "https://api.lyrics.ovh/v1"

    if (message.body.split("--").length != 3) {
        return
    }

    //Feels soo done :: I'm soo back
    URL += `/${message.body.split("--")[1].trim() + "/" + message.body.split("--")[2].split(" ").join("%20").trim()}`

    const response = await (await fetch(URL)).json()

    try {
        return await wwclient.sendMessage(message.from, response.lyrics)
    } catch (error) {
        return
    }
}