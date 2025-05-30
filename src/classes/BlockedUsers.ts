import { Chat, Client, Contact, Message } from "whatsapp-web.js";

/*
    @Deprecated (More like I have no idea what I did here) :: what the fuck did I even do here? :: some how i did it
*/

export class MutedUser{

    //this is for chat where teh users are muted, a user can be muted in one chat but he is free to message in another
    isGroup : boolean
    blockedUsers : Array<string>
    chat_serialized: string

    constructor(chat : string, isGroup : boolean) {
        this.isGroup = isGroup
        this.blockedUsers = new Array()
        this.chat_serialized = chat
    }

    public muteUser(contactId : string) {

        if (!this.blockedUsers.includes(contactId)) {
            this.blockedUsers.push(contactId)
        }
    }

    public muteUserById(ids: string | string[]) {
       for (let id of ids) {
            let index: number = this.blockedUsers.indexOf(id)
            if (true) {
                //@ts-ignore
                // this.blockedUsers?.splice(index, 1)
                this.blockedUsers.push(id)
            }
       }
    } 

    public async deleteMessage(message : Message) {
        const _serialized : string = (await message.getContact()).id._serialized
        if (this.blockedUsers?.includes(_serialized)) {
            await message.delete(true)
        }
    }

    public async unmuteUser(mentions: string[]) {
        
        for (const _serialized of mentions) {
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
