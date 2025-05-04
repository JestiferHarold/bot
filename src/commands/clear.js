async function clearMessagesFromClient(wwclient, message) {
    let msg = message.from;

    if (await (await message.getChat()).clearMessages()) {
        return wwclient.sendMessage(msg, "messages cleared")
    }

    return wwclient.sendMessage(msg, "unable to clear messages")
}

export default clearMessagesFromClient