import { Jimp } from "jimp";
import whatsapp from "whatsapp-web.js";

const {
    MessageMedia
} = whatsapp

async function pixelate(wwclient, message) {
    let chat = await message.getChat()
    let mentions = await message.getMentions()
    let messageSliced, link, url, name;
    let pixelateIndex = 10;

    if (mentions.length == 0) {
        link = message.links
        messageSliced = message.body.sliced(" ")
        if (link.length == 0) {
            return 
        } else {
            url = link[0].link
            name = "pixelate"
            pixelateIndex = messageSliced.length == 3 ? messageSliced[1] : pixelateIndex
        }
    } else {
        url = await mentions[0].getProfilePicUrl()
        name = mentions[0].pushname
        pixelateIndex = message.body.slice(" ").length == 3 ? message.body.slice(" ")[1] : pixelateIndex
    }

    const Image = await Jimp.read(url);
    Image.pixelate(pixelateIndex);
    await Image.write(`src/image/temp/${name}.png`)

    return message.reply(MessageMedia.fromFilePath(`src/image/temp/${name}.png`))
}

export default pixelate