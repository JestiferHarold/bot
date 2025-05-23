import { Client, Message } from "whatsapp-web.js";

export async function getRepositoryData(wwclient : Client, message : Message) {
    let repository : string = message.body.split(" ")[1]

    if (repository.startsWith("https://github.com/") || repository.startsWith("github.com/")) {
        repository = repository.split("/").slice(-1, -2).join("/")
    }

    let branch : string = ""

    if (message.body.split(" ")[2].toLowerCase().includes("--branch") || message.body.split(" ")[2].toLowerCase().includes("-b")) {
        branch = message.body.split(" ")[3]
    }

    const endPoint : string = `https://api.codetabs.com/v1/loc?github=${repository}${(branch ? "&branch=" + branch : "")}`
    //@ts-ignore
    let responseFetch = await fetch(endPoint).catch(async error => await wwclient.sendMessage(process.env.PHONE_NUMBER_SERIALIZED, "error"))
    //@ts-ignore
    let response = responseFetch.json()
    let reply : string = ""

    if (response == undefined) {
        return 
    }

    //@ts-ignore
    for (let language of response) {
                 //@ts-ignore
        reply += `Language : ${language.language}\n` +
                 //@ts-ignore
                 `Number of files : ${language.files}\n` +
                 //@ts-ignore
                 `Lines of Code : ${language.linesOfCode}\n`
    }

    return await wwclient.sendMessage(message.from, reply)
}