async function unmuteChat(wwclient, message) {
    let chat = await message.getChat()

    return chat.unmute()
}

export default unmuteChat