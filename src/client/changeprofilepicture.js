// import process

async function changeProfilePicture(wwclient, message) {

    let chat = await message.getChat()
    let contact = await message.getContact()
    let messageSplit;

    if (!chat.isGroup) {
        if (contact.number != process.env.PHONE) {
            return wwclient.sendMessage(message.from, `${contact.pushname} does not have the permission to change the bot's profile picture`)
        }
    }

    // if (message.hasQuotedMsg) {
    //     if ((message.hasQuotedMsg).hasMedia) {

    //     }
    // }
    if (message.links.length == 0) {
        messageSplit = message.body.split(" ")
    } else {
        
    }
    // if 
    if (messageSplit.length !== 1) {
        try {
            url = await fetch(messageSplit[1]);
            // if (chat.ge)
        } catch (error) {

        }
    }
    
}