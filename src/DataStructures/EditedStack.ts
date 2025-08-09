import { ChatId } from "whatsapp-web.js";
import EditedLL from "./EditedLinkedList";

class EditedStack {
    private lastEditedMessage: EditedLL | null;
    private chatID: ChatId;

    constuctor(chatID: ChatId, LEM: EditedLL | null = null) {
        this.chatID = chatID;
        this.lastEditedMessage = LEM;
    }
}k