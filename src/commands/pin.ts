import { Message } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function pinMessage(message : Message) : Promise<boolean | void>{
    let target : Message;

    if (message.hasQuotedMsg) {
        target = await message.getQuotedMessage()
    } else {
        target = message;
    }

    let flags: Array<string> = message.body.split(" ")
    let duration : number =  60 * 60 // minimun is 1 hour

    if (flags[1].slice(0, 2) === "--"){
        try {
            duration = timelapse(flags[1])
        } catch (error) {
            return 
        }
    }

    return await target.pin(duration)
}

function timelapse(time : string) : number {

    switch (time.slice(-1)) {
        case "h" :
            return 60 * 60 * parseInt(time.slice(0, -1))
        case "d" :
            return 60 * 60 * 24 * parseInt(time.slice(0, -1))
        case "m" :
            return 60 * 60 * 24 * 28 * parseInt(time.slice(0, -1))
        default:
            throw new Error("Bad Flag")
    }
}

export default pinMessage