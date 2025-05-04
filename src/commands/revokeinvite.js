async function revokeGroupInvites(wwclient, message) {
    let chat = await message.getChat()
    if (!chat.isGroup) {
        wwclient.sendMessage(message.from, "not a group")
    }

    if (await chat.revokeInvite()) {
        wwclient.sendMessage(message.from, "Invite links revoked");
        return true
    }

    wwclient.sendMessage(message.from, "Not enough permissions to revoke invite links")
    return false
}

export default revokeGroupInvites