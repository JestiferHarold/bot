import { Message } from "whatsapp-web.js";
import {exec} from "child_process"

export default async function executeCmds(message: Message) {
  let cmd: string = message.body.split(" ").slice(1).join(" ")
  
  if (cmd.length == 0) return

  let process = exec(cmd, async (err, stdout, stderr) => {
    if (err) {
      return await message.reply(`Error: ${err.name}\nExecuted Command: ${err.code}\nMessage: ${err.message}\nError Stack: ${err.stack}`)
    }

    if (stderr){
      return await message.reply(`Input stream error: ${stderr}`)
    }

    return await message.reply(`${stdout}`)
  })

  process.kill()
}
