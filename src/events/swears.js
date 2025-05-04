let swears = [
    "darn",
    "heck",
    "idiot",
    "stupid",
    "douche",
    "crap",
    "jerk",
    "moron",
    "fuck"
];

async function checkSwears(wwclient, message) {
    let messageSplit = messsage.split(" ").length == 1 ? message : message.split(" ");
    for(let i = 0; i < swears.length; i ++) {
        if (messageSplit.includes(swears[i])) {
            let assured = await message.delete(await message.getChat())
            if (assured === true) {
                wwclient.sendMessage(message.from, "Swears not allowed")
            }
            wwclient.sendMessage(message.from, "Unable to delete")
            return true
        }
    } 
    return false
}

export default checkSwears