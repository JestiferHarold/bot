import PasteClient, { ExpireDate, Publicity } from "pastebin-api"
import { Client, Message } from "whatsapp-web.js"

export const Name : string = ""
export const Command : string = ""
export const Description : string = ""
export const AdminOnly : boolean = true

const pasteClient : PasteClient = new PasteClient(
    {
        //@ts-expect-error
        apiKey : process.env.PASTEBIN_DEVELOPER_API
    }
)

export async function paste(wwclient : Client, message : Message) : Promise<void | Message> {
    if (!message.hasQuotedMsg) {
        return
    }

    const flags : Array<string> = message.body.split(" ")

    if (flags.length < 2) {
        return
    }

    const targetPaste : string = (await message.getQuotedMessage()).body
    const name = flags[1]

    let viewType : Publicity | void = Publicity.Public
    let expireTime : ExpireDate | void = ExpireDate.Never

    const digit : RegExp = /\d/;

    for (const flag of flags) {

        if (flag.slice(0, 2) != "--") {
            continue
        }

        if (digit.test(flag)) {
            try {
                expireTime = getExpDate(flag)
            } catch (error : any) {
                return wwclient.sendMessage(message.from, error.messages)
            }
        }

        else {
             try {
                viewType = getViewValue(flag)
            } catch (error) {
                return wwclient.sendMessage(message.from , error.message)
            }
        }
    }

    const url : string = await pasteClient.createPaste(
        {
            code : targetPaste,
            //@ts-expect-error
            expireDate : expireTime,
            name : name,
            //@ts-expect-error
            publicity : viewType
        }
    )

    return await message.reply(`Paste Created : ${url}`, message.from, {linkPreview : false})
}

function getViewValue(flag : string) : void | Publicity{
    switch (flag.slice(2)) {
        case "":
            return //This part won't be invoked until the flag contains just "--" same for the other function too
        case "unl":
            return  Publicity.Unlisted
        case "pri":
            throw new Error("Login required to paste privately")
        case "pub":
            return  Publicity.Public
        default:
            throw new Error("Bad Flags")
    }
}

function getExpDate(flag : string) : void | ExpireDate{
    switch (flag.slice(2).toLowerCase()) {
        case "":
            return
        case "10m":
            return ExpireDate.TenMinutes
        case "1h":
            return ExpireDate.OneHour
        case "1d":
            return ExpireDate.OneDay
        case "1w":
            return ExpireDate.OneWeek
        case "2w":
            return ExpireDate.TwoWeeks
        case "1m":
            return ExpireDate.OneMonth
        case "6m":
            return ExpireDate.SixMonths
        case "1y":
            return ExpireDate.OneYear
        case "n":
            return ExpireDate.Never
        default:
            throw new Error("Bad Flags")
    }
}

//I don't think there is anything else to do other than the formats flag which is a pain 