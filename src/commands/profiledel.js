async function deleteProfilePicture(wwclient, message) {
    let chat = await message.getChat()

    if (!chat.isGroup) {
        return wwclient.sendMessage(message.from, "The chat is not a group")
    }

    if (await chat.deletePicture()) {
        return wwclient.sendMessage(message.from, "Group Picture deleted")
    }

    return wwclient.sendMessage(message.from, "not enough permissions to delete picture")
}

export default deleteProfilePicture