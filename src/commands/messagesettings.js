async function changeMessageSettings(wwclient, message, booleanValue) {

    if (!(await message.getContact()).isAdmin) {
        return wwclient.sendMessage((await message.getContact()).id, "only admins can change settings")
    }

    if (await (await message.getChat()).setMessagesAdminsOnly(booleanValue)) {
        wwclient.sendMessage(message.from, (booleanValue ? "Settings changed to admins only" : "Settings changed to all"))
        return true
    } 

    wwclient.sendMessage(message.from, "Not enough permissions to change settings")
    return false
}

export default changeMessageSettings 