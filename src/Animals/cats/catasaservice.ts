import { Client, Message, MessageMedia } from "whatsapp-web.js";

let lastId : string | null

export async function CAAS(wwclient: Client, message: Message) {
    let URL : string = "https://cataas.com/cat"

    if (message.body.toLowerCase().split("--").includes("tags")) {
        let response = await (await fetch("https://cataas.com/api/tags")).json()
        
        lastId = null

        return await message.reply(
            response.join(" ")
        )
    }

    let flags: Array<string> = message.body.split("-")
    
    for (let flag of flags) {
        
        if (flag.toLowerCase().startsWith("t")) {
            URL += `/${flag.slice(2).toLowerCase().trim()}`
        }

        if (flag.toLowerCase().startsWith("s")) {
            URL += `/says/${flag.slice(2).toLowerCase().trim()}`
        }

        if (flag.startsWith("gif")) {
            URL += "/gif"
        }
    }

    URL += "?json=true"

    let response = await fetch(URL).then(async json => await json.json()).catch(err => {return err})

    if (response == "Cat not found") {
        return
    }    
    console.log(URL)
    try {
        
        lastId = response.id
    } catch (error) {
        return
    }

    return await wwclient.sendMessage(message.from, await MessageMedia.fromUrl(response.url , {unsafeMime : true}))
}

// JIC :: + "." +  response.mimetype.split("/")[1]