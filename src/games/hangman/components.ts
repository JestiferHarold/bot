import { readFile } from "node:fs/promises";

export async function retriveWord() : Promise<string>{

    try {
        const data = await readFile('src/games/hangman/words.txt', 'utf-8')
        return (data.split(/\s+/)[Math.floor( Math.random() * (data.split(/\s+/)).length )])
    } catch (error) {
        return " "
    }
    
}

