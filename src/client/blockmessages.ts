import { Chat, Client, Contact, Message } from "whatsapp-web.js";
import { MutedUser } from "../classes/BlockedUsers";
import { Groups } from "../../main";

export async function blockUserMessages(wwclient : Client, message : Message, saves : Array<MutedUser>) {
    
    let chat : Chat = await message.getChat()
    
    if (!chat.isGroup) {
        return
    }

    const mentions : Array<Contact>  = await message.getMentions()

    if (mentions.length == 0) {
        return null
    }

    let contactIDs : Array<string> = new Array()

    for (let mention of mentions) {
        contactIDs.push(mention.id._serialized)
    }

    for (let i = 0; i < saves.length; i ++) {
        if (saves[i].chat_serialized == chat.id._serialized) {
            for (let id of contactIDs) {
                saves[i].muteUser(id)
            }
            break
        }
    }

    await message.react("👍")
    return [chat.id._serialized, contactIDs]
} 

export async function unBlockUserMessages(wwclient: Client, message: Message) {
    
    let chat: Chat = await message.getChat()

    if (!chat.isGroup) {
        return null
    }

    const mentions: Array<Contact> | Array<string> = await message.getMentions()

    if (mentions.length == 0) {
        return
    }

    for (let i = 0; i < Groups.length; i++) {
        if (Groups[i].chat_serialized == chat.id._serialized) {
            Groups[i].unmuteUser(mentions.map(element => element.id._serialized))
        }
    }

    return [chat.id._serialized, mentions.map(element => element.id._serialized)]
} 
