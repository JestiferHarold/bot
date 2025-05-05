async function archiveChat(wwclient, message) {
    let chat = await message.getChat()

    if (chat.archived) {
        return
    }
    
    chat.archive()
    return chat.react("👍")
}

export default archiveChat