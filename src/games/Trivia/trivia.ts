import { Client, Message } from "whatsapp-web.js";
import { Category, Difficulty, OpenTBResponseObjects, Type } from "../../types/opentrivia";
import { error } from "qrcode-terminal";

//,trivia -10 -cat -mid -type

let trivias : Array<string> = new Array()
let URL : string = "https://opentdb.com/api.php"

export async function PlaceHolder(wwclient : Client, message : Message) {

    if (message.body == "STOP") {
        trivias = new Array()
    }

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

    let response = await fetch(URL).then(async response => await response.json()).catch(error => error)

    if (response.response_code == 0) {
        response = response.results
        
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

function getType(flag : string) {

    switch (flag.slice(2).toLowerCase()) {
        case "multiple": 
            return Type.MultpleChoice
        case "boolean":
            return Type.BinaryChoice
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
        case "gk":
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