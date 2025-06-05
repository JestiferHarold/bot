import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { retriveWord } from "./components";
import { wwclient } from "../../../main";
import { MessageEvent } from "../../Events/messageevent";

let word: string | null = null
let chatId: string
let split: Array<string>
let guesses: number
let drawing

async function hangman(message : Message) {
    word = await retriveWord()
    split = new Array(word.length)
    let booleanvalues : Array<boolean> = new Array(word.length).fill(false)
    chatId = (await message.getChat()).id._serialized
    guesses = 0
    drawing = drawHangman(split);
    wwclient.removeListener("message", MessageEvent)
    wwclient.addListener("message", mainLoop);
    await wwclient.sendMessage(chatId, drawing[0], {caption: drawing[1]}) 
}

export const mainLoop = async (message: Message) => {    
    
    if (!((await message.getChat()).id._serialized == chatId) || (message.body.toLowerCase() == "FORCE QUIT" && (await message.getContact()).id._serialized == process.env.PHONE_NUMBER_SERIALIZED)) {
        return
    }
    
    if (message.body.toLowerCase() == "answer" || message.body.toLowerCase() == "quit") {
        //@ts-ignore
       await wwclient.sendMessage(chatId, word);
        wwclient.removeListener("message", mainLoop);
        wwclient.addListener("message", MessageEvent);
        return
    }

    if (message.body.length > 1) {
        return
    }

    if (/\d/.test(message.body)){
        return
    }

    if (word?.split("").includes(message.body) && !(split.includes(message.body))) {
        let i = 0;
        for (let j of word) {
            if (word == message.body) {
                i ++;
            }
        }

        if (i == 1) {
            split[word.indexOf(message.body)] = message.body
        } else {
            let integer: Array<number> = new Array()
            for (let i = 0; i < split.length; i ++) {
                if (word[i] == message.body) {
                    split[i] == message.body
                }
            }
        }

        drawing = drawHangman(split)
        return await wwclient.sendMessage(chatId,drawing[0], {caption: drawing[1]} )
    }       

    guesses ++;
}

function drawHangman(words: Array<string>) : {
    drawing: MessageMedia,
    caption: string
}{
    
}

// console.log(await hangman())
