import { Jimp, measureText } from "jimp";
import whatsapp from "whatsapp-web.js";

const {
    MessageMedia
} = whatsapp
// add randomness to furhur's pics

async function HiterlifyAvatar(wwclient, message) {
    const chat = await message.getChat()
    let mentions = await message.getMentions()
    let messageSliced, url, name;

    if (mentions.length == 0) {
        return
    } 

    const contact = mentions[0]

    let profilePicUrl = await mentions[0].getProfilePicUrl()

    //return if privacy settings enables

    url = "https://m.media-amazon.com/images/M/MV5BMGFmZjBiYTQtMDY5Ni00ZDViLTgxODctZmVlZjU3YzI2YWMxXkEyXkFqcGc@._V1_.jpg"

    const image1 = await Jimp.read(profilePicUrl)
    const image2 = await Jimp.read(url)

    console.log('fine here')

    image1.autocrop()
    image2.crop(
        {
            'w' : image1.width,
            'h' : image1.height,
            'x' : 100,
            'y' : 100
        }
    )

    console.log('fine here too')
    
    image1.opacity(0.8)
    image2.opacity(0.4)

    image1.composite(image2, 0, 0)

    await image1.write(`src/image/temp/${contact.pushname} is the Fūhrer.jpg`)

    return await message.reply(MessageMedia.fromFilePath(`src/image/temp/${contact.pushname} is the Fūhrer.jpg`))
}

export default HiterlifyAvatar