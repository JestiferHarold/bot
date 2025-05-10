const qrcode = require('qrcode-terminal')
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
// const { default: checkSwears } = require("./src/events/swears");
// const { default: changeMessageSettings } = require("./src/commands/adminsonlymessage");
// const { default: revokeGroupInvites } = require("./src/commands/revokeinvite");
const { default: shareReferences } = require("./src/commands/references");
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
const { default: destroyClient } = require('./src/client/destroy');
const { default: clearMessagesFromClient } = require('./src/commands/clear');
const { default: setGroupChatDescription } = require('./src/commands/description');
const { default: forwarded } = require('./src/commands/forwarded');
const { default: getInviteCode } = require('./src/commands/invitecode');
const { default: leaveChat } = require('./src/commands/leave');
const { default: muteChat } = require('./src/commands/mute');
const { default: getChatName } = require('./src/commands/name');
const { RETRY_DELAY, UnsupportedOperation } = require('puppeteer');
const { default: pin } = require('./src/commands/pin');
const { default: unpin } = require('./src/commands/unpin');
const { EmulatedState } = require('puppeteer');
const { default: createPoll } = require('./src/commands/poll');
const { default: deleteProfilePicture } = require('./src/commands/profiledel');
const { default: sendSticker } = require('./src/commands/sticker');
const { default: profilepicture } = require('./src/commands/profile');
const { default: PasteBin } = require('./src/pastebin/paste');


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

// wwclient.on('message', async message => {
//     return profilepicture(message)
// })

wwclient.on("message", (message) => {

    // (await message.getQuotedMessage()).bo

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

    if (message.body.toString().toLowerCase().slice(0, 3) == ",pb" ) {
        return await PasteBin(wwclient, message)
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

    if (message.body.toString().toLowerCase().slice(0, 7) == ",break") {
        return destroyClient(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 7) == ",clear") {
        return clearMessagesFromClient(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 4) == ",des") {
        return setGroupChatDescription(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0,2) == ",f") {
        return forwarded(message)
    }

    if (message.body.toString().toLowerCase().slice(0, 3) == ",gi") {
        return getInviteCode(message)
    }

    if (message.body.toString().toLowerCase().slice(0, 7) == ",leave") {
        return leaveChat(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 6) == ",mute") {
        return muteChat(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 8) == ",unmute") {
        return unmuteChat(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 5) == ",pin") {
        return pin(message)
    }

    if (message.body.toString().toLowerCase().slice(0, 7) == ",unmute") {
        return unpin(message)
    }

    if (message.body.toString().toLowerCase().slice(0, 2) == ",p") {
        return createPoll(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 3) == ",pd") {
        return deleteProfilePicture(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 2) == ",s") {
        return sendSticker(wwclient, message)
    }
 
    // if (message.body.toString().toLowerCase().slice(0, ))

    if (message.body.toString().toLowerCase() === ",adminsonlym") {
        // return changeMessageSettings(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 7) === ",revoke") {
       return revokeGroupInvites(wwclient, message)
    }

    if (message.body.toString().toLowerCase() === ",adminsonlyi") {
        return 
    }

    if (message.body.toString().toLowerCase() === ",changep") {
        
    }

    if (message.body.toString().toLowerCase().slice(0, 5) === ",refs") {
        return shareReferences(wwclient, message)
    }

    if (message.body.toString().toLowerCase().slice(0, 5) === ",mame") {
        return getChatName(wwclient, message)
    }

    if (message.body.toString().toLowerCase() === ",del") {
        return 
    }

    
}) 


