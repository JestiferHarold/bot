import { Jimp } from "jimp";
import whatsapp from "whatsapp-web.js";

const {
    MessageMedia
} = whatsapp

async function invert(wwclient, message) {
    let chat = await message.getChat()
    let mentions = await message.getMentions()
    let link, url, name;

    if (mentions.length == 0) {
        link = message.link
        if (link.length == 0) {
            return 
        } else {
            url = link[0].link
            name = "invert"
        }
    } else {
        url = await mentions[0].getProfilePicUrl()
        name = mentions[0].pushname
    }

    const Image = await Jimp.read(url);
    Image.invert();
    await Image.write(`src/image/temp/${name}.png`)

    return message.reply(MessageMedia.fromFilePath(`src/image/temp/${name}.png`))
}

export default invert