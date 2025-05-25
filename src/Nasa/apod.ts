//Astronomical Picture Of The Day
import { Client, Message, MessageMedia } from "whatsapp-web.js";

export async function Apod(wwclient : Client, message : Message) {
    let URL : string = "https://api.nasa.gov/planetary/apod?api_key=" + process.env.NASA_API_KEY

    let response = await (await fetch(URL)).json()

    if (response == null) {
        return
    }
    
    let funfact : string = response.explanation
    let pictureURL : string = response.hdurl
    let title : string = response.title

    return await wwclient.sendMessage(
        message.from,
        await MessageMedia.fromUrl(pictureURL),
        {
            caption : "```Astronomical Picture Of The Day\n\n" +
                      title +
                      "```\n\n"+
                      funfact
        }
    )
}