async function archiveChat(wwclient, message) {
    let chat = await message.getChat()

    if (chat.archived) {
        return
    }

    return chat.archive()
}

export default archiveChat