import { Chat, ChatTypes, Client, Contact, LocalAuth, MessageMedia } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal' //Importing error man fuck tsc, just import the function, don't default
import { QrcodeOptions } from 'ts-qrcode-terminal/types/types'
// import { RevokedMessage } from './src/classes/RevokedMessage'
// import { getDeletedMessage } from './src/client/getrevokedmessage'
// import { createGroupChat } from './src/commands/creategroup'
// import sticker from './src/commands/sticker'
// import { setClientPicture } from './src/client/profilepicture'
// import { SavedContact } from './src/classes/User'
// import { MutedUser } from './src/classes/BlockedUsers'
// import { writeFile } from "fs"
// import { Sterlizing } from './src/types/sterlized'
import { geminiChat, geminiChatForImages } from './src/Ai/gemini'
import { mistralTextGeneration } from './src/Ai/mistral'
import { crackAJoke } from './src/jokes/jokes'
import { getRepositoryData } from './src/GitLines/repositorylines'

const wwclient : Client = new Client(
    {
        authStrategy : new LocalAuth (
            {
                dataPath : "whatsapplog"
            }
        )
    }
)

// let chats : any | Array<Chat> | Array<RevokedMessage>
// let revokedChats : Array<RevokedMessage> = new Array() 
// let mycontacts : Array<SavedContact> = new Array()
// let cmds : Array<string> = new Array()
// let response
// let groupsMuted : Array< MutedUser > = new Array()

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

wwclient.initialize()

// wwclient.on('ready', async () => {

//     response : JSON = await fetch("./saves.json").then(parsedjson => parsedjson.json()).catch(error => console.log("Saves error"))

//     chats = await wwclient.getChats()
    
//     let objects : Sterlizing = {
//         BlockedUsers : [],
//         MyContacts : []
//     }

//     if (response == undefined) {
//         for (let chat of chats) {

//             if (chat.isGroup) {
//                 const what = new MutedUser(chat.id._serialized, true)

//                 groupsMuted.push(what)
//                 objects.BlockedUsers.push(
//                     {
//                         groupId : chat.id._serialized,
//                         isGroup : true
//                     }
//                 )
//                 revokedChats.push(new RevokedMessage(chat.id._serialized, chat.isGroup))
//             }
            
//         }

//         for (let contact of await wwclient.getContacts()) {
//             if (contact.isMyContact && !contact.isBlocked && !contact.isBusiness && !contact.isEnterprise && !contact.isGroup) {
//                 const asd = new SavedContact(contact.id._serialized)
//                 mycontacts.push(asd)
//                 objects.MyContacts.push(
//                     {
//                         contact_serialized : contact.id._serialized,
//                         cCounter : 0
//                     }
//                 )
//             }
//         } 
//     }

//     else {
//         //@ts-ignore
//         for (let chat in response.BlockedUsers) {
            
//         }
//     }
    

    

//     writeFile("saves.json", objects.toString(), (error) => {
//         if (error) throw error;
//     })

//     console.log("Client started")

// })

// wwclient.on('message_revoke_everyone', async (after, before) => {
//     const body : string | null | undefined = before?.body
//     let chat : Chat | undefined = await before?.getChat()
//     let contact : Contact | undefined = await before?.getContact()
//     chat = chat == undefined ? await after.getChat() : chat
//     let media : MessageMedia | null
    
//     if (before?.hasMedia) {
//         media = await before.downloadMedia()
//         console.log(media)
//     } else {
//         media = null
//     }

//     for (let num : number = 0; num < chats.length; num ++) {
//         if (chats[num].chat == chat.id._serialized) {
//             chats[num].setMessage(
//                 before?.type,
//                 //@ts-expect-error
//                 await contact.getFormattedNumber(),
//                 before?.body,
//                 media,
//                 before?.isForwarded,
//                 before?.forwardingScore,
//                 before?.to,
//                 before?.timestamp,
//                 after.timestamp
//             )
//             break
//         }
//     }
// })

// wwclient.on('message', async (message) => {
//     switch (message.body.split(" ")[0].toLowerCase()) {
//         case ",s":
//             await getDeletedMessage(message, chats)
//             break
//         case ",cg":
//             await createGroupChat(wwclient, message)
//             break
//         case ",sticker":
//             await sticker(wwclient, message)
//             break
//         case ",pp":
//             await setClientPicture(wwclient, message)
//             break
//         case ",block":
//             break
//     }
// })

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

wwclient.on("ready", () => {
    console.log("started")
})

wwclient.on("message", async (message) => {
    if (message.body.slice(0,4) == ",gen") {
        await mistralTextGeneration(wwclient, message)
    }

    if (message.body.slice(0,4) == ",img") {
        await geminiChatForImages(wwclient, message)
    }

    if (message.body.startsWith(",r")) {
        await getRepositoryData(wwclient, message)
    }
})