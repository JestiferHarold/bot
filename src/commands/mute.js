async function muteChat(wwclient, message) {
    let chat = await message.getChat()

    return chat.mute()
}

export default muteChat