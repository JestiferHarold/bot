import { Browser, launch, Page } from "puppeteer"
import { Client, Message, MessageMedia } from "whatsapp-web.js"

async function ScreenShot(wwclient: Client, message: Message) {

    let links: Array<{
            link: string,
            isSuspicious: boolean
        }> = message.links;

    let target: any;

    if (links.length == 0) {
        if (message.hasQuotedMsg) {
            target = await message.getQuotedMessage();
            links = target.links;
            if (links.length == 0) {
                return;
            }
        } else {
            return;
        }
    }

    if (links[0].isSuspicious) {
        return message.react("❌"); //Put that cross emoji here :: done
    }

    const browser: Browser = await launch(
        {
            headless: true,
            args: [
                "--no-startup-window"
            ]
        }
    );

    const page : Page = await browser.newPage();
    await page.goto(
        links[0].link,
        {
            waitUntil: "networkidle2"
        }
    );

    const screenShotBase64: string =  await page.screenshot(
        {
            type: "png",
            fullPage: (message.body.split(" ").includes("-fp") || message.body.split(" ").includes("--fullpage")), /* Please figure out what this and the next one does */
            omitBackground: (message.body.split(" ").includes("-o") || message.body.split(" ").includes("--omit")),
            encoding: "base64"
        }
    );

    await browser.close();

    return await message.reply(
        new MessageMedia(
            "image/png",
            screenShotBase64
        )
    );
}

export default {
    ScreenShot, 
    name: "",
    command: "",
    description: ""
}