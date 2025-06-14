import { Message } from "whatsapp-web.js";
import {exec} from "child_process"

export default async function ping(message: Message) {
  let flags: string = message.body.split(" ").slice(1).join(" ")

  let executing = exec("ping www.google.com",async (error, stdout, stderr) => {
    
  }) 
}
