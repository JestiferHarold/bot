async function setSubject(wwclient, message) {
    let chat = await message.getChat()
    let contact = await message.getContact()
    let owner = chat.owner

    if (owner.id != contact.id) {
        return
    }

    let messageSplit = (message.body.split(" ")).slice(1)

    if (await chat.setSubject(messageSplit)) {
        return wwclient.sendMessage(contact.id, `Subject changed successfully from ${chat.name} to ${messageSplit}`)
    }

    return wwclient.sendMessage(contact.id, `Unable to change subject`)
}

export default setSubject