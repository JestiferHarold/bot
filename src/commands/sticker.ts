import { Chat, Client, Contact, Message, MessageMedia } from "whatsapp-web.js";

async function sticker(wwclient : Client, message : Message) : Promise<void | Message>{
    let chat : Chat = await message.getChat()
    let contact : Contact = await message.getContact()
    let target : Message

    if (!message.hasQuotedMsg) {
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
        message.from,
        {
            sendMediaAsSticker : true,
            stickerAuthor : "whatsapp sticker maker"
        }
    )
}

export default sticker