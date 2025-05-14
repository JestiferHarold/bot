import qrcode from 'qrcode-terminal'
import { Chat, ChatTypes, Client, Contact, LocalAuth } from 'whatsapp-web.js'
import { RevokedMessage } from './src/base/Text'

const wwclient : Client = new Client (
    {
        authStrategy : new LocalAuth (
            {
                dataPath : ""
            }
        )
    }
)
let chats : any | Array<Chat> | Array<RevokedMessage>
wwclient.on('qr', (qr) => {
    // yarn add qrcode-terminal
})

wwclient.on('ready', async () => {
    chats = await wwclient.getChats()
    for (let num = 0; num < chats.length; num ++) {
        chats[num] = new RevokedMessage(chats[num].id, chats[num].isGroup)
    }
})

wwclient.on('message_revoke_everyone', async (after, before) => {
    const body : string | null | undefined = before?.body
    let chat : Chat | undefined = await before?.getChat()
    let contact : Contact | undefined = await before?.getContact()
    chat = chat == undefined ? await after.getChat() : chat
    let num : number
    
    for (num = 0; num < chats.length; num ++) {
        if (chats[num].chat == chat.id) {
            chats[num].setMessage(
                before?.type,
                //@ts-expect-error
                contact.getFormattedNumber(),
                before?.body,
                (before?.hasMedia ? before.downloadMedia() : null),
                before?.isForwarded,
                before?.forward,
                before?.to,
                before?.timestamp
            )
            break
        }
    }
})
