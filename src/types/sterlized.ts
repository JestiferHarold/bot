import { MutedUser } from "../classes/BlockedUsers";
import { SavedContact } from "../classes/User";

export interface Sterlizing {

    BlockedUsers : Array < {
        groupId : string,
        isGroup : boolean,
        users  ?: Array< string >
    } >
    MyContacts : Array < {
        contact_serialized : string,
        cCounter : number
    } >

}