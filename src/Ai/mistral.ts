import { Mistral } from "@mistralai/mistralai";
import { AssistantMessage, ChatCompletionResponse, ContentChunk, FinishReason } from "@mistralai/mistralai/models/components";
import { Client, Message } from "whatsapp-web.js";
import { MistralAIModels } from "../types/AiTypes";

const MistralClient : Mistral = new Mistral(
    {
        apiKey : process.env.MISTRAL_API_KEY
    }
)

let model: MistralAIModels = MistralAIModels.MistralSmall

export function modelSelector(message: string) {

    switch(message) {
        case "c":
            model =  MistralAIModels.Codestral
            break
        case "d":
            model =  MistralAIModels.Devstral
            break
        case "mn":
            model =  MistralAIModels.MistralNemo
            break
        case "ms":
            model =  MistralAIModels.MistralSmall
            break
        case "p":
            model =  MistralAIModels.Pixtral
            break
        case "codestral":
            model =  MistralAIModels.Codestral
            break
        case "devstral":
            model =  MistralAIModels.Devstral
            break
        case "mistralnemo":
            model =  MistralAIModels.MistralNemo
            break
        case "mistralsmall":
            model =  MistralAIModels.MistralSmall
            break
        case "pixtral":
            model =  MistralAIModels.Pixtral
            break
        default:
            throw new Error("Model error")
    } 

}

export async function availableModels(wwclient: Client, message: Message) {
    return await wwclient.sendMessage(
            message.from, 
            "\`\`\`" +
            "Models" +
            "\`\`\`" + 
            `\n\n${MistralAIModels.Codestral} :: \`-c\` or \`--codestral\`` + 
            `\n${MistralAIModels.Devstral} :: \`-d\` or \`--devstral\`` +
            `\n${MistralAIModels.MistralNemo} :: \`-mn\` or \`--mistralnemo\`` +
            `\n${MistralAIModels.MistralSmall} :: \`-ms\` or \`--mistralsmall\`` +
            `\n${MistralAIModels.Pixtral} :: \`-p\` or \`--pixtral`
        )
}

export async function mistralTextGeneration(wwclient : Client, message : Message) {

    const prompt : string = message.body.split(" ").slice(1).join(" ")
    let response: ChatCompletionResponse
    try {
        response = await MistralClient.chat.complete(
            {
                model : model,
                temperature : 0.9,
                safePrompt : false,
                stream : false,
                responseFormat : {
                    type : "json_object"
                },
                messages : [
                    {
                        role : "system",
                        //Okay, Now I really do believe that frenchies are good at nothing other than love making, because wtfFFFFFF. 
                        content: "You are an AI assistant that helps the user with their needs. You MUST respond in valid JSON format.  The JSON should have a 'response' key containing your answer."
                    },
                    {
                        role : "user",
                        content : prompt
                    }
                ]
            }
        )
    } catch (error) {
        //@ts-ignore
        return await wwclient.sendMessage(message.from, error.message)
    }

    //@ts-ignore
    if (response.choices == undefined || response.choices.length == 0 || response.choices[0].FinishReason == FinishReason.Error) {
        return await wwclient.sendMessage(message.from, "Mistral Error")
    }

    const responseText : string | Array<ContentChunk> | null | undefined | AssistantMessage = response.choices[0].message.content   

    if (typeof responseText == undefined || typeof responseText == null ) {
        return await wwclient.sendMessage(message.from, "Mistral Error")
    }

    //@ts-ignore
    if (typeof responseText == Array<ContentChunk>) {
        //whatever that should come here :: I'm running out of whatever that makes me do all this non-sense.
    }

    //@ts-ignore
    return await message.reply(JSON.parse(responseText).response)

}
