import { Chat, Contact, Message } from "whatsapp-web.js"

export class SavedContact {
    contact_serialized : string
    cCounter : number

    public constructor(contact : string) {
        this.cCounter = 0
        this.contact_serialized = contact
    }

    public incrementCCounter() {this.cCounter++}

    public getCCounter() {return this.cCounter}
} 