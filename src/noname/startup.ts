import { Client, Chat } from "whatsapp-web.js"
import { Contacts, database, deletedMessage, Groups } from "../../main"
import { MutedUser } from "../classes/BlockedUsers"
import { RevokedMessage } from "../classes/RevokedMessage"
import { SavedContact } from "../classes/User"
import { Database } from "../types/sterlized"

export async function StartClient(wwclient: Client) {
    let response
    try {

        response = await database.get("Saves")

        let document1 = response
        //@ts-ignore
        for (let chat of document1.BlockedUsers) {
            Groups.push(
                new MutedUser(
                    chat.groupId,
                    true
                )
            )
            
            Groups[Groups.length - 1].muteUserById(chat.users)

            deletedMessage.push(
                new RevokedMessage(chat.groupId, true)
            )
        }
        //@ts-ignore
        for (let contact of document1.MyContacts) {
            Contacts.push(
                new SavedContact(contact.contact_serialized, 0)
            )
        }
    } catch (err) {
        let chats: Array<Chat> = await wwclient.getChats()
        let saves: Database = {
            BlockedUsers: chats.filter(element => element.isGroup).map(
                    (element: Chat) => {
                        return {
                            groupId: element.id._serialized,
                            users: new Array()
                        }
                    }
                ),
            MyContacts: chats.map(element => {return {contact_serialized: element.id._serialized, cCounter: 0}})
        }
        database.put(
            {
                _id : "Saves",
                BlockedUsers: saves.BlockedUsers,
                MyContacts: saves.MyContacts
            }
        )
        for (let user of saves.BlockedUsers) {
            Groups.push(
                    new MutedUser(user.groupId, true)
            )
        }
    }

    for (let chat of await wwclient.getChats()) {
        await chat.sendSeen()
    }

}
