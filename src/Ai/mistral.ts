import { Mistral } from "@mistralai/mistralai";
import { ChatCompletionResponse, ContentChunk, FinishReason } from "@mistralai/mistralai/models/components";
import { Client, Message } from "whatsapp-web.js";

const MistralClient : Mistral = new Mistral(
    {
        apiKey : process.env.MISTRAL_API_KEY
    }
)

export async function mistralTextGeneration(wwclient : Client, message : Message) {
    const prompt : string = message.body.split(" ").slice(1).join(" ")
    const response : ChatCompletionResponse = await MistralClient.chat.complete(
        {
            model : "mistral-small-2503",
            temperature : 0.1,
            safePrompt : true,
            stream : false,
            responseFormat : {
                type : "json_object"
            },
            messages : [
                {
                    role : "user",
                    content : prompt
                }
            ]
        }
    )

    //@ts-ignore
    if (response.choices == undefined || response.choices[0].FinishReason == FinishReason.Error) {
        return await wwclient.sendMessage(message.from, "Mistral Error")
    }

    const responseText : string | Array<ContentChunk> | null | undefined = response.choices[0].message.content
    if (typeof responseText == undefined || typeof responseText == null ) {
        return await wwclient.sendMessage(message.from, "Mistral Error")
    }

    //@ts-ignore
    if (typeof responseText == Array<ContentChunk>) {
        //whatever that should come here
    }

    //@ts-ignore
    return await message.reply(responseText)
}