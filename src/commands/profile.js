import whatsapp from "whatsapp-web.js"

const {
    MessageMedia
} = whatsapp

async function profilepicture(message) {
    if (message.body.slice(0, 2) == ",p") {
        const mentions = await message.getMentions()
        // let contact = await message.getContact()
        const pic = await mentions[0].getProfilePicUrl()
        const media = await MessageMedia.fromUrl(pic)
        message.reply(media)
    }
}

export default profilepicture