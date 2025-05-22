//@ts-ignore
import { GoogleGenerativeAI, GoogleGenAI, ChatSession, GenerateContentResult, GenerativeModel } from "@google/generative-ai"
import { Client, Message, MessageMedia } from "whatsapp-web.js"

//@ts-ignore
const genAI : GoogleGenerativeAI = new GoogleGenerativeAI(process.env.GEMINI_API)

const model : GenerativeModel = genAI.getGenerativeModel(
    {
        model : "gemini-2.0-flash"
    }
)

const imageModel : GenerativeModel = genAI.getGenerativeModel(
    {
        model : "gemini-2.0-flash-exp-image-generation"
    },
    {
        timeout : 150
    }
)

const chat : ChatSession = model.startChat(
    {
        history : [
            {
                role : "user",
                parts : [
                    {
                        text : "asd asd fr fr"
                    }
                ]
            }
        ]
    }
)

export async function geminiChat(wwclient : Client,message : Message) {

    const prompt : string = message.body.split(" ").slice(1).join("")
    const response : Promise<GenerateContentResult> = chat.sendMessage(prompt)
    const responseText : string = (await response).response.text()
    return await message.reply(responseText ? responseText : "error generating")

}

//I don't know why I'm dumb

export async function geminiChatForImages(wwclient : Client, message : Message) {

    const prompt : string = message.body.split(" ").slice(1).join("")
    let media : MessageMedia

    if (!message.hasMedia) {
        if(!message.hasQuotedMsg) {
            return
        } else {
            message = await message.getQuotedMessage()
            if (!message.hasMedia) {
                return
            }
            media = await message.downloadMedia()
        }
    } else {
        media = await message.downloadMedia()
    }
    console.log(
        media.data,
        media.filesize,
        media.mimetype
    )
    const response : Promise<GenerateContentResult> = model.generateContent(
        {
         contents : [
            {
                role : 'user',
                parts : [
                     {
                        inlineData : {
                            mimeType : media.mimetype,
                            data : media.data
                        }       
                     },
                    {
                        text : prompt
                    }
                    
                ]
            }
         ]

        }
    )

    const responseText : string = (await response).response.text()
    return await message.reply(responseText)
}

// ASD ASD gemini cannot send images
export async function generateImage(wwclient : Client, message : Message) {
    const prompt : string = message.body.split(" ").slice(1).join("")
    const response = imageModel.generateContent(
        {
            contents : [
                {
                    role : "user",
                    parts : [
                        {
                            text : prompt
                        }
                    ]
                }
            ]
        }
    )

    
}

//GeminiChat and geminiChatForImages work 