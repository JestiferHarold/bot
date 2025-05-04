import { Jimp } from "jimp";
import { MessageMedia } from "whatsapp-web.js";

async function gaussianBlur(wwclient, message) {
    let chat = await message.getChat()
    let mentions = await message.getMentions()
    let messageSliced, url, name;
    let blurIndex = 10;

    if (mentions.length == 0) {
        messageSliced = message.body.sliced(" ")
        if (messageSliced.length == 1 || messageSliced.length > 2) {
            return 
        } else {
            url = await MessageMedia.fromUrl(messageSliced[1])
            name = "undo"
            blurIndex = messageSliced.length == 3 ? messageSliced[2] : blurIndex
        }
    } else {
        url = await mentions[0].getProfilePicUrl()
        name = mentions[0].pushname
        blurIndex = message.body.slice(" ").length == 3 ? message.body.slice(" ")[1] : blurIndex
    }

    const Image = await Jimp.read(url);
    Image.gaussian(blurIndex);
    await Image.write(`temp/${name}.png`)

    return message.reply(MessageMedia.fromFilePath(`temp/${name}.png`))
}

export default gaussianBlur