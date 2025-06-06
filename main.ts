/*
    To anyone who is reading this, most of the commands, api's or whatever you call which are available here are made using simple fetch requests.
    So I'm confident that anyone can go through them with out any confusion, just because the main.ts file looks clean does'nt mean the other files too will be in that manner.
    As of writing this, I have completed some of the things I wanted to do.
    Most of the stuff I wrote here are while I'm sleep depraved
*/

import dotenv from "dotenv"
dotenv.config()
import { Client, LocalAuth } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal' //Importing error man fuck tsc, just import the function, don't default
import { RevokedMessage } from './src/classes/RevokedMessage'
import { SavedContact } from './src/classes/User'
import { MutedUser } from './src/classes/BlockedUsers'
import Pouch from "pouchdb"
import { saveDeletedMessage } from "./src/Events/messagedeletion"
import { StartClient } from "./src/Events/startup"
import { MessageEvent } from "./src/Events/messageevent"
import { addChatToDatabase } from "./src/Events/groupdatabase"

export const wwclient : Client = new Client(
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

export const startTime: number = Date.now()
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
    //@ts-ignore
    await wwclient.sendMessage(process.env.PHONE_NUMBER_SERIALIZED, "Client started")
})

wwclient.initialize()

wwclient.on('message_revoke_everyone', async (after, before) => {
    await saveDeletedMessage(wwclient, before, after)
})

wwclient.on("group_join", async (notification) => {
    console.log("working")
    await addChatToDatabase(notification)
})
 
wwclient.on("message", MessageEvent)
