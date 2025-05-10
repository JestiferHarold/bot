function shareReferences(wwclient, message) {
    wwclient.sendMessage(message.from, "https://docs.wwebjs.dev/")
    wwclient.sendMessage(message.from, "https://wwebjs.dev/")
    wwclient.sendMessage(message.from, "https://github.com/pedroslopez/whatsapp-web.js/blob/main/example.js")
    wwclient.sendMessage(message.from, "https://github.com/jestiferharold/bot")
}

export default shareReferences