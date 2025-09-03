import { Chat, Contact, ContactId, Message } from "whatsapp-web.js";

class MessageNode {
    private _nextMN: MessageNode | null;
    private _message: Message;

    constructor(message: Message, nextMN: MessageNode | null = null) {
        this._message = message;
        this._nextMN = nextMN;
    }

    public get Message(): Message {
        return this._message;
    }

    public get nextMessageNode(): MessageNode | null {
        return this._nextMN;
    }

    public set nextMessageNode(MessageN: MessageNode | null) {
        this._nextMN = MessageN;
    }
}

export default MessageNode