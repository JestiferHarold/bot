import { Chat, Client, Contact, Message } from "whatsapp-web.js";


//deletes the messages sent by a single person in a chat
async function muteUser(wwclient : Client, message : Message, saves : any) {
    let chat : Chat | string = await message.getChat()
    
    if (!chat.isGroup) {
        return
    }

    chat = chat.id._serialized
    const mentions : Array<Contact>  = await message.getMentions()

    if (mentions.length == 0) {
        return
    }

    let contactIDs : Array<string> = new Array()

    for (let mention of mentions) {
        contactIDs.push(mention.id._serialized)
    }

    // for (const id of saves.BlockedUsers) {
    //     if (id.chatId == chat) {
    //         id.chatId.users.push()
    //     }
    // }
    //use index

    for (let i = 0; i < saves.BlockedUsers.length; i ++) {
        if (saves.BlockedUsers[i].chatId == chat) {
            saves.BlockedUsers[i].users.push(
                contactIDs.forEach(element => {
                    element
                })
            )
        }
    }

    return saves
} 