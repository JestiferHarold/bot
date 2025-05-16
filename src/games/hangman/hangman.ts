import { Client, Message } from "whatsapp-web.js";
import { retriveWord } from "./components";

let word: string | null = null

async function hangman(wwclient : Client, message : Message) {
    word = await retriveWord()
    let booleanvalues : Array<boolean> = new Array(word.length).fill(false)
    
}

// console.log(await hangman())