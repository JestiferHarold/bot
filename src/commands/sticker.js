async function sendSticker(wwclient, message) {
    let chat = await message.getChat()
    let contact = await message.getContact()
    let quotedMessage

    if (!message.hasMedia){
        if (message.hasQuotedMsg) {
            quotedMessage = await message.getQuotedMessage()
            if (!quotedMessage.hasMedia) {
                return
            }
        } else {
            return 
        }
    } else {
        quotedMessage = message
    }



    let media = await quotedMessage.downloadMedia()

    return await message.reply(media, message.from, {
        "sendMediaAsSticker" : true,
        "stickerAuthor" : "mizzuuuriiii"
    })
}

export default sendSticker