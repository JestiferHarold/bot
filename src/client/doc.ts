import { Client, Message } from "whatsapp-web.js";

async function Documentation(wwclient : Client, message : Message, name : string, command : string | string[], description : string | string[], requiresAdmin : boolean, note : string = "" ) : Promise<Message> {
    return await message.reply(
        `\`\`\` ${name} \`\`\`` +
        `\' ${command} \`` +
        `\`\`\` ${description.slice()}` +
        (requiresAdmin ? "*_ Requires Administrative Permission _*" : "") +
        (note.length != 0 ? `> Note : ${note}` : "")
    )
}