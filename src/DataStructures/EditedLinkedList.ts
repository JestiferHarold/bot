import { ChatId, ContactId } from "whatsapp-web.js";
import EditedNode from "./EditedNode";

class EditedLL {
    private lastEditedNode: EditedNode | null;
    private nextEditedList: EditedLL | null;
    private contactID: ContactId;

    constructor(contactID: ContactId, LEN: EditedNode | null = null, NEL: EditedLL | null = null) {
        this.contactID = contactID;
        this.lastEditedNode = LEN;
        this.nextEditedList = NEL;
    }
}

export default EditedLL