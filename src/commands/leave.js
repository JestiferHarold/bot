async function leaveChat(wwclient, message) {
    let chat = await message.getChat();
    let contact = await message.getContact();

    if (!contact.isAdmin) {
        return
    }

    if (!chat.isGroup) {
        return wwclient.sendMessage(message.from, "Not a group chat")
    }

    if (await chat.leave()) {
        return true
    }
    
    return false
}

export default leaveChat