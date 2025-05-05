const {GoogleGenAI, GoogleGenerativeAI} = require('@google/generative-ai')
const { Jimp } = require('jimp')

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const gen = new GoogleGenAI(
    {
        "apiKey" : process.env.GEMINI_API_KEY
    }
)

const model = genAi.getGenerativeModel(
    {
        model : "gemini-2.0-flash"
    }
)

const chat = model.startChat({

})

async function textGenerator(message) {
    let response = (await chat.sendMessage(
        message.body
    )).response

    let text = response.text()

    return message.reply(text)
}

async function textReGenerator(message) {
    let chat2 = await message.getChat()
    let contact = await message.getContact()
    let quotedMessage

    if (!message.hasMedia){
        if (message.hasQuotedMsg) {
            quotedMessage = await message.getQuotedMsg()
            if (!quotedMessage.hasMedia) {
                return
            }
        } else {
            return 
        }
    } else {
        quotedMessage = message
    }

    // let response = (await gen.files.GEMINI_API_KEY

    // ))   
}