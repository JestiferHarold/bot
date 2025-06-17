import { Client, Message } from "whatsapp-web.js";
import { Category, Difficulty, OpenTBResponseObjects, Type } from "../../types/opentrivia";
import { error } from "qrcode-terminal";
import { MessageEvent } from "../../Events/messageevent";
import { wwclient } from "../../../main";

//,trivia -10 -cat -mid -type

let questions: any
let currTrivia: any
let counter: number
let chatId: any
let guesses: number
let options: any

export async function Trivia(message : Message) {

    let URL : string = "https://opentdb.com/api.php"

    // if trivias does exists

    let flags : Array<string> = message.body.split(" ").slice(1)
    const digit : RegExp = /\d/

    if (digit.test(message.body)) {
        //@ts-ignore
        URL += `?amount=${(message.body.match(/(\d+)/))[0]}`
    } else {
        URL += "?amount=10"
    }

    for (let flag of flags) {
        
        if (!(flag.startsWith("--") || flag.startsWith("-") || !digit.test(flag))) {
            continue
        }

        if (flag.slice(2).length < 4) {
            URL += getCategory(flag)
        }

        else if (flag.slice(2).length == 4) {
            URL += getDifficulty(flag)
        }

        else {
            URL += getType(flag)
        }
    }

    console.log(URL)


    let response = await fetch(URL).then(async response => await response.json()).catch(error => error)

    if (response.response_code == 0) {

        if (response.results.length == 0) {
            return
        }

        questions = new Array()
        for (let a of response.results) {
            questions.push(
                {
                    type: a.type,
                    difficulty: a.difficulty,
                    category: a.category,
                    question: a.question,
                    correctAnswer: a.correct_answer,
                    otherOptions: a.incorrect_answers
                }
            )
        }

        currTrivia = questions.pop()
        
        chatId = message.from
        counter = 1
        wwclient.removeListener("message", MessageEvent)
        wwclient.addListener("message", anotherEvent)
        await wwclient.sendMessage(message.from, "Open Trivia")
        await sendChat()
        
    }

    else if (response.response_code == 1) {
        try {
            throw OpenTBResponseObjects.NoResults.Error
        } catch (error) {
            //@ts-ignore
            return await wwclient.sendMessage(message.from, error.message)
        }
    }

    else if (response.response_code == 2) {
        try {
            throw OpenTBResponseObjects.InvalidParameter.Error
        } catch (error) {
            //@ts-ignore
            return await wwclient.sendMessage(message.from, error.message)
        }
    }

    else if (response.response_code == 3) {
        try {
            throw OpenTBResponseObjects.TokenNotFound.Error
        } catch (error) {
            //@ts-ignore
            return await wwclient.sendMessage(message.from, error.message)
        }
    }

    else if (response.response_code == 4) {
        try {
            throw OpenTBResponseObjects.TokenEmpty.Error
        } catch (error) {
            //@ts-ignore
            return await wwclient.sendMessage(message.from, error.message)
        }
    }

    else if (response.response_code == 5) {
        try {
            throw OpenTBResponseObjects.RateLimit.Error
        } catch (error) {
            //@ts-ignore
            return await wwclient.sendMessage(message.from, error.message)
        }
    }
    
}

