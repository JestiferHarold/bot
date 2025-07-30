import { ChatId, MessageEditOptions } from "whatsapp-web.js";
import MessageNode from "./MessageNode";

class MessageStack {
    private top: null | MessageNode;
    private chat: ChatId;

    constructor (chat: ChatId, rootMessage: MessageNode | null) {
        this.chat = chat;
        this.top = rootMessage;
    }

    getChatID(): ChatId {
        return this.chat;
    }

    popTopMessage(): MessageNode | null {
        if (this.top == null) {
            // throw underflow exception
        }

        //@ts-ignore
        let temp: MessageNode = this.top;
        //@ts-ignore
        this.top = this.top?.getNextMessageNode();
        return temp;
    }

    peekTopMessage(): MessageNode | null {
        if (this.top == null) {
            // throw underflow exception
        }

        return this.top;
    }

    resetMessageStack(): boolean {
        let current: MessageNode | null = this.top;
        while (current != null) {
            let temp: MessageNode = current;
            current = current.getNextMessageNode();
            //delete it 
        }

        return true;
    }


}

export default MessageStack