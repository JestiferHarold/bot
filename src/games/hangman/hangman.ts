import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { retriveWord } from "./components";
import { startTime, wwclient } from "../../../main";
import { MessageEvent } from "../../Events/messageevent";

let word: string | null = null
let chatId: string
let split: Array<string | undefined>
let guesses: number
let drawing

export async function hangman(message : Message) {
    word = await retriveWord()
    split = new Array(word.length).fill(undefined)
    chatId = (await message.getChat()).id._serialized
    guesses = 0
    drawing = await drawHangman(split);
    wwclient.removeListener("message", MessageEvent)
    wwclient.addListener("message", mainLoop);
    //@ts-ignore
    await wwclient.sendMessage(chatId, drawing.drawing, {caption: drawing.caption}) 
}

export const mainLoop = async (message: Message) => {    

    if (message.body.toLowerCase() == ",status") {
        return await message.reply(`\`\`\`Online\n\nUptime = ${Date.now() - startTime}\n\nCurrent Event = ${wwclient.listeners("message")}\`\`\``)
    }

    if (((await message.getChat()).id._serialized !=  chatId) ) {
        return
    }
    
    if (message.body.toLowerCase() == "answer" || message.body.toLowerCase() == "quit" || (message.body.toLowerCase() == "FORCE QUIT" && (await message.getContact()).id._serialized == process.env.PHONE_NUMBER_SERIALIZED )|| guesses == 6){
        //@ts-ignore
        await wwclient.sendMessage(chatId,"correct answer : " + word);
        wwclient.removeListener("message", mainLoop);
        wwclient.addListener("message", MessageEvent);
        return await message.react("");
    }

    if (message.body.length > 1) {
        return
    }

    if (/\d/.test(message.body)){
        return
    }

    if (word?.includes(message.body) && !(split.includes(message.body))) {
        for (let i = 0; i < word.length; i ++) {
            if (word[i] == message.body) {
                split[i] = message.body
            }
        }

        await message.react("👍")
        drawing = await drawHangman(split)
        //@ts-ignore
        return await wwclient.sendMessage(chatId,drawing.drawing, {caption: drawing.caption} )
    }       

    await message.react("👎")
    guesses ++;
    drawing = await drawHangman(split)
    //@ts-ignore
    await wwclient.sendMessage(chatId, drawing.drawing, {caption: drawing.caption})
}

async function drawHangman(words: Array<string | undefined>) : Promise<{
    drawing: MessageMedia | string, 
    caption: string
} | Client>{
    
    let caption = ""
    for (let a of words) {
        caption += (a == undefined ? " _ " : a)
    }

    let drawing: string = ""

    if (word == words.join("")) {
        await wwclient.sendMessage(chatId,"correct answer : " + word);
        wwclient.removeListener("message", mainLoop);
        return wwclient.addListener("message", MessageEvent);
    }

    const HANGMANPICS = [`
  +---+
  |   |
      |
      |
      |
      |
=========`, `
  +---+
  |   |
  O   |
      |
      |
      |
=========`, `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\  |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========`
]

    return {
        drawing: HANGMANPICS[guesses] + "\n\n" + caption, 
        caption: caption
    }
}
