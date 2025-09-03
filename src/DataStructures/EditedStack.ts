import { ChatId } from "whatsapp-web.js";
import EditedLL from "./EditedLinkedList";

class EditedStack {
    private _recentlyEditedMessage: EditedLL | null;
    private _chatID: ChatId;

    constuctor(chatID: ChatId, REM: EditedLL | null = null) {
        this._chatID = chatID;
        this._recentlyEditedMessage = REM;
    }

    get chatID(): ChatId {
        return this._chatID;
    }

    isEmpty(): boolean {
        return this._recentlyEditedMessage == null;
    }

    // no getter for this because this is basically the top of a stack function :: maybe Im wrong, lets see
    recentlyEditedMessage(): EditedLL | null {
        return this._recentlyEditedMessage;
    }

    push(editedLinkedList: EditedLL) {
        this._recentlyEditedMessage?.nextEditedList = editedLinkedList;
    }

    popTopEditedList(): EditedLL | null {
        if (this.isEmpty()) {
            //Throw error 
        }

        let temp = this._recentlyEditedMessage;
        this._recentlyEditedMessage = this._recentlyEditedMessage?.nextEditedList;
        return temp;
    }

    
}