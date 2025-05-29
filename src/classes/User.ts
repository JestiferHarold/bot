import { Chat, Contact, Message } from "whatsapp-web.js"

export class SavedContact {
    contact_serialized : string
    cCounter : number

    public constructor(contact : string, counter: number | undefined) {
        this.cCounter = counter || 0
        this.contact_serialized = contact
    }

    public incrementCCounter() {this.cCounter++}

    public getCCounter() {return this.cCounter}
} 
