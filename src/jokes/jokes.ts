import { Client, Message, Chat } from "whatsapp-web.js";

export async function crackAJoke(message : Message, wwclient : Client) {
    let url : string = "https://v2.jokeapi.dev/joke/"
    let timeout : number = 0
    
    if (message.body.toLowerCase().endsWith("--all") || message.body.toLowerCase().endsWith("-a")) {
        url += "Any"
    } else {
        url += "Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    }

    if (message.body.toLowerCase().split(" ").includes("-t") || message.body.toLowerCase().split(" ").includes("--twopart")) {
        url += (url.endsWith("y") ? "?type=twopart" : "&type=twopart")
        timeout = 30000
    } else {
        url += (url.endsWith("y") ? "?type=single" : "&type=single")
    }

    const response = await fetch(url)
    
    if (typeof response == undefined) {
        
        await wwclient.sendMessage(
            message.from,
            //@ts-ignore
            [
                "Judge: \"I sentence you to the maximum punishment...\"\nMe (thinking): \"Please be death, please be death...\"\nJudge: \"Learn Java!\"\nMe: \"Damn.\"",
                "ASCII silly question, get a silly ANSI.",
                "My little daughter came to me all excited, saying \"Daddy! Daddy! Guess how old I'll be in June!\"\n\"Oh I don't know princess, why don't you tell me?\" I said. She gave me a huge smile and held up four fingers.\nIt's now three hours later, police have joined in and she still won't say where she got them.",
                "How do you make holy water? You freeze it and drill holes in it.",
                "Being a self-taught developer is almost the same as being a cut neck chicken because you have no sense of direction in the beginning.",
                "My wife is really mad at the fact that I have no sense of direction.\nSo I packed up my stuff and right.",
                "Java is like Alzheimer's, it starts off slow, but eventually, your memory is gone."
            ][Math.floor(Math.random() * 7)]
        )
    }

    const joke = response.json()
    //@ts-ignore
    if (joke.type == "twopart") {
        //@ts-ignore
        await wwclient.sendMessage(message.from, joke.setup)
        setTimeout(() => {}, timeout)
        //@ts-ignore
        return await wwclient.sendMessage(message.from, joke.delivery)
    }

    //@ts-ignore
    return await wwclient.sendMessage(message.from, joke.joke)
}