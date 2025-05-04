const { generate } = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { default: checkSwears } = require("./src/events/swears");
const { default: changeMessageSettings } = require("./src/commands/adminsonlymessage");
const { default: revokeGroupInvites } = require("./src/commands/revokeinvite");
const { default: shareReferences } = require("./src/commands/references");


const wwclient = new Client(
    {
        authStrategy : new LocalAuth(
            {
                dataPath : 'logging'
            }
        )
    }
)

wwclient.on('ready', () => {
    console.log("Client is Ready");
})

wwclient.on('qr', (qr) => {
    generate(
        qr,
        {
            small : true
        }
    )
})

wwclient.initialize();

wwclient.on("message", (message) => {

    if (message.body.charAt(0) === "," ) {
        return
    }

    if (checkSwears(wwclient, message)) {
        return
    }
    
    if (message.body === "!ping") {
        return message.reply("pong");
    }

    if (message.body === "hi") {
        return message.reply("hi");
    }

    if (message.body === "ily") {
        return message.react("😘");
    }

    if (message.body.toString().toLowerCase() === "good job") {
        return message.react("😁");
    }
})

wwclient.on("message", async (message) => {
    if (message.body.charAt(0) !== ",") {
        return
    }

    if (message.body.toString().toLowerCase() === ",adminsonlym") {
        return changeMessageSettings(wwclient, message)
    }

    if (message.body.toString().toLowerCase() === ",revoke") {
       return revokeGroupInvites(wwclient, message)
    }

    if (message.body.toString().toLowerCase() === ",adminsonlyi") {
        return 
    }

    if (message.body.toString().toLowerCase() === ",changep") {
        
    }

    if (message.body.toString().toLowerCase() === ",refers") {
        return shareReferences(wwclient, message)
    }

    if (message.body.toString().toLowerCase() === ",mame") {
        return 
    }

    if (message.body.toString().toLowerCase() === ",del") {
        return 
    }
}) 

