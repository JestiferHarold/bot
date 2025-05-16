import { Jimp } from "jimp";
import { Client, Message, MessageMedia } from "whatsapp-web.js";

export async function setClientPicture(wwclient : Client, message : Message) : Promise<boolean | void | Message>{
    let links : Array<{link : string, isSuspicious : boolean}> = message.links
    let target : MessageMedia | string | Message | null = null, temp : string | MessageMedia | Message | null = null

    if ((await message.getChat()).isGroup) {
        return
    }

    if (message.hasMedia) {
        target = await message.downloadMedia()
    }   

    if (links.length != 0) {
        if (links[0].isSuspicious) {
            return await message.reply("Link not safe")
        }

        target = links[0].link
    }

    if (message.hasQuotedMsg) {
        temp = await message.getQuotedMessage()
        if (temp.hasMedia) {
            target = await temp.downloadMedia()
        }

        if (temp.links.length != 0) {
            if (temp.links[0].isSuspicious) {
                return await message.reply("Link not safe")
            }

            target = temp.links[0].link
       }
    }

    if (target == null) {
        return
    }

    console.log(typeof target)
 
    //If target is a url MEssageMedia.fromURL()
    //@ts-expect-error
    const Image = await Jimp.read( target? target : target.mimetype)//FIx here
    Image.resize(
        {
            h : 640,
            w : 640
        }
    )

    //@ts-ignore    
    const data : string = await Image.getBase64(temp.mimetype ? temp.mimetype : "image/png") //No idea if it returns as image/png,data
    
    
    const media : MessageMedia = new MessageMedia(
        //@ts-expect-error
        (temp.mimetype ? temp.mimetype : "image/png"),
        data
    )

    return await wwclient.setProfilePicture(media)
}  
/*
    Test Cases 
    1. 
*/ 