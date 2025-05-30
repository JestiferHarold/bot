/*
    To anyone who is reading this, most of the commands, api's or whatever you call which are available here are made using simple fetch requests.
    So I'm confident that anyone can go through them with out any confusion, just because the main.ts file looks clean does'nt mean the other files too will be in that manner.
    As of writing this, I have completed some of the things I wanted to do.
    Most of the stuff I wrote here are while I'm sleep depraved
*/

import dotenv from "dotenv"
dotenv.config()
import { Chat, ChatTypes, Client, Contact, LocalAuth, MessageMedia } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal' //Importing error man fuck tsc, just import the function, don't default
import { QrcodeOptions } from 'ts-qrcode-terminal/types/types'
import { getDeletedMessage } from './src/client/getrevokedmessage'
import sticker from './src/commands/sticker'
import { setClientPicture } from './src/client/profilepicture'
import { crackAJoke } from './src/jokes/jokes'
import { getRepositoryData } from './src/GitLines/repositorylines'
import { PlaceHolder } from './src/games/Trivia/trivia'
import { RevokedMessage } from './src/classes/RevokedMessage'
import { SavedContact } from './src/classes/User'
import { MutedUser } from './src/classes/BlockedUsers'
import HitlerlifyAvatar from './src/image/hitler'
import { availableModels, mistralTextGeneration, modelSelector } from './src/Ai/mistral'
import { ScreenShot } from './src/commands/screenshot'
import { Apod } from './src/Nasa/apod'
import { EarthImage } from './src/Nasa/earth'
import { dadJoke } from './src/jokes/dadjokes'
import { kanyeSpeaks } from './src/jokes/kanyequotes'
import { geminiChat, immediateChat } from './src/Ai/gemini'
import { recieveAdvice } from './src/jokes/advice'
import { getLyrics } from './src/songs/lyricsovh'
import { convertToPDF } from './src/image/pdf'
import { textToSpeech } from './src/commands/tts'
import { CAAS } from './src/Animals/cats/catasaservice'
import { memes } from './src/jokes/imgflipmemes'
import { askOllama, chooseModel } from './src/Ai/ollama'
import Pouch from "pouchdb"
import { A, O } from 'ollama/dist/shared/ollama.e009de91'
import { Database } from './src/types/sterlized'
import doc, { save, setEncoding } from 'pdfkit'
import { blockUserMessages, unBlockUserMessages } from './src/client/blockmessages'
import { saveDeletedMessage } from "./src/Events/messagedeletion"
import { deleteBlockedUsersMessage } from "./src/Events/deletemessages"
import { StartClient } from "./src/noname/startup"
import { BlockUser, UnBlockUser } from "./src/Events/revokeusers"
import { paste } from "./src/pastebin/paste"
import { facts } from "./src/jokes/uselessfacts"
import gaussianBlur from "./src/image/blur"
import circle from "./src/image/circle"
import invert from "./src/image/invert"
import { pixelate } from "./src/image/pixelate"
import sepia from "./src/image/sipia"
import greyscale from "./src/image/greyscale"
import flip from "./src/image/flip"
import fisheye from "./src/image/fisheye"
import ditherEffect from "./src/image/dither"
import clearMessagesFromClient from "./src/commands/clear"
import { createGroupChat } from "./src/commands/creategroup"
import timesForwarded from "./src/commands/forwarded"
import { RetrieveFileOut$inboundSchema } from "@mistralai/mistralai/models/components"
import { groupDescription } from "./src/commands/groupdescription"
import { changeMessageSettings } from "./src/commands/groupinfo"
import { deleteGroupProfilePicture } from "./src/commands/groupprofiledel"
import { groupName } from "./src/commands/groupsubject"
import getInviteCode from "./src/commands/invitecode"
import susLinks from "./src/commands/link"
import muteChat from "./src/commands/mute"
import getChatName from "./src/commands/name"
import pinMessage from "./src/commands/pin"
import createPoll from "./src/commands/poll"
import references from "./src/commands/references"
import revokeGroupInvites from "./src/commands/revokeinvites"
import { setGroupPicture } from "./src/commands/setgrouppicture"
import unmute from "./src/commands/umute"
import unpin from "./src/commands/unpin"

const wwclient : Client = new Client(
    {
        authStrategy : new LocalAuth (
            {
                dataPath : "whatsapplog"
            }
        ),
        puppeteer : {
            headless : true,
            args : ['--no-sandbox', '--disable-setuid-sandbox']
        }
    }
)

export const database = new Pouch("Saves")
export let deletedMessage :Array<RevokedMessage> = new Array()
export let Groups: Array<MutedUser> = new Array()
export let Contacts: Array<SavedContact> = new Array()

wwclient.on('qr', qr => {
    qrcode.generate(
        qr,
        {
            small : true
        }
    )
})

