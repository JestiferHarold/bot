async function sendSticker(wwclient, message) {
    let chat = await message.getChat()
    let contact = await message.getContact()
    let quotedMessage

    if (!message.hasMedia){
        if (message.hasQuotedMsg) {
            quotedMessage = await message.getQuotedMsg()
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

    return message.reply(message, undefined, {
        "sendMessageAsSticker" : true,
        "stickerAuthor" : contact.pushname
    })
}

export default sendSticker