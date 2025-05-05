import { Jimp } from "jimp";
import whatsapp from "whatsapp-web.js";

const {
    MessageMedia
} = whatsapp

async function flip(wwclient, message) {
    let chat = await message.getChat()
    let mentions = await message.getMentions()
    let link, url, name, horizontalv, verticalv;

    if (mentions.length == 0) {
        link = message.links
        if (link.length == 0) {
            return 
        } else {
            url = link[0].link
            name = "flip"
        }
    } else {
        url = await mentions[0].getProfilePicUrl()
        name = mentions[0].pushname
    }

    horizontalv = (message.body[5].toString().toLowerCase() === "t" ? true : false)
    verticalv = (message.body[6].toString().toLowerCase() === "t" ? true : false)

    const Image = await Jimp.read(url);
    await Image.flip({
        horizontal : horizontalv,
        vertical : verticalv
    });
    await Image.write(`src/image/temp/${name}.png`)

    return message.reply(MessageMedia.fromFilePath(`src/image/temp/${name}.png`))
}

export default flip