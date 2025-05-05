import { Jimp } from "jimp";
import whatsapp from "whatsapp-web.js";

const {
    MessageMedia
} = whatsapp

async function ditherEffect(wwclient, message) {
    let chat = await message.getChat()
    let mentions = await message.getMentions()
    let link, url, name;

    if (mentions.length == 0) {
        link = message.links
        if (link.length == 0) {
            return 
        } else {
            url = link[0].link
            name = "url"
        }
    } else {
        url = await mentions[0].getProfilePicUrl()
        name = mentions[0].pushname
    }

    const Image = await Jimp.read(url);
    Image.dither();
    await Image.write(`src/image/temp/${name}.png`)

    return message.reply(MessageMedia.fromFilePath(`src/image/temp/${name}.png`))
}

export default ditherEffect