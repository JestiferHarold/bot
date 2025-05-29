import { Chat, ChatTypes, Client, Contact, LocalAuth, MessageMedia } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal' //Importing error man fuck tsc, just import the function, don't default
import { QrcodeOptions } from 'ts-qrcode-terminal/types/types'
import { getDeletedMessage } from './src/client/getrevokedmessage'
import sticker from './src/commands/sticker'
import { setClientPicture } from './src/client/profilepicture'
import { crackAJoke } from './src/jokes/jokes'
import { getRepositoryData } from './src/GitLines/repositorylines'
import { PlaceHolder } from './src/games/Trivia/trivia'
import { RevokedMessage } from './src/classes/RevokedMessage'
import { SavedContact } from './src/classes/User'
import { MutedUser } from './src/classes/BlockedUsers'
import HitlerlifyAvatar from './src/image/hitler'

//imp 
import dotenv from "dotenv"
dotenv.config()
import { mistralTextGeneration } from './src/Ai/mistral'
import { ScreenShot } from './src/commands/screenshot'
import { Apod } from './src/Nasa/apod'
import { EarthImage } from './src/Nasa/earth'
import { dadJoke } from './src/jokes/dadjokes'
import { kanyeSpeaks } from './src/jokes/kanyequotes'
import { geminiChat, geminiChatForImages } from './src/Ai/gemini'
import { recieveAdvice } from './src/jokes/advice'
import { getLyrics } from './src/songs/lyricsovh'
import { convertToPDF } from './src/image/pdf'
import { textToSpeech } from './src/commands/tts'
import { CAAS } from './src/Animals/cats/catasaservice'
import { memes } from './src/jokes/imgflipmemes'
import { askOllama } from './src/Ai/ollama'
import Pouch from "pouchdb"
import { O } from 'ollama/dist/shared/ollama.e009de91'
import { Database } from './src/types/sterlized'
import doc, { save } from 'pdfkit'
import { blockUserMessages } from './src/client/muteuser'

const database = new Pouch("Saves")

const wwclient : Client = new Client(
    {
        authStrategy : new LocalAuth (
            {
                dataPath : "whatsapplog"
            }
        ),
        puppeteer : {
            headless : true,
            args : ['--no-sandbox', '--disable-setuid-sandbox']
        }
    }
)

let deletedMessage :Array<RevokedMessage> = new Array()
let Groups = new Array()
let Contacts = new Array()

wwclient.on('qr', qr => {
    qrcode.generate(
        qr,
        {
            small : true
        }
    )
})

wwclient.on("auth_failure", () => {
    console.log("Authentication failure")
})

wwclient.on("ready", async () => {

    let response
    try {

        response = await database.get("Saves")
        //@ts-ignore
        let document1 = response.doc
        for (let chat of document1.BlockedUsers) {
            Groups.push(
                new MutedUser(
                    chat.groupId,
                    true
                )
            )
            Groups.at(-1).muteUserById(
                chat.users
            )
            deletedMessage.push(
                new RevokedMessage(chat.groupId, true)
            )
        }
        
        for (let contact of document1.MyContacts) {
            Contacts.push(
                new SavedContact(contact.contact_serialized, 0)
            )
        }

    } catch (err) {
        let chats: Array<Chat> = await wwclient.getChats()
        let saves: Database = {
            BlockedUsers: chats.filter(element => element.isGroup).map(
                    (element: Chat) => {
                        return {
                            groupId: element.id._serialized,
                            users: new Array()
                        }
                    }
                ),
            MyContacts: chats.map(element => {return {contact_serialized: element.id._serialized, cCounter: 0}})
        }

        database.put(
            {
                _id : "Saves",
                doc: saves
            }
        )

        Groups.push(
            saves.BlockedUsers.filter
        )
    }

    console.log("started")
})

wwclient.initialize()

wwclient.on('ready', () => {console.log("started")})

wwclient.on('message_revoke_everyone', async (after, before) => {
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

        console.log(await before.downloadMedia())
    } 

    for (let num : number = 0; num < deletedMessage.length; num ++) {
        if (deletedMessage[num].chat == chat.id._serialized) {
            deletedMessage[num].setMessage(
                before?.type,
                //@ts-expect-error
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
})

wwclient.on('message', async (message) => {
    if (message.body.startsWith(",block")) {
        // await blockUserMessages(wwclient, message, save)
    }
    switch (message.body.split(" ")[0].toLowerCase()) {
        case ",s":
            await getDeletedMessage(message, deletedMessage)
            break
        case ",cg":
            break
        case ",sticker":
            await sticker(wwclient, message)
            break
        case ",pp":
            await setClientPicture(wwclient, message)
            break
        case ",block":
            break
    }
})

// wwclient.on('message', async (message) => {

//     const contact : Contact = await message.getContact()

//     if (!contact.isMyContact) {
//         return
//     }

//     if (cmds.includes(message.body.split(" ")[0].toLowerCase())) {

//         let index
//         for (index = 0; index < mycontacts.length; index ++) {
//             if (mycontacts[index].contact_serialized == contact.id._serialized) {
//                 mycontacts[index].incrementCCounter()
//                 return
//             } 
//         }
//     }
// })

// wwclient.on("ready", () => {
//     console.log("started")
    
// })

wwclient.on("message", async (message) => {
    if (message.body.slice(0,4) == ",gen") {
        // await mistralTextGeneration(wwclient, message)
    }

    if (message.body.slice(0,4) == ",img") {
        await geminiChatForImages(wwclient, message)
    }

    if (message.body.startsWith(",r")) {
        await getRepositoryData(wwclient, message)
    }

    if (message.body.startsWith(",apod")) {
        await Apod(wwclient, message)
    }
})

wwclient.on("message", async (message) => {
    if (message.body.startsWith(",asd")) {
        await HitlerlifyAvatar(wwclient, message)
    }

    if (message.body.startsWith(",caas")) {
        await CAAS(wwclient, message)
    }

    console.log((await message.getContact()).id)
})
