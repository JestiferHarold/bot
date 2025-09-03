import { ChatId, ContactId } from "whatsapp-web.js";
import EditedNode from "./EditedNode";

class EditedLL {
    private _recentlyEditedNode: EditedNode | null;
    private _nextEditedList: EditedLL | null;
    private _contactID: ContactId;

    constructor(contactID: ContactId, LEN: EditedNode | null = null, NEL: EditedLL | null = null) {
        this._contactID = contactID;
        this._recentlyEditedNode = LEN;
        this._nextEditedList = NEL;
    }

    get contactId(): ContactId {
        return this._contactID;
    }

    get recentylEditedNode(): EditedNode | null {
        return this._recentlyEditedNode;
    }

    get nextEditedList(): EditedLL | null {
        return this._nextEditedList;
    }

    set nextEditedList(list: EditedLL) {
        this._nextEditedList = list;
    }
}

export default EditedLL

// [] <- [] <- [] <- [recently edited node]