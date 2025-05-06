import whatsapp from "whatsapp-web.js"

const {
    Poll
} = whatsapp

function createPoll(wwclient, message){
    let messageSliced = message.body.split("^")

    if (messageSliced.length <= 2) {
        return wwclient.sendMessage("Invaild number of arguments to make a poll")
    }

    let messageSliced2 = messageSliced.slice(2)

    let poll = new Poll(sliced[1], messageSliced2)

    return wwclient.sendMessage(message.from, poll)
}

export default createPoll