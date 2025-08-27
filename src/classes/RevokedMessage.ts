import { ChatId, Contact, Message, MessageMedia, MessageTypes } from "whatsapp-web.js";
import { wwclient } from "../../main";

export class RevokedMessage {
    
    type ?: MessageTypes
    body ?: string
    mediaMimeType ?: string
    mediaData ?: string
    contactId ?: string | number
    chat : string
    group : boolean
    forwarded ?: boolean
    forwardingScore ?: number
    to ?: string | null
    messageUp ?: number
    messageDown ?: number
    beforeEditing ?: string
    afterEditing ?: string
    editedBy ?: string

    public constructor(chat : string, isGroup : boolean) {
        this.chat = chat
        this.group = isGroup
    }

    public setMessage(type : MessageTypes | undefined, contactId : string | number | undefined,  body : string = "", mediaData : string | undefined, mediaMimeType: string | undefined , forwarded : boolean | undefined, forwardingScore : number | undefined, to : string | null = null, messageUpTime : number | undefined, messageDownTime : number | undefined) : void {
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

    public async setEditedMessage(before: string | undefined, after: string | undefined, contact: string | undefined) {
        this.beforeEditing = before,
        this.afterEditing = after,
        this.editedBy = contact
    }

    //Add the deleted seconds ago := added ;)
    public async getDeletedMessage(message : Message) : Promise<Message | void> {
        if (this.body == undefined && this.to == undefined) {
            return 
        }
        
        let messageTo = this.chat
        
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

            if (message.body.split(" ").includes("-sd") || message.body.split(" ").includes("-SD")) {
                this.setMessage(undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)
            } else if (message.body.split(" ").includes("-d") || message.body.split(" ").includes("-D")) {
                return this.setMessage(undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)
            }

            if (message.body.split(" ").includes("-p") || message.body.split(" ").includes("-P")) {
                messageTo = (await message.getContact()).id._serialized
            }

            if (this.type == MessageTypes.TEXT) {
                if (this.chat == messageTo) {
                    return await message.reply(
                        customMessage,
                        undefined, {
                            linkPreview : false,
                            sendAudioAsVoice : true,
                        }
                    )
                } else {
                    return await wwclient.sendMessage(messageTo, customMessage + `\nChat Name: ${(await message.getChat()).name, {
                            linkPreview : false,
                            sendAudioAsVoice : true,
                        }}`)
                }
            } 
            
            if (messageTo == this.chat ) return await message.reply(
                //@ts-ignore
                new MessageMedia(this.mediaMimeType, this.mediaData),
                undefined, 
                {
                    caption: customMessage
                }
            ) 

            //@ts-ignore
            return await wwclient.sendMessage(messageTo,new MessageMedia(this.mediaMimeType, this.mediaData),{ caption: customMessage }) 
    }

    public async getEditedMessage(message: Message) {
        if (this.afterEditing == undefined && this.beforeEditing == undefined && this.editedBy == undefined) { 
            return
        }

        let messageTo = this.chat
        let body: string = `Message Edited from *${this.beforeEditing}* to *${this.afterEditing}* by *${this.editedBy}*`

        if (message.body.split(" ").includes("-sd") || message.body.split(" ").includes("-SD")) {
            this.setEditedMessage(undefined, undefined, undefined)
        } else if (message.body.split(" ").includes("-d") || message.body.split(" ").includes("-D")) {
            return this.setEditedMessage(undefined, undefined, undefined)
        }

        if (message.body.split(" ").includes("-p") || message.body.split(" ").includes("-P")) {
            messageTo = (await message.getChat()).id._serialized
            body += `\nFrom *${this.chat}*`
        }

        if (messageTo == this.chat) return await message.reply(body)
        return await wwclient.sendMessage(messageTo, body)
    }

}
