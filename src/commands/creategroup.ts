import { Chat, Client, Contact, ContactId, CreateGroupResult, GroupParticipant, Message } from "whatsapp-web.js";

//No idea what to do, 9 - 11 - 2025

export async function createGroupChat(wwclient : Client, message : Message) : Promise<Message | void | Chat>{
    let participants : Array<Contact> | Array<GroupParticipant> | Array<ContactId> | Array<string>= await message.getMentions()
    const chat : Chat = await message.getChat()
    const contact : Contact = await message.getContact()
    const mentions: Array<Contact> = await message.getMentions()

    if (!chat.isGroup) {
        return
    }

    let leaveChat : boolean = false
    let name : string;
    // let digit : RegExp = /\d/


    // if (participants.length != 0 && digit.test(message.body[(message.body.indexOf("@") + 1)])) {
        // console.log("here too")
        // name = message.body.slice(2, message.body.indexOf("@"))

    // }
    if (mentions.length != 0) {
        leaveChat = (message.body.split(" ").includes("-l") || message.body.split(" ").includes("-leave"))
        name = message.body.split(" ").filter(element => { if (!element.startsWith("--") && !element.startsWith("-") && !element.startsWith(",")) { return element } }).join(" ")
        // participants = mentions.filter(elem => new Grop).push()
        return await message.reply("❌")
    } else if (message.body.toLowerCase().endsWith("--everyone") || message.body.toLowerCase().split(" ").includes("-e") || message.body.toLowerCase().split(" ").includes("-everyone")) {

        leaveChat = (message.body.split(" ").includes("-l") || message.body.split(" ").includes("-leave"))
        name = message.body.split(" ").filter(element => { if (!element.startsWith("--") && !element.startsWith("-") && !element.startsWith(",")) { return element } }).join(" ")

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
