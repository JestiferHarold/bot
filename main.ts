import { Chat, ChatTypes, Client, Contact, LocalAuth, MessageMedia } from 'whatsapp-web.js'
import {generate} from 'qrcode-terminal' //Importing error man fuck tsc, just import the function, don't default
import { QrcodeOptions } from 'ts-qrcode-terminal/types/types'
import { RevokedMessage } from './src/base/RevokedMessage'
import { getDeletedMessage } from './src/client/deletedmessage'
import { createGroupChat } from './src/commands/creategroup'
import sticker from './src/commands/sticker'
import { setClientPicture } from './src/client/profilepicture'

const wwclient : Client = new Client (
    {
        authStrategy : new LocalAuth (
            {
                dataPath : "logging"
            }
        )
    }
)

let chats : any | Array<Chat> | Array<RevokedMessage> 

wwclient.on('qr', (qr) => {
    generate(
        qr,
        {
            small : true
        }
    )
})

wwclient.initialize()

wwclient.on('ready', async () => {
    console.log("Client on")
    chats = await wwclient.getChats()
    for (let num = 0; num < chats.length; num ++) {
        chats[num] = new RevokedMessage(chats[num].id._serialized, chats[num].isGroup)
    }
})

wwclient.on('message_revoke_everyone', async (after, before) => {
    const body : string | null | undefined = before?.body
    let chat : Chat | undefined = await before?.getChat()
    let contact : Contact | undefined = await before?.getContact()
    chat = chat == undefined ? await after.getChat() : chat
    let media : MessageMedia | null
    
    if (before?.hasMedia) {
        media = await before.downloadMedia()
        console.log(media)
    } else {
        media = null
    }

    for (let num : number = 0; num < chats.length; num ++) {
        if (chats[num].chat == chat.id._serialized) {
            chats[num].setMessage(
                before?.type,
                //@ts-expect-error
                await contact.getFormattedNumber(),
                before?.body,
                media,
                before?.isForwarded,
                before?.forwardingScore,
                before?.to,
                before?.timestamp,
                after.timestamp
            )
            break
        }
    }
})

wwclient.on('message', async (message) => {
    if (message.body == ",s") {
        await getDeletedMessage(message, chats)
    }
})  

wwclient.on('message', async (message) => {
    if (message.body.slice(0,2) == ",c") {
        await createGroupChat(wwclient, message)
    }

    if (message.body == ",sticker") {
        await sticker(wwclient, message)
    }

    if (message.body.slice(0, 3) == ",pp") {
        await setClientPicture(wwclient, message)
    }
})
