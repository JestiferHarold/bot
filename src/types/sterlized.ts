import { MutedUser } from "../classes/BlockedUsers";
import { SavedContact } from "../classes/User";

export interface Database {

    BlockedUsers : Array < {
        groupId : string,
        users  ?: Array< string >
    } > ,
    MyContacts : Array < {
        contact_serialized : string,
        cCounter : number
    } >

}
