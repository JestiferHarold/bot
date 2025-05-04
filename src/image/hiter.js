import { Jimp, measureText } from "jimp";
import { MessageMedia } from "whatsapp-web.js";

// add randomness to furhur's pics

async function HiterlifyAvatar(wwclient, message) {
    const chat = await message.getChat()
    const contact = await message.getContact()
    let mentions = await message.getMentions()
    let messageSliced, url, name;

    if (mentions.length == 0) {
        return
    } 

    let profilePicUrl = await mentions[0].getProfilePicUrl()

    url = "https://m.media-amazon.com/images/M/MV5BMGFmZjBiYTQtMDY5Ni00ZDViLTgxODctZmVlZjU3YzI2YWMxXkEyXkFqcGc@._V1_.jpg"

    const image1 = await Jimp.read(profilePicUrl)
    const image2 = await Jimp.read(url)

    image1.autocrop()
    image2.crop(
        {
            'w' : image1.width,
            'h' : image1.height,
            'x' : 100,
            'y' : 100
        }
    )
    
    image1.opacity(0.8)
    image2.opacity(0.4)

    image1.composite(image2, 0, 0)

    await image1.write(`temp/${contact.pushname} is the Fūhrer`)

    return message.reply(MessageMedia.fromFilePath(`temp/${contact.pushname} is the Fūhrer`))
}

export default HiterlifyAvatar