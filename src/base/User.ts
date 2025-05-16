import { Chat, Contact, Message } from "whatsapp-web.js"

class SavedContact {
    contact : Contact
    cCounter : number

    public constructor(contact : Contact) {
        this.cCounter = 0
        this.contact = contact
    }

    public incrementCCounter() {this.cCounter++}

    public getCCounter() {return this.cCounter}
} 