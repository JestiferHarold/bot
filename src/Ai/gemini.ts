//@ts-ignore
import { GoogleGenerativeAI, GoogleGenAI, ChatSession, GenerateContentResult, GenerativeModel } from "@google/generative-ai"
import { Client, Message, MessageMedia } from "whatsapp-web.js"

//@ts-ignore
const genAI : GoogleGenerativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const systemText: string = "You are jessica harrow, you help people in their daily needs by providing usefull prompts"

const model : GenerativeModel = genAI.getGenerativeModel(
    {
        model : "gemini-2.0-flash"
    }
)

const imageModel : GenerativeModel = genAI.getGenerativeModel(
    {
        model : "gemini-2.0-flash-preview-image-generation"
    },
    {
        timeout : 150
    }
)

const imageChat: ChatSession = imageModel.startChat(
    {
         history : [
            {
                role : "user",
                parts : [
                    {
                        text : systemText
                    }
                ]
            }
        ],
    }
)

let chat : ChatSession = model.startChat(
    {
        history : [
            {
                role : "user",
                parts : [
                    {
                        text : systemText
                    }
                ]
            }
        ],
        
    }
)

async function geminiChat(wwclient : Client,message : Message) {

    let media : MessageMedia | undefined = undefined

    if (!message.hasMedia) {
        if(!message.hasQuotedMsg) {
        } else {
            message = await message.getQuotedMessage()
            if (message.hasMedia) {
                media = await message.downloadMedia()
            }
        }
    } else {
        media = await message.downloadMedia()
    }

    const text : string = message.body.split(" ").slice(1).join("")

    const prompt =  media != undefined ? ([{text: text}, {inlineData: {mimeType: media.mimetype, data: media.data}}]) : [{text: text}]

    const response : GenerateContentResult = await chat.sendMessage(prompt)
    const responseText : string = response.response.text()
    return await message.reply(responseText ? responseText : "error generating")

}

//I don't know why I'm dumb

async function immediateChat(wwclient : Client, message : Message) {

    const prompt : string = message.body.split(" ").slice(1).join("")
    let media : MessageMedia | undefined = undefined

    if (!message.hasMedia) {
        if(message.hasQuotedMsg) {
            message = await message.getQuotedMessage()
            if (message.hasMedia) {
                media = await message.downloadMedia()
            }
        }
    } else if (message.hasMedia) {
        media = await message.downloadMedia()
    }
    
    let parts = [
            {
                text: prompt
            }
        ]
    if (media != undefined) {
        parts = [
            {
                text: prompt,
            },
            
        ]
    }

    const response = await imageModel.generateContent({
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: prompt
                    }
                ]
            }
        ]
    })
    // const response : GenerateContentResult | void = await imageChat.sendMessage(parts).catch(error => console.log(error.message))

    // const responseText = response.candidates[0].content.parts
    console.log(response)
}

// ASD ASD gemini cannot send images :: it is there     
async function generateImage(wwclient : Client, message : Message) {
    
    const prompt : string = message.body.split(" ").slice(1).join("")
    let media : MessageMedia | undefined = undefined

    if (!message.hasMedia) {
        if(message.hasQuotedMsg) {
            message = await message.getQuotedMessage()
            if (message.hasMedia) {
                media = await message.downloadMedia()
            }
        }
    } else if (message.hasMedia) {
        media = await message.downloadMedia()
    }
    
    let parts = [
            {
                text: prompt
            }
        ]
    if (media != undefined) {
        parts.push(
            {
                //@ts-ignore
                inlineData: {
                    mimeType: media.mimetype,
                    data: media.data
                }
            }
        ) 
    }

    // const response = await imageModel.generateContent(
    //     {
    //         contents : [
    //             {
    //                 role : "user",
    //                 parts : [
    //                     parts
    //                 ]
    //             }
    //         ]
    //     }
    // )
    
}

//GeminiChat and geminiChatForImages work 

async function restartGemini(message: Message) {
    chat = model.startChat(
        {
            history : [
                {
                    role : "user",
                    parts : [
                        {
                            text : systemText
                        }
                    ]
                }
            ],
            
        }
    )

    return await message.reply("Gemini Chat restarted")
}

export default {
    geminiChat,
    immediateChat,
    generateImage,
    restartGemini
}