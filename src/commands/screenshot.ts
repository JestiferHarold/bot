import { Client, Message } from "whatsapp-web.js"
// import {launch} from 'pup'

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function ScreenShot(wwclient : Client, message : Message) {
    let links : Array<{
            link: string,
            isSuspicious: boolean
        }> = message.links
    let target : any

    if (links.length == 0) {
        if (message.hasQuotedMsg) {
            target = await message.getQuotedMessage()
            links = target.links
            if (links.length == 0) {
                return
            }
        } else {
            return
        }
    } 

    if (links[0].isSuspicious) {
        return message.react("X") //Put that cross emoji here
    }

    //Bruh install puppeteer first
    // const Browser = await launch
}