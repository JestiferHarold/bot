import { Client, Message, MessageMedia } from "whatsapp-web.js";

export async function dadJoke(wwclient : Client, message : Message) {
    
    let URL : string = "https://icanhazdadjoke.com/"

    let response = await fetch(
        URL,
        {
            headers : {
                "Accept" : "application/json"
            }
        }
    )

    let responseJson = await response.json()

    if (responseJson == undefined) {
        return
    }

    if (message.body.toLowerCase().includes("--image") || message.body.toLowerCase().includes("-i")) {
        URL += `j/${responseJson.id}.png`

        return await message.reply(await MessageMedia.fromUrl(URL))
    }

    return await message.reply(responseJson.joke)
}