const anotherEvent = async (message: Message) => {

    //@ts-ignore
    if (message.from != chatId) {
        return
    }

    if (message.body.toLowerCase() == "quit" || message.body.toLowerCase() == "leave" || questions.length == 0) {
        wwclient.removeListener("message", anotherEvent)
        wwclient.addListener("message", MessageEvent)
        return await message.react("👍") //put that god damn thumbs up here
    }

    if (message.body.toLowerCase() == "answer") {
        //@ts-ignore
        await wwclient.sendMessage(message.from, `\`\`\`Correct Answer : ${currTrivia.correctAnswer}\`\`\``)
        //@ts-ignore
        if (questions.length == 0) {
            await wwclient.sendMessage(message.from, "Questions depeleted")
        }
        currTrivia = questions.pop()
        counter++
        await sendChat()
        return
    }

    //@ts-ignore
    if (currTrivia.type == Type.BinaryChoice) {
        if (message.body.toLowerCase().includes("true") || message.body.toLowerCase().includes("false") || message.body.toLowerCase().includes("t") || message.body.toLowerCase().includes("f")) {
            let answer = message.body
            answer = answer.length > 1 ? answer : answer == "t" ? "true" : "false" //could make it more efficient
            //@ts-ignore
            if (answer == currTrivia.correctAnswer.toLowerCase()) {
                message.react("👍")
            } else {
                message.react("👎")
            }

            await wwclient.sendMessage(message.from, `\`\`\`Correct Answer : ${currTrivia.correctAnswer}\`\`\``)
            
            if (questions.length != 0) {
                //@ts-ignore
                currTrivia = questions.pop()
                counter++
                await sendChat()
            }
        }
        return
    }

    if (currTrivia.type == Type.MultpleChoice) {
        if (/\d/.test(message.body)) {
            try {
                let guess = parseInt(message.body)
                
                if (guess > 4 || guess < 1) {
                    return
                }

                if (guesses >= 2) {
                    if (currTrivia.correctAnswer == options[guess - 1]) {
                        await message.react("👍")
                    } else {
                        await message.react("👎")
                    }
                    await message.reply(`\`\`\`Correct Answer ${options.indexOf(currTrivia.correctAnswer) + 1} : ${currTrivia.correctAnswer}\`\`\``)
                    if (questions.length == 0) {
                    await wwclient.sendMessage(message.from, "Questions depeleted")
                   }
                    currTrivia = questions.pop()
                    counter++
                    return await sendChat()
                }

                //@ts-ignore
                if (currTrivia.correctAnswer == options[guess - 1]) {
                    await message.react("👍")
                   await message.reply(`\`\`\`Correct Answer ${guess} : ${currTrivia.correctAnswer}\`\`\``)
                   if (questions.length == 0) {
                    await wwclient.sendMessage(message.from, "Questions depeleted")
                   }
                   currTrivia = questions.pop()
                   counter++
                    return await sendChat()
                } 
                
                await message.react("👎")
                guesses++
            } catch (err) {}
        }
    }
}

async function sendChat() {
    if (currTrivia.type == Type.MultpleChoice) {
        guesses = 0
    }
    //@ts-ignore    
    if (currTrivia.type == Type.BinaryChoice) {
        await wwclient.sendMessage(chatId, `\`\`\`Question ${counter}\n\n\`\`\`` + "\`\`\`True or False\`\`\`\n\n" + `\`\`\`${currTrivia.question}\`\`\`` )
    } else {
        options = currTrivia.otherOptions
        options.splice(Math.random() * 4, 0, currTrivia.correctAnswer)
        await wwclient.sendMessage(chatId, `\`\`\`Question ${counter}\n\n${currTrivia.question}\n\nOptions\n\n1. ${options[0]}\n2. ${options[1]}\n3. ${options[2]}\n4. ${options[3]}\`\`\``)
    }
}

function getType(flag : string) {

    switch (flag.slice(2).toLowerCase()) {
        case "multiple": 
            return "&type=" + Type.MultpleChoice
        case "boolean":
            return "&type=" + Type.BinaryChoice
        default:
            throw new Error("What the fuck")
    }

}

function getDifficulty(flag : string) {

    switch (flag.slice(2).toLowerCase()) {
        case "easy":
            return Difficulty.Easy
        case "meum":
            return Difficulty.Medium
        case "hard":
            return Difficulty.Hard
        default:
            throw new Error("What the fuck")
    }

}

function getCategory(flag : string) {

    switch (flag.slice(2).toLowerCase()) {
        case "`gk`":
            return Category.GeneralKnowledge
        case "b":
            return Category.Books
        case "f":
            return Category.Flim
        case "m":
            return Category.Music
        case "mat":
            return Category.MusicalsAndTheatres
        case "tv":
            return Category.Television
        case "vg":
            return Category.VideoGames
        case "bg":
            return Category.BoardGames
        case "san":
            return Category.ScienceAndNature
        case "c":
            return Category.Computers
        case "m":
            return Category.Mathematics
        case "myt":
            return Category.Mythology
        case "s":
            return Category.Sports
        case "g":
            return Category.Geography
        case "h":
            return Category.History
        case "p":
            return Category.Politics
        case "art":
            return Category.Art
        case "cel":
            return Category.Celebrities
        case "ani":
            return Category.Animals
        case "veh":
            return Category.Vehicles
        case "com":
            return Category.Comics
        case "aam":
            return Category.AnimeAndManga
        case "caa":
            return Category.CartoonAndAnimation
        default:
            throw new Error("error again?")
    }
    
}

//in getcategory two options have the same case, fix it
