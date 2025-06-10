import PDF from "pdfkit"
import { Client, Contact, Message, MessageMedia } from "whatsapp-web.js";
import fs from "fs"

let contact : Contact 

export async function convertToPDF(wwclient : Client, message: Message) {
    const document : PDFKit.PDFDocument = new PDF()
    contact = await message.getContact()

    document.pipe(
        fs.createWriteStream("C:/Users/sanju/OneDrive/Desktop/code/final port/temp/document.pdf")
    )

    let target : MessageMedia 

    if (!message.hasMedia) {
        if (message.hasQuotedMsg) {
            if ((await message.getQuotedMessage()).hasMedia) {
                target = await (await message.getQuotedMessage()).downloadMedia()
            }
        }
    } else {
        target = await message.downloadMedia()
    }

    //@ts-ignore
    document.image(target.data)

    document.end()

    return await message.reply(
        MessageMedia.fromFilePath("/temp/document.pdf")
    )
}   
