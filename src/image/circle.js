import { Jimp } from "jimp";
import { MessageMedia } from "whatsapp-web.js";

async function circle(wwclient, message) {
    let chat = await message.getChat()
    let mentions = await message.getMentions()
    let messageSliced, url, name;

    if (mentions.length == 0) {
        messageSliced = message.body.sliced(" ")
        if (messageSliced.length == 1 || messageSliced.length > 2) {
            return 
        } else {
            url = await MessageMedia.fromUrl(url)
            name = "undo"
        }
    } else {
        url = await mentions[0].getProfilePicUrl()
        name = mentions[0].pushname
    }

    const Image = await Jimp.read(url);
    Image.circle();
    await Image.write(`temp/${name}.png`)

    return message.reply(MessageMedia.fromFilePath(`temp/${name}.png`))
}

export default circle