import { launch } from "puppeteer";
import whatsapp from "whatsapp-web.js";

const { MessageMedia } = whatsapp

async function takeScreenshot(wwclient, message) {
    let chat = await message.getChat()
    let contact = await message.getContact()
    let links = message.links;
    let quotedmsg;

    if (links.length == 0) {
        if (message.hasQuotedMsg) {
            quotedmsg = await message.getQuotedMessage()
            links = quotedmsg.links
            if (links.length == 0) {
                return
            }
        } else {
            return
        }
    } 

    if (links[0].isSuspicious) {
        return message.react("X")
    }

    const Browser = await launch();
    const page = await Browser.newPage();
    await page.goto(
        links[0].link,
        {
            waitUntil : "networkidle2"
        }
    )

    await page.screenshot(
        {
            path : `src/image/temp/ss.jpg`
        }
    )

    await Browser.close()
    return await message.reply(MessageMedia.fromFilePath('src/image/temp/ss.jpg'))
}

export default takeScreenshot 