wwclient.on("auth_failure", () => {
    console.log("Authentication failure")
})

wwclient.on("ready", async () => {

    await StartClient(wwclient) // Change the function names 
    console.log("started")
})

wwclient.initialize()

wwclient.on('message_revoke_everyone', async (after, before) => {
    await saveDeletedMessage(wwclient, before, after)
})

wwclient.on('message', async (message) => {
    if (await deleteBlockedUsersMessage(message)) {
        return
    }

    if (!message.body.startsWith(",")) {
        return
    }

    let contact: string = (await message.getContact()).id._serialized

    switch (message.body.split(" ")[0].toLowerCase()) {
        case ",block":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }
            await BlockUser(wwclient, message)
            break
        case ",unblock":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }
            await UnBlockUser(wwclient, message)
            break
        case ",s":
            await getDeletedMessage(message, deletedMessage)
            break
        case ",ic":
            await immediateChat(wwclient, message)
            break
        case ",jes":
            await geminiChat(wwclient, message)
            break
        case ",mist":
            if (message.body.split(" ")[1].toLowerCase() == "-m" || message.body.split(" ")[1].toLowerCase() == "--models") {
                await availableModels(wwclient, message)
            } else {
                await mistralTextGeneration(wwclient, message)
            }
            break
        case ",mistmodel":
            modelSelector(message.body.split(" ")[1].slice(2).toLowerCase()) 
            break
        case ",lam":
            await askOllama(wwclient, message)
            break
        case ",cmlam":
            await chooseModel(message) 
            break
        case ",cat":
            await CAAS(wwclient, message)
            break
        case ",repo":
            await getRepositoryData(wwclient, message)
            break
        case ",paste":
            await paste(wwclient, message)
            break
        case ",lyr":
            await getLyrics(wwclient, message)
            break
        case ",apod":
            await Apod(wwclient, message)
            break
        case ",earth":
            await EarthImage(wwclient, message)
            break
        case ",adv":
            await recieveAdvice(wwclient, message)
            break
        case ",dad":
            await dadJoke(wwclient, message)
            break
        case ",uf":
            await facts(wwclient, message)
            break
        case ",kanye":
            await kanyeSpeaks(wwclient, message)
            break
        case ",j":
            await crackAJoke(wwclient, message)
            break
        case ",flimg":
            await memes(wwclient, message)
            break
        case ",blur":
            await gaussianBlur(wwclient, message)
            break
        case ",circle":
            await circle(wwclient, message)
            break
        case ",inv":
            await invert(wwclient, message)
            break
        case ",pixel":
            await pixelate(wwclient, message)
            break
        case ",sepia":
            await sepia(wwclient, message)
            break
        case ",fuhrer":
            await HitlerlifyAvatar(wwclient, message)
            break
        case ",gs":
            await greyscale(wwclient, message)
            break
        case ",flip":
            await flip(wwclient, message)
            break
        case ",eye":
            await fisheye(wwclient, message)
            break
        case ",dither":
            await ditherEffect(wwclient, message)
            break
        case ",cm":
            await clearMessagesFromClient(wwclient, message)
            break
        case ",cg":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }
            await createGroupChat(wwclient, message)
            break
        case ",f":
            await timesForwarded(message)
            break
        case ",gd":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }
            await groupDescription(wwclient, message)
            break
        case ",gi":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }

            await changeMessageSettings(wwclient, message, message.body.toLowerCase().split(" ").includes("--admins") || message.body.toLowerCase().split(" ").includes("-a"))
            break
        case ",dpg":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }

            await deleteGroupProfilePicture(wwclient, message)
            break
        case ",sgn":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }

            await groupName(wwclient, message)
            break
        case ",inc":
            await getInviteCode(message)
            break
        case ",gms":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }
            await changeMessageSettings(wwclient, message,  message.body.toLowerCase().split(" ").includes("--admins") || message.body.toLowerCase().split(" ").includes("-a"))
            break
        case ",links":
            await susLinks(wwclient, message)
            break
        case ",mute":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }
            await muteChat(message)
            break
        case ",n":
            await getChatName(wwclient, message)
            break
        case ",pin":
            await pinMessage(message)
            break
        case ",poll":
            await createPoll(wwclient, message)
            break
        case ",refs":
            await references(wwclient, message)
            break
        case ",reiv":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }
            
            await revokeGroupInvites(wwclient, message)
            break
        case ",ss":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }

            await ScreenShot(wwclient, message)
            break
        case ",sgp":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }
            
            await setGroupPicture(wwclient, message)
            break
        case ",s":
            await sticker(wwclient, message)
            break
        case ",unmute":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }

            await unmute(message)
            break
        case ",unpin":
            await unpin(message)
            break
        default:
            return
    }
})
