import {
    PasteClient,
    Publicity,
    ExpireDate
} from "pastebin-api"

const client = new PasteClient(
    {
        apiKey : process.env.PASTEBIN_DEVELOPER_API
    }
)

async function PasteBin(wwclient, message) {
    if (!message.hasQuotedMsg) {
        return
    }

    const messageSplit = message.body.split(" ")

    if (messageSplit.length < 2) {
        return
    }

    const quotedMessage = await message.getQuotedMessage()
    const paste = quotedMessage.body
    const name = messageSplit[1]

    let viewType = Publicity.Public
    let expireTime = ExpireDate.Never

    const regx = /\d/;

    for (const mess of messageSplit) {

        if (mess.slice(0,2) != "--") {
            continue
        }

        if (regx.test(mess)) {
            try {
                expireTime = getExpDate(mess)
            } catch (error) {
                wwclient.sendMessage(message.from , error.message)
            }
        }

        else {
            try {
                viewType = getPublicity(mess, viewType)
            } catch (error) {
                wwclient.sendMessage(message.from , error.message)
            }
        }
    }

    const url = await client.createPaste(
        {
            code : paste,
            expireDate : expireTime,
            format : "java",
            name : name,
            publicity : viewType
        }
    )

    return await message.reply("Paste Created : " + url)
}

function getPublicity(message) {
    switch (message.slice(2)) {
        case "":
            return 
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

function getExpDate(message) {
    switch (message.slice(2).toLowerCase()) {
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

// Add a flag for file format

export default PasteBin