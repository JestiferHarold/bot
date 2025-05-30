import { Client, Message } from "whatsapp-web.js";
import { database, Groups } from "../../main";
import { blockUserMessages, unBlockUserMessages } from "../client/blockmessages";

export async function BlockUser(wwclient: Client, message: Message) {
    let id = await blockUserMessages(wwclient, message, Groups)
    
    if (id == null) {
        return
    }

    await database.get("Saves").then(
        async doc => {
            //@ts-ignore
            for (let i = 0; i < doc.BlockedUsers.length; i++) {
                //@ts-ignore
                if (doc.BlockedUsers[i].groupId == id[0]) {
                    for (let user of id[1]) {
                        //@ts-ignore
                        doc.BlockedUsers[i].users.push(user)
                    }
                    break
                }
            }
            await database.put(
                {
                    _id: "Saves",
                    _rev: doc._rev,
                    //@ts-ignore
                    BlockedUsers: doc.BlockedUsers,
                    //@ts-ignore
                    MyContacts: doc.MyContacts
                
                }
            )
        }
    ).catch(err => err) 

    message.react("👍")
}

export async function UnBlockUser(wwclient: Client, message: Message) {
    let id = await unBlockUserMessages(wwclient, message)

    if (id == null) {
        return
    }

    await database.get("Saves").then(
        async document => {
            //@ts-ignore
            for (let i = 0; i < document.BlockedUsers.length; i++) {
                //@ts-ignore
                if (document.BlockedUsers[i].groupId == id[0]) {
                    for (let user of id[1]) {
                        //@ts-ignore
                        if (!document.BlockedUsers[i].users.includes(id[0])) {
                            //@ts-ignore
                            document.BlockedUsers[i].users.push(id[0])
                        }
                    }
                    break
                }
            }

            await database.put(
                {
                    _id: "Saves",
                    _rev: document._rev,
                    //@ts-ignore
                    BlockedUsers: document.BlockedUsers,
                    //@ts-ignore
                    MyContacts: document.MyContacts
                }
            )
        }
    ).catch(async error => await wwclient.sendMessage(message.from, error.message))

    message.react("👍")
}
