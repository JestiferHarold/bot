async function setGroupChatDescription(wwclient, message) {
    let chat = await message.getChat()
    let contact = await message.getContact()
    
    if (!chat.isGroup) {
        return
    }

    let messageSplit = (message.body.split(" ")).slice(1)

    if (await chat.setDescription(messageSplit)) {
        return wwclient.sendMessage(contact.id, `Description changed successfully for ${chat.name}`)
    }

    return wwclient.sendMessage(contact.id, `Unable to set description for ${chat.name}`)
} 

export default setGroupChatDescription