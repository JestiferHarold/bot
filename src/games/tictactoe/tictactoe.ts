import { Contact, Message } from "whatsapp-web.js";
import { wwclient } from "../../../main";
import { MessageEvent } from "../../Events/messageevent";
import { Game, TicTacToeCoins, TTTPlayer } from "./components";

export let chatId: string | undefined;
export let playerOne: TTTPlayer
export let playerTwo: TTTPlayer
export let guesses: number
export let board: string[][] 
export let currentPlayer: TTTPlayer

export default async function TicTacToe(message: Message) {
    chatId = (await message.getChat()).id._serialized;
    let mentions: Array<Contact> = await message.getMentions()
    if (mentions.length == 0) {
        return
    }

    if (mentions.length > 1) {
        return message.reply("You can mention only one other player")
    }

    board = [
        [".", ".", "."],
        [".", ".", "."],
        [".", ".", "."]
    ]
    guesses = 0
    playerOne = {
        contact: (await message.getContact()),
        coin:([TicTacToeCoins.FULL_CROSS, TicTacToeCoins.FULL_ZERO][(Math.random() * 2)])
    }

    playerTwo = {
        contact: mentions[0],
        coin: playerOne.coin == TicTacToeCoins.FULL_CROSS ? TicTacToeCoins.FULL_ZERO : TicTacToeCoins.FULL_CROSS
    }

    currentPlayer = Math.random() * 2 == 1 ? playerOne : playerTwo
    await wwclient.sendMessage(message.from, `Game Started \nPlayer one *${playerOne.contact.name}* as *${playerOne.coin}*\nPlayer two *${playerTwo.contact.name}* as *${playerTwo.coin}*`)
    await wwclient.sendMessage(message.from, `*${currentPlayer.contact.name}* starts first`)

    wwclient.removeListener("message", MessageEvent);
    wwclient.addListener("message", Game)
}

//Can't change the var as it is an export so doing this
export function changePlayer() {
    currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne
}

export function playerHasGussed() {
    guesses++
}
