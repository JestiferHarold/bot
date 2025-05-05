const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require("whatsapp-web.js");
// const { default: checkSwears } = require("./src/events/swears");
// const { default: changeMessageSettings } = require("./src/commands/adminsonlymessage");
// const { default: revokeGroupInvites } = require("./src/commands/revokeinvite");
// const { default: shareReferences } = require("./src/commands/references");
const { default: takeScreenshot } = require("./src/commands/screenshot");
const { default: HiterlifyAvatar } = require('./src/image/hiter');
const { default: circle } = require('./src/image/circle');
const { default: ditherEffect } = require('./src/image/dither');
const { default: EyeFish } = require('./src/image/fisheye');
const { default: flip } = require('./src/image/flip');
const { default: gaussianBlur } = require('./src/image/gblur');
const { default: greyScale } = require('./src/image/greyscale');
const { default: invert } = require('./src/image/invert');
const { default: pixelate } = require('./src/image/pixelate');
const { default: sipia } = require('./src/image/sipia');
const { default: archiveChat } = require('./src/client/archive');


const wwclient = new Client(
    {
        authStrategy : new LocalAuth(
            {
                dataPath : 'logging'
            }
        )
    }
)

wwclient.on('qr', qr => {
    qrcode.generate(
        qr,
        {
            small : true
        }
    )
})

wwclient.on('ready', () => {
    console.log("Client is Ready");
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

    if (message.body.toString().toLowerCase().slice(0,5) == ",blur") {
        return gaussianBlur(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 5) == ",flip") {
        return flip(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0,2) == ",c") {
        return circle(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0,7) == ",dither") {
        return ditherEffect(wwclient, message)
    } 

    if (message.body.charAt(0) + message.body.charAt(1) + message.body.charAt(2) == ",ss") {
        return takeScreenshot(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 7) == ",fuhrer") {
        return HiterlifyAvatar(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 5) == ",fish") {
        return EyeFish(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 5) == ",grey") {
        return greyScale(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 7) == ",invert") {
        return invert(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 6) == ",pixel") {
        return pixelate(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 6) == ",sipia") {
        return sipia(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 2) == ",a") {
        return archiveChat(wwclient, message)
    }

    if (message.body.toString().toLowerCase() === ",adminsonlym") {
        // return changeMessageSettings(wwclient, message)
    }

    if (message.body.toString().toLowerCase() === ",revoke") {
    //    return revokeGroupInvites(wwclient, message)
    }

    if (message.body.toString().toLowerCase() === ",adminsonlyi") {
        return 
    }

    if (message.body.toString().toLowerCase() === ",changep") {
        
    }

    if (message.body.toString().toLowerCase() === ",refers") {
        // return shareReferences(wwclient, message)
    }

    if (message.body.toString().toLowerCase() === ",mame") {
        return 
    }

    if (message.body.toString().toLowerCase() === ",del") {
        return 
    }
}) 

