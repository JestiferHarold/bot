import { ChatId, MessageEditOptions } from "whatsapp-web.js";
import MessageNode from "./MessageNode";

class MessageStack {
    private _top: null | MessageNode;
    private _chat: ChatId;

    constructor (chat: ChatId, rootMessage: MessageNode | null) {
        this._chat = chat;
        this._top = rootMessage;
    }

    getChatID(): ChatId {
        return this._chat;
    }

    push(messageNode: MessageNode) {
        messageNode.nextMessageNode = this._top;
        this._top = messageNode;
    }

    pop_topMessage(): MessageNode | null {
        if (this._top == null) {
            // throw underflow exception
        }

        //@ts-ignore
        let temp: MessageNode = this._top;
        //@ts-ignore
        this._top = this._top?.getNextMessageNode();
        return temp;
    }

    peek_topMessage(): MessageNode | null {
        if (this._top == null) {
            // throw underflow exception
        }

        return this._top;
    }

    resetMessageStack(): boolean {
        let current: MessageNode | null = this._top;
        while (current != null) {
            let temp: MessageNode = current;
            //@ts-ignore
            current = current.NextMessageNode();
        }

        return true;
    }

    isEmpty(): boolean {
        return this._top == null;
    }    
}

export default MessageStack