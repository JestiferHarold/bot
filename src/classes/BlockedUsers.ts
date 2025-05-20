import { Chat, Client, Contact, Message } from "whatsapp-web.js";

export class MutedUser{

    //this is for chat where teh users are muted 
    chat : Chat
    isGroup : boolean
    blockedUsers ?: Array<string>

    constructor(chat : Chat, isGroup : boolean) {
        this.chat = chat
        this.isGroup = isGroup
    }

    public async muteUser(message : Message, saves : any) {

            let chat : Chat | string = await message.getChat()
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
            //use index based

            for (let i = 0; i < saves.BlockedUsers.length; i ++) {
                if (saves.BlockedUsers[i].chatId == chat) {
                    contactIDs.forEach(element => {
                        saves.BlockedUsers[i].users.includes(element) ? null : saves.BlockedUsers[i].users.push(element)
                    })
                }
            }

            for (const contactID of contactIDs) {
                if (!this.blockedUsers?.includes(contactID)) {
                    this.blockedUsers?.push(contactID)
                }
            }

            return saves
    }

    public async deleteMessage(message : Message) {
        const _serialized : string = (await message.getContact()).id._serialized
        if (this.blockedUsers?.includes(_serialized)) {
            await message.delete(true)
        }
    }

    public async unmuteUser(message : Message, saves : any) {
        const mentions : Array<Contact> = await message.getMentions()
        
        if (mentions.length == 0) {
            return
        }
        
        for (const mention of mentions) {
            const _serialized : string = mention.id._serialized
            
            if (this.blockedUsers?.includes(_serialized)) {
                this.blockedUsers = this.blockedUsers.filter(
                    item => {
                        if (!(item == _serialized)) {
                            return item
                        }
                    }
                )
            }

        }

        
    }


}