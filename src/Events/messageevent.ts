import { Message } from "whatsapp-web.js";
import { deleteBlockedUsersMessage } from "./deletemessages";
import { clientShutdown } from "../client/shutdown";
import { BlockUser, UnBlockUser } from "./revokeusers";
import { getDeletedMessage } from "../client/getrevokedmessage";
import { deletedMessage, startTime, wwclient } from "../../main";
import destroyClient from "../client/destroy";
import unpin from "../commands/unpin";
import unmute from "../commands/umute";
import sticker from "../commands/sticker";
import { setGroupPicture } from "../commands/setgrouppicture";
import { ScreenShot } from "../commands/screenshot";
import revokeGroupInvites from "../commands/revokeinvites";
import references from "../commands/references";
import createPoll from "../commands/poll";
import pinMessage from "../commands/pin";
import getChatName from "../commands/name";
import muteChat from "../commands/mute";
import susLinks from "../commands/link";
import { changeMessageSettings } from "../commands/groupinfo";
import getInviteCode from "../commands/invitecode";
import { groupName } from "../commands/groupsubject";
import { deleteGroupProfilePicture } from "../commands/groupprofiledel";
import { groupDescription } from "../commands/groupdescription";
import timesForwarded from "../commands/forwarded";
import { createGroupChat } from "../commands/creategroup";
import clearMessagesFromClient from "../commands/clear";
import ditherEffect from "../image/dither";
import fisheye from "../image/fisheye";
import flip from "../image/flip";
import greyscale from "../image/greyscale";
import HitlerlifyAvatar from "../image/hitler";
import sepia from "../image/sipia";
import { pixelate } from "../image/pixelate";
import invert from "../image/invert";
import circle from "../image/circle";
import gaussianBlur from "../image/blur";
import { memes } from "../jokes/imgflipmemes";
import { crackAJoke } from "../jokes/jokes";
import { kanyeSpeaks } from "../jokes/kanyequotes";
import { facts } from "../jokes/uselessfacts";
import { dadJoke } from "../jokes/dadjokes";
import { recieveAdvice } from "../jokes/advice";
import { EarthImage } from "../Nasa/earth";
import { Apod } from "../Nasa/apod";
import { getLyrics } from "../songs/lyricsovh";
import { paste } from "../pastebin/paste";
import { getRepositoryData } from "../GitLines/repositorylines";
import { CAAS } from "../Animals/cats/catasaservice";
import { askOllama, chooseModel } from "../Ai/ollama";
import { availableModels, mistralTextGeneration, modelSelector } from "../Ai/mistral";
import { geminiChat, immediateChat } from "../Ai/gemini";
import { PlaceHolder } from "../games/Trivia/trivia";
import { memoryGame } from "../games/timerecord/tr";


export const MessageEvent = async (message: Message ) => {
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
        case ",lg":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }
            await destroyClient(wwclient, message)
            break
        case ",shutdown":
            if (!(contact == process.env.PHONE_NUMBER_SERIALIZED)) {
                return
            }
           await clientShutdown(message)
           break
        case ",status":
            await message.reply(`Online\nUptime = ${Date.now() - startTime}`)
            break
        case ",trivia":
            await PlaceHolder(message)
            console.log('asd')
            break
        case ",test":
            await memoryGame(message)
            break
        default:
            return
        
    }
}
