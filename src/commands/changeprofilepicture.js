// import process

async function changeProfilePicture(wwclient, message) {

    let chat = await message.getChat()
    let contact = await message.getContact()

    if (!chat.isGroup) {
        if (contact.number != process.env.PHONE) {
            return wwclient.sendMessage(message.from, `${contact.pushname} does not have the permission to change the bot's profile picture`)
        }
    }

    if (message.hasQuotedMsg) {
        if ((message.hasQuotedMsg).hasMedia) {

        }
    }

    // if 
    let messageSplit = message.body.split(" ")
    if (messageSplit.length !== 1) {
        try {
            url = await fetch(messageSplit[1]);
            // if (chat.ge)
        } catch (error) {

        }
    }
    
}