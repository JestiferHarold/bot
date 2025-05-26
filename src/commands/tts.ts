import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { Client, Message, MessageMedia } from "whatsapp-web.js";

const client = new TextToSpeechClient(
    {
        apiKey: process.env.GEMINI_API_KEY
    }
)

export async function textToSpeech(wwclient: Client, message: Message) {

    if (!message.hasQuotedMsg) {
        return
    }

    const text : string = (await message.getQuotedMessage()).body

    const response = await client.synthesizeSpeech(
        {
            input : {
                text : text
            },
            voice : {
                languageCode : "en-US",
                ssmlGender : 'FEMALE'
            },
            audioConfig : {
                audioEncoding : "MP3"
            }
        }
    )

    if (response[0].audioContent == undefined) {
        return
    }

    return await message.reply(
        //@ts-ignore
        response[0].audioContent,
        undefined,
        {
            sendAudioAsVoice : true
        }
    )
}
