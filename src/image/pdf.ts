import PDF from "pdfkit"
import { Client, Contact, Message, MessageMedia } from "whatsapp-web.js";
import fs from "fs"
import { wwclient } from "../../main";
import { MessageEvent } from "../Events/messageevent";

let contact: string
let chat: string
let document : PDFKit.PDFDocument
let timeout: NodeJS.Timeout
//,pdf --compress (or) -c 

export async function convertToPDF(message: Message) {
    let messageSplit: Array<string> = message.body.split(" ")
    document = new PDF(
        {
            compress: messageSplit.includes("-c") || messageSplit.includes("-compresss"),
            autoFirstPage: messageSplit.includes("-afp"),
            layout: messageSplit.includes("-p") ? "portrait" : "landscape"
        }
    )
    contact = (await message.getContact()).id._serialized
    chat = (await message.getChat()).id._serialized

    document.pipe(
        fs.createWriteStream("/temp/document.pdf")
    )

    wwclient.removeListener("message", MessageEvent)
    wwclient.addListener("message", PDFEVENT)
    
    timeout = setTimeout(async () => {
        wwclient.removeListener("message", PDFEVENT)
        wwclient.addListener("message", MessageEvent)
        return await wwclient.sendMessage(chat, "Ended")
    }, 30000)

}   

const PDFEVENT = async (message: Message) => {

    if (message.body.toLowerCase() == ",status") {
        return await message.reply("")
    }

    let localContact: string = (await message.getContact()).id._serialized
    let localChat: string = (await message.getChat()).id._serialized

    if (message.body.toLowerCase() == "force quit" && localContact == process.env.PHONE_NUMBER_SERIALIZED) {
        wwclient.removeListener("message", PDFEVENT)
        wwclient.addListener("message", MessageEvent)
        return await message.react("")   
    }

    if (localChat != chat) {return}
    if (localContact != contact) {return}

    if (localContact == contact && message.body.toLowerCase() == "quit") {
        wwclient.removeListener("message", PDFEVENT)
        wwclient.addListener("message", MessageEvent)
        return await message.react("")   
    }  

   let target : MessageMedia 

    if (!message.hasMedia) {
        if (message.hasQuotedMsg) {
            if ((await message.getQuotedMessage()).hasMedia) {
                target = await (await message.getQuotedMessage()).downloadMedia()
            }
        }
    } else if (message.hasMedia) {
        target = await message.downloadMedia()
    } else {
        return
    }

    //@ts-ignore
    document.image(target.data.split(",")[1])

    timeout.close()
    timeout = setTimeout(async () => {
        wwclient.removeListener("message", PDFEVENT)
        wwclient.addListener("message", MessageEvent)
        document.flushPages()
        drawPDF()
        return await wwclient.sendMessage(chat, "Ended")
    }, 30000)
}

function drawPDF() {
    document.end()
}
