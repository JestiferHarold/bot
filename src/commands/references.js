function shareReferences(wwclient, message) {
    wwclient.sendMessage(message.from, "https://docs.wwebjs.dev/")
    wwclient.sendMessage(message.from, "https://wwebjs.dev/")
    wwclient.sendMessage(message.from, "https://github.com/pedroslopez/whatsapp-web.js/blob/main/example.js")
}

export default shareReferences