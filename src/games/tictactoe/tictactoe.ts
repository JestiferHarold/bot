import { Contact, Message } from "whatsapp-web.js";
import { wwclient } from "../../../main";
import { MessageEvent } from "../../Events/messageevent";
import { Game } from "./components";

export let chatId: string | undefined;
export let playerOne: string | undefined;
export let playerTwo: string | undefined;
// export let board: string[][] = new Array().push()

export default async function TicTacToe(message: Message) {
    chatId = (await message.getChat()).id._serialized;
    let mentions: Array<Contact> = await message.getMentions()
    if (mentions.length == 0) {
        return
    }

    if (mentions.length > 1) {
        return message.reply("You can mention only one other player")
    }

    playerOne = (await message.getContact()).id._serialized
    playerTwo = mentions[0].id._serialized

    wwclient.removeListener("message", MessageEvent);
    wwclient.addListener("message", Game)
}
