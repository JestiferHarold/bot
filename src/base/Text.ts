import { ChatId, Message, MessageMedia, MessageTypes } from "whatsapp-web.js";

export class RevokedMessage{
    
    type : MessageTypes
    body ?: string
    media ?: MessageMedia | null
    contactId : string | number |undefined
    chat : ChatId
    group : boolean
    forwarded ?: boolean
    forwardingScore ?: number
    to ?: string | null
    timestamp : number

    public constructor(chat : ChatId, isGroup : boolean) {
        this.chat = chat
        this.group = isGroup
    }

    public setMessage(type : MessageTypes, contactId : string | number | undefined,  body : string = "", media : MessageMedia | null = null, forwarded : boolean, forwardingScore : number, to : string | null = null, timestamp : number) : void {
        this.type = type
        this.contactId = contactId
        this.body = body
        this.media = media
        this.forwarded = forwarded
        this.forwardingScore = forwardingScore
        this.to = to
        this.timestamp = timestamp
    }

    //Add the deleted seconds ago 
    public async deletedMessage(message : Message) : Promise<Message> {
        const customMessage : string = "Author : " +
                                 this.contactId +
                                 "Message Type : " + 
                                 this.type +  
                                 (this.body?.length != 0 ? `\nBody : ${this.body}` : "") +
                                 (this.to != null ? `Replying to ${this.to}` : "") +
                                 //@ts-expect-error
                                 (this.forwarded ? `Forwarded ${this.forwardingScore} ${this.forwardingScore > 1 ? "times" : "time"}` : "")
                                 
        if (this.media != null) {
            return await message.reply(
                customMessage,
                undefined,
                {
                    media : this.media
                }
            )
        } else {
            return await message.reply(
                customMessage
            )
        }
    }
}