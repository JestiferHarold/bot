async function changeInfoSettings(wwclient, message, booleanValue) {

    if (!(await message.getContact()).isAdmin) {
        return wwclient.sendMessage((await message.getContact()).id, "only admins can change settings")
    }
    
    if (await (await message.getChat()).setInfoAdminsOnly(booleanValue)) {
        wwclient.sendMessage(message.from, (booleanValue ? "Group info set to admins" : "Group info set to all"))
        return true
    } 

    wwclient.sendMessage(message.from, "Not enough permissions to change settings")
    return false
}

export default changeInfoSettings