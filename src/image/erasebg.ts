import { Client, Message } from "whatsapp-web.js";

export async function removeBackGround(wwclient: Client, message: Message) {
    
    let URL: string = "https://www.remove.bg/api/v1"

    let status = await fetch(URL + "/status").then(async json => await json.json()).catch(err => err)

    if (!(status.status == "online")) {
        return
    }

    //I'm too poor to complete this
}
