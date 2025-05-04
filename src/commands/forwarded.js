async function forwarded(message) {
    if (!message.hasQuotedMsg) {
        return
    }

    let quotedMessage = await message.getQuotedMsg()
    
    if (quotedMessage.isForwarded) {
        let times = quotedMessage.forwardingScore
        return message.reply(`The message has been forwarded ${times} ${times == 1 ? "time" : "times"}`);
    }
    
    return
}

export default forwarded