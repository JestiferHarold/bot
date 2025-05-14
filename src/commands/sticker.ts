import { Chat, Client, Contact, Message, MessageMedia } from "whatsapp-web.js";

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

async function sticker(wwclient : Client, message : Message) : Promise<void | Message>{
    let chat : Chat = await message.getChat()
    let contact : Contact = await message.getContact()
    let target : Message

    if (!message.hasMedia) {
        if (message.hasQuotedMsg) {
            target = await message.getQuotedMessage()
            if (!target.hasMedia) {
                return
            }
        } else {
            return
        }
    } else {
        target = message
    }

    let media : MessageMedia = await target.downloadMedia()

    return await message.reply(
        media,
        undefined,
        {
            //@ts-ignore
            sendMediaAsSticker: true,
            stickerAuthor : "whatsapp sticker maker"
        }
    )
}

export default sticker