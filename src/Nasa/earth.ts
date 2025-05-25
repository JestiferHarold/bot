import { Client, Message, MessageMedia } from "whatsapp-web.js";

//,earth --long123.31 --lat123141.32 || ,earth -lg1231.123 -lt123.31 :: do I need to do for both?? :: I could do it :: yea I Will  

export async function EarthImage(wwclient: Client, message: Message) {

    let URL : string = "https://api.nasa.gov/planetary/earth/assets"

    let flags : Array<string> = message.body.split("--").slice(1)


    if (!(flags.length == 2)) {
        return
    }

    URL += `?${(flags[0].slice(0, 3) + "=" + flags[0].slice(3)).trim()}&${(flags[1].slice(0, 3) + "=" + flags[1].slice(3)).trim()}&api_key=${process.env.NASA_API_KEY}`

    let response = await (await fetch(URL)).json()
    
    if (response == undefined) {
        return
    }

    return await message.reply(
        await MessageMedia.fromUrl(
            response.url,
            {
                unsafeMime : true
            }
        ),
        undefined,
        {
            caption: "NASA earth Image"
        }
    )
}