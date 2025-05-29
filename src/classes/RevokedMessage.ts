import { ChatId, Message, MessageMedia, MessageTypes } from "whatsapp-web.js";

export class RevokedMessage{
    
    type ?: MessageTypes
    body ?: string
    mediaMimeType ?: string
    mediaData ?: string
    contactId : string | number |undefined
    chat : string
    group : boolean
    forwarded ?: boolean
    forwardingScore ?: number
    to ?: string | null
    messageUp ?: number
    messageDown ?: number

    public constructor(chat : string, isGroup : boolean) {
        this.chat = chat
        this.group = isGroup
    }

    public async setMessage(type : MessageTypes | undefined, contactId : string | number | undefined,  body : string = "", mediaData : string | undefined, mediaMimeType: string | undefined , forwarded : boolean | undefined, forwardingScore : number | undefined, to : string | null = null, messageUpTime : number | undefined, messageDownTime : number | undefined) : Promise<void> {
        this.type = type
        this.contactId = contactId
        this.body = body
        this.mediaData = mediaData
        this.mediaMimeType = mediaMimeType
        this.forwarded = forwarded
        this.forwardingScore = forwardingScore
        this.to = to
        this.messageUp = messageUpTime
        this.messageDown = messageDownTime
    }

    //Add the deleted seconds ago := added ;)
    public async deletedMessage(message : Message) : Promise<Message | void> {
        if (this.body == undefined && this.to == undefined) {
            return 
        }
        const customMessage : string = "Author : " +
                                 this.contactId +
                                 "\nMessage Type : " + 
                                 this.type +  
                                 (this.body?.length != 0 ? `\nBody : ${this.body}` : "") +
                                 //@ts-ignore
//This is the time till the message was up until it was deleted **** (this.messageDown && this.messageUp ? `\nMessage Up Time : ${this.messageDown - this.messageUp} seconds` : ``) +
                                 (this.messageDown ? `\nMessage Down Time : ${(Math.floor(new Date().getTime()) / 1000 - this.messageDown).toFixed(0)} seconds` : ``) +
                                 //((Math.floor(new Date().getTime() / 1000))
                                 // I See no point in this
                                //  (this.to != null ? `\nReplying to ${this.to}` : "") + 
                                 //@ts-expect-error
                                 (this.forwarded ? `\nForwarded ${this.forwardingScore} ${this.forwardingScore > 1 ? "times" : "time"}` : "")
                                 
            if (this.type == MessageTypes.TEXT) {
                return await message.reply(
                customMessage,
                undefined, {
                    linkPreview : false,
                    sendAudioAsVoice : true,
                }
                )
            } 

            return await message.reply(
                //@ts-ignore
                new MessageMedia(this.mediaMimeType, this.mediaData),
                undefined, 
                {
                    caption: customMessage
                }
            )
    }
}
