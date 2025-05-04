async function getChatName(wwclient, message) {
    const chat = await message.getChat()

    if (!chat.isGroup) {
        return
    }

    return wwclient.sendMessage(message.from, `${chat.name}`)
}

export default getChatName