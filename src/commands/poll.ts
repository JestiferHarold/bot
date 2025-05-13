import { Client, Message, Poll } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function createPoll(wwclient : Client, message : Message) : Promise<void | Message> {
    let body : string = message.body.slice(3)
    let pollArray : Array<string> = body.split("")
    
    if (pollArray.length < 3) {
        return
    }

    let allowMultipleAnswers : boolean = false

    if (pollArray.slice(-1)[0] == "-") {
        allowMultipleAnswers = pollArray.slice(-1)[0] == "t" ? true : false
    }

    let poll : Poll = new Poll(
        pollArray[0],
        pollArray.slice(1),
        {
            "allowMultipleAnswers" : allowMultipleAnswers,
            "messageSecret" : Array.from(
                {
                    length : 32
                }, 
                () => {
                   return Math.floor(Math.random() * 256)
                }
            )
        }
    )

    return wwclient.sendMessage(message.from, poll)
}

export default createPoll