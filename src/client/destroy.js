async function destroyClient(wwclient, message) {
    wwclient.sendMessage(message.from, "Client Destroyed")

    return await wwclient.destroy()
} 

export default destroyClient