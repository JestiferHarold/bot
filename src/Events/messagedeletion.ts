import { Client, Message, Contact, Chat } from "whatsapp-web.js";
import { deletedMessage } from "../../main";

export async function saveDeletedMessage(wwclient: Client, before: Message | null | undefined, after: Message) {
    const body : string | null | undefined = before?.body
    let chat : Chat | undefined = await before?.getChat()
    let contact : Contact | undefined = await before?.getContact()
    chat = chat == undefined ? await after.getChat() : chat
    let data = undefined, mimetype = undefined
    
    if (before?.hasMedia) {
        //@ts-ignore
        data = before._data.body
        //@ts-ignore
        mimetype = before._data.mimetype || "image/jpeg"
    } 

    for (let num : number = 0; num < deletedMessage.length; num ++) {
        if (deletedMessage[num].chat == chat.id._serialized) {
            deletedMessage[num].setMessage(
                before?.type,
                //@ts-ignore
                await contact.getFormattedNumber(),
                before?.body,
                data,
                mimetype,
                before?.isForwarded,
                before?.forwardingScore,
                before?.to,
                before?.timestamp,
                after.timestamp
            )
            break
        }
    }
}
