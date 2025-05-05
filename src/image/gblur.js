import { Jimp } from "jimp";
import whatsapp from "whatsapp-web.js";

const {
    MessageMedia
} = whatsapp    

async function gaussianBlur(wwclient, message) {
    let chat = await message.getChat()
    let mentions = await message.getMentions()
    let messageSliced, link, url, name;
    let blurIndex = 10;

    if (mentions.length == 0) {
        link = message.links
        messageSliced = message.body.slice(" ")
        if (link.length == 0) {
            return 
        } else {
            url = link[0].link
            name = "gaussian"
            blurIndex = messageSliced.length == 3 ? messageSliced[2] : blurIndex
        }
    } else {
        url = await mentions[0].getProfilePicUrl()
        name = mentions[0].pushname
        blurIndex = message.body.slice(" ").length == 3 && "/\d\\".test(message.body.slice(" ")[1])? Number(message.body.slice(" ")[1]) : blurIndex
    }

    const Image = await Jimp.read(url);
    Image.gaussian(blurIndex);
    await Image.write(`src/image/temp/${name}.png`)

    return message.reply(MessageMedia.fromFilePath(`src/image/temp/${name}.png`))
}

export default gaussianBlur