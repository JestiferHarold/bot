import { Chat, Contact, ContactId, Message } from "whatsapp-web.js";

class MessageNode {
    private nextMN: MessageNode | null;
    private message: Message;
    private contact: ContactId;

    async constructor(message: Message, nextMN: MessageNode | null = null) {
        this.message = message;
        this.nextMN = nextMN;
        this.contact = await message.getContact()
    }

    getMessage(): Message {
        return this.message;
    }

    getNextMessageNode(): MessageNode | null {
        return this.nextMN;
    }

    setNextMessageNode(MessageN: MessageNode | null) {
        this.nextMN = MessageN;
    }

}

export default MessageNode