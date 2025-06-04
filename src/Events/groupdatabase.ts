import { Chat, Contact, GroupNotification } from "whatsapp-web.js";
import { database, wwclient } from "../../main";
import { Document } from "nano";
import { RestartClient } from "./startup";

export async function addChatToDatabase(notification: GroupNotification) {
  const chat: Chat = await notification.getChat();
  const contact: Contact = await notification.getContact()

  try {
    let response = await database.get("Saves").then(
      async (response) => {
            //@ts-ignore
        for (let group of response.BlockedUsers) {
          if (group.groupId == chat.id._serialized) {
            return;
          }
        }
        //@ts-ignore
        response.BlockedUsers.push({
          groupId: chat.id._serialized,
          users: new Array(),
        });

        database.put(
          {
            _id: "Saves",
            _rev: response._rev,
            //@ts-ignore
            BlockedUsers: response.BlockedUsers,
            //@ts-ignore
            MyContacts: response.MyContacts
          }
        )
      }
    )

    
    //@ts-ignore
    await wwclient.sendMessage(process.env.PHONE_NUMBER_SERIALIZED, `New Group has been added to the database\n\nName: ${chat.name}\nProduced by ${contact.pushname}, number ${contact.number}`)
  } catch (error) {
    //@ts-ignore
    await wwclient.sendMessage(process.env.PHONE_NUMBER_SERIALIZED, `Error adding the new group to the database\n\nName: ${chat.name}\nProduced by ${contact.pushname}, number ${contact.number}` );
    //@ts-ignore
    await wwclient.sendMessage(process.env.PHONE_NUMBER_SERIALIZED, "Restarting Client")
    await RestartClient(wwclient)
    //@ts-ignore
    return await wwclient.sendMessage(process.env.PHONE_NUMBER_SERIALIZED, "Client has restarted")
  }
}
