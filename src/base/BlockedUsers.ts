import { Chat, Client, Contact, Message } from "whatsapp-web.js";
// import { User } from "./User";

class MutedUser{

    //this is for chat where teh users are muted 
    chat : Chat
    isGroup : boolean
    blockedUsers ?: Array<string>

    constructor(chat : Chat, isGroup : boolean) {
        this.chat = chat
        this.isGroup = isGroup
    }

    public async muteUser(message : Message) {
        const mentions : Array<Contact> = await message.getMentions()
        
        if (mentions.length == 0) {
            return
        }
        
        for (const mention of mentions) {
            const _serialized : string = mention.id._serialized
            if (!this.blockedUsers?.includes(_serialized)) {
                this.blockedUsers?.push(_serialized)
            }
        }
    }

    public async deleteMessage(message : Message) {
        const _serialized : string = (await message.getContact()).id._serialized
        if (this.blockedUsers?.includes(_serialized)) {
            await message.delete(true)
        }
    }

    public async unmuteUser(message : Message) {
        const mentions : Array<Contact> = await message.getMentions()
        
        if (mentions.length == 0) {
            return
        }
        
        for (const mention of mentions) {
            const _serialized : string = mention.id._serialized
            if (this.blockedUsers?.includes(_serialized)) {
                this.blockedUsers   //do this
            }
        }
    }


}