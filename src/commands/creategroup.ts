import { Chat, Client, Contact, ContactId, CreateGroupResult, GroupParticipant, Message } from "whatsapp-web.js";


export async function createGroupChat(wwclient : Client, message : Message) : Promise<Message | void | Chat>{
    let participants : Array<Contact> | Array<GroupParticipant> | Array<ContactId> | Array<string>= await message.getMentions()
    const chat : Chat = await message.getChat()
    const contact : Contact = await message.getContact()

    if (!chat.isGroup) {
        return
    }

    let leaveChat : boolean = false
    let name : string;
    let digit : RegExp = /\d/

    console.log("here")
    if (participants.length != 0 && digit.test(message.body[(message.body.indexOf("@") + 1)])) {
        console.log("here too")
        name = message.body.slice(2, message.body.indexOf("@"))

    } else if (message.body.toLowerCase().endsWith("--everyone")) {

        leaveChat = true
        name = message.body.slice(2, message.body.length - 10)

        //@ts-ignore
        participants = chat.participants

        for (let num = 0; num < participants.length; num ++) {
            //@ts-ignore
            participants[num] = participants[num].id._serialized //not sure what string array I need to pass either serialized or just the number
        }

    } else {
        return
    }

    //@ts-ignore
    const group : CreateGroupResult = await wwclient.createGroup(
        name, 
        //@ts-expect-error
        participants,
        {
            autoSendInviteV4 : true,
            comment : `Join ${name}`
        }
    )

    const newGroupChat : Chat = await wwclient.getChatById(group.gid._serialized)

    //@ts-ignore
    await newGroupChat.setInfoAdminsOnly(true)

    //@ts-ignore
    await newGroupChat.setAddMembersAdminsOnly(true)

    //@ts-ignore
    await newGroupChat.promoteParticipants([contact.id._serialized])

    if (leaveChat) {
        //@ts-ignore
        await newGroupChat.leave()
    }

    //This message should be sent as a personal message to the user who invoked this function not in the group chat

    await message.react("✅")

    return newGroupChat
    
    //,cb <name of the new group> ( --everyone || @userMentions )
    //one rule the name of the group should not have "@" 
    //example := ,cg cse 114 asd as asd das @mentions  || ,cg cse 115 asdf a`sdefds --everyone